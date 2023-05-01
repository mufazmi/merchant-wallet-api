import { Request, Response, NextFunction } from 'express';
import authValidation from '../validations/auth-validation';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';
import moment from 'moment';
import otpService from '../services/otp-service';
import tokenService from '../services/token-service';
import Constants from '../utils/constants';
import MerchantDto from '../dtos/merchant-dto';
import merchantService from '../services/merchant-service';
import Res from '../utils/response';
import { DataTypes, InferAttributes } from 'sequelize';
import lockService from '../services/lock-service';
import Otp from '../models/otp-model';
import { AuthRequest } from '../interfaces/interface';

class AuthController {

    login = async (req: Request, res: Response, next: NextFunction) => {
        let isOtp = false;
        let isLocked = false;
        const body = await authValidation.login.validateAsync(req.body);

        const merchant = await merchantService.findOne({ mobile: body.mobile })
        if (!merchant)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_NOT_FOUND))

        const isMatched: boolean = merchantService.verifyPassword(body.password, merchant.password);
        if (!isMatched)
            return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_PASSWORD))

        if (merchant.status === Constants.STATUS.SUSPENDED)
            return next(ErrorHandler.forbidden(Messages.AUTH.ACCESS_DENIED))

        if (merchant.is_blocked) {
            const unblockedAt = moment(merchant.unblocked_at);
            const now = moment();
            if (unblockedAt.isAfter(now)) {
                return next(Res.error({
                    res: res, message: 'Your account is blocked', data: {
                        blocked_at: merchant.blocked_at,
                        unblocked_at: unblockedAt,
                        current_time: now
                    }
                }))
            }
            else {
                await merchantService.update({ id: merchant.id }, { is_blocked: false })
            }
        }

        if (merchant.device_id != body.device_id) {
            isOtp = true
            const otp = otpService.generateOtp();
            const otpPayload = {
                otp,
                type: Constants.OTP_TYPE.MOBILE_VERIFICATION,
                merchant_id: merchant.id
            }
            const otpRes = await otpService.storeOtp(otpPayload);
            if (!otpRes)
                return next(ErrorHandler.serverError(Constants.SERVER_MESSAGE.SERVER_ERROR));
            const response = {
                reference_id: otpRes.id,
            }
            return Res.success({ res: res, status_code: Constants.CODE.TWO, message: Messages.OTP.SENT, data: response });
        }

        const lock = await lockService.findOne({ merchant_id: merchant.id });

        if (lock && lock.status == Constants.STATUS.ENABLE) {
            isLocked = true
        }

        const tokenPayload = {
            id: merchant.id,
            name: merchant.name,
            mobile: merchant.mobile,
            lock: isLocked
        }

        const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);
        const response = {
            merchant: new MerchantDto(merchant),
            accessToken,
            refreshToken
        }

        return Res.success({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
    }

    verify = async (req: Request, res: Response, next: NextFunction) => {
        let isLocked = false;
        const now = new Date();

        const body = await authValidation.verify.validateAsync(req.body);

        const otp: InferAttributes<Otp> | null = await otpService.findOtp({ id: body.reference_id, otp: body.otp });

        if (!otp)
            return Res.error({ res, message: Messages.OTP.INVALID })

        await otpService.destroyOtp({ id: body.reference_id });

        const expirationTime = moment(otp.expired_at).toDate();

        if (now > expirationTime)
            return Res.error({ res, message: Messages.OTP.EXPIRED })


        const merchant = await merchantService.findOne({ id: otp.merchant_id });

        if (!merchant)
            return next(ErrorHandler.notFound(Messages.MERCHANT.MERCHANT_NOT_FOUND));

        const lock = await lockService.findOne({ merchant_id: merchant.id });

        if (lock && lock.status == Constants.STATUS.ENABLE) {
            isLocked = true
            if (lock.status === Constants.STATUS.ENABLE) {
                isLocked = true
            }
        }

        await merchantService.update({ id: otp.merchant_id }, { device_id: body.device_id })

        const tokenPayload = {
            id: merchant.id,
            name: merchant.name,
            mobile: merchant.mobile,
            lock: isLocked
        }

        const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);
        const response = {
            merchant: new MerchantDto(merchant),
            accessToken,
            refreshToken
        }

        return Res.success({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
    }

    unlock = async (req: AuthRequest, res: Response, next: NextFunction) => {

        const { merchant: auth } = req;
        const now = moment();
        const later = now.add(24, 'hours');

        const body = await authValidation.unlock.validateAsync(req.body);

        const lock = await lockService.findOne({ merchant_id: auth.id });
        if (!lock)
            return next(ErrorHandler.notFound(Messages.LOCK.NOT_FOUND))
            
        const merchant = await merchantService.findOne({ id: lock.merchant_id });

        if (!merchant)
            return next(ErrorHandler.notFound(Messages.MERCHANT.MERCHANT_NOT_FOUND));

        if (lock.status == Constants.STATUS.ENABLE) {

            if (lock.status === Constants.STATUS.ENABLE) {
                if (body.code != lock.pin) {
                    if (lock.failed_attempt > 1) {
                        await merchantService.block({ id: lock.merchant_id })
                        await lockService.incrementFailedAttempt({ by: 1 });
                        return next(Res.error({
                            res: res, message: 'Your account is blocked', data: {
                                blocked_at: now,
                                unblocked_at: later,
                                current_time: now
                            }
                        }))
                    } else {
                        await lockService.incrementFailedAttempt({ by: 1 });
                        return next(Res.error({
                            res: res, message: 'Invalid Pin', data: {
                                failed_attempt: lock.failed_attempt + 1,
                                remaining_attempt: lock.failed_attempt + 1 - 3,
                                current_time: now
                            }
                        }))
                    }
                } else {
                    await lockService.update({ id: lock.id }, { failed_attempt: 0 });
                    if (merchant.is_blocked)
                        await merchantService.unblock({ merchant_id: merchant.id })
                }

            }
        }

        const tokenPayload = {
            id: auth.id,
            name: auth.name,
            mobile: auth.mobile,
            lock: false
        }

        const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);
        const response = {
            merchant: new MerchantDto(merchant),
            accessToken,
            refreshToken
        }

        return Res.success({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
    }

    verify_old = async (req: Request, res: Response, next: NextFunction) => {
        let isValidToken = false;

        const body = await authValidation.verify.validateAsync(req.body);

        const merchant = await merchantService.findOne({ mobile: body.mobile })
        if (!merchant)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_NOT_FOUND))

        const otp = await otpService.verifyOtp({ merchant_id: merchant.id, otp: body.otp, type: Constants.OTP_TYPE.MOBILE_VERIFICATION });
        if (!otp)
            return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_OTP))

        //  => otp expired validation

        // pg_balance, wallet, 

        if (!merchant.isPhoneVerified)
            await merchantService.update({ mobile: merchant.mobile }, { isPhoneVerified: true });

        if (body.token) {
            const tokenMerfindMerchant = tokenService.verifyAccessToken(body.token);
            if (!tokenMerfindMerchant)
                return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_ACCESS_TOKEN))
            isValidToken = true
        }

        if (isValidToken) {
            const tokenPayload = {
                id: merchant.id,
                name: merchant.name,
                mobile: merchant.mobile,
                auth: true
            }

            const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);

            const response = {
                merchant: new MerchantDto(merchant),
                accessToken,
                refreshToken
            }

            return Res.success({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
        }

        return Res.success({ res, message: Messages.AUTH.ACCOUNT_VERIFIED })

    }

}

export default new AuthController
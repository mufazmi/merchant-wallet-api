import { Request, Response, NextFunction } from 'express';
import authValidation from '../validations/auth-validation';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';

import otpService from '../services/otp-service';
import tokenService from '../services/token-service';
import Constants from '../utils/constants';
import MerchantDto from '../dtos/merchant-dto';
import merchantService from '../services/merchant-service';
import Res from '../utils/response';

class AuthController {

    login = async (req: Request, res: Response, next: NextFunction) => {
        let needToSendOtp = true;
        const body = await authValidation.login.validateAsync(req.body);

        const merchant = await merchantService.findOne({ mobile: body.mobile })
        if (!merchant)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_NOT_FOUND))

        // const isMatched: boolean = merchantService.verifyPassword(body.password, merchant.password);
        // if (!isMatched)
        //     return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_PASSWORD))

        if (merchant.status === Constants.TYPE.SUSPENDED || merchant.status === Constants.TYPE.BLOCKED)
            return next(ErrorHandler.forbidden(Messages.AUTH.ACCESS_DENIED))


        // if (merchant.device_id != body.device_id)
        // {
        //     const otpPayload = {
                
        //     }
        //     otpService.createOtp({});
        // }

        const tokenPayload = {
            id: merchant.id,
            name: merchant.name,
            mobile: merchant.mobile,
            auth: false
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
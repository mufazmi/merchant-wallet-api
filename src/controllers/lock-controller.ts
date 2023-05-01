import { InferAttributes } from "sequelize";
import Lock from "../models/lock-model";
import lockService from "../services/lock-service";
import ErrorHandler from "../utils/error-handler";
import lockValidation from "../validations/lock-validation";
import express, { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces/interface";
import Res from "../utils/response";
import Constants from "../utils/constants";
import merchantService from "../services/merchant-service";
import Messages from "../utils/messages";
import moment from "moment";
import tokenService from "../services/token-service";
import MerchantDto from "../dtos/merchant-dto";

class LockController {

    setLock = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const merchant = req.merchant;
        const body = await lockValidation.create.validateAsync(req.body);
        const lock = await lockService.findOne({ merchant_id: merchant.id });
        if (lock)
            return next(ErrorHandler.forbidden("Pass Lock Already Been Set"))
        body.merchant_id = merchant.id
        body.status = Constants.STATUS.ENABLE
        const data = await lockService.create(body);
        return data ? Res.success({ res: res, message: "Lock Set" }) : next(ErrorHandler.serverError("Not Set"))
    }

    verifyLock = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const merchant = req.merchant;
        const body = await lockValidation.verify.validateAsync(req.body);
        const lock = await lockService.findOne({ merchant_id: merchant.id });
        if (!lock)
            return next(ErrorHandler.badRequest("Kindly Set The Pass First"))

        if (lock.pin != body.pin) {
            if (lock.failed_attempt > 2)
                await lockService.update({ id: lock.id }, { status: 'blocked' })

            await lockService.incrementFailedAttempt({ by: 1, merchant_id: lock.merchant_id });
            return next(ErrorHandler.badRequest("Invalid Pin"));
        }

        await lockService.update({ id: lock.id }, { status: 'enabled', failed_attempt: 0 })

        //Find token and update the payload locked=false

        return lock ? Res.success({ res: res, message: "Password Set" }) : next(ErrorHandler.serverError("Not Set"))
    }

    unlock = async (req: AuthRequest, res: Response, next: NextFunction) => {

        const { merchant: auth } = req;
        const now = moment();
        const later = now.add(24, 'hours');
        const body = await lockValidation.unlock.validateAsync(req.body);
        const lock = await lockService.findOne({ merchant_id: auth.id });
        if (!lock)
            return next(ErrorHandler.notFound(Messages.LOCK.NOT_FOUND))
        const merchant = await merchantService.findOne({ id: lock.merchant_id });
        if (!merchant)
            return next(ErrorHandler.notFound(Messages.MERCHANT.MERCHANT_NOT_FOUND));
        if (merchant.is_blocked) {
            const now = moment();
            const unblockedAt = moment(merchant.unblocked_at);
            const diff = moment(later).diff(moment(now));
            if (unblockedAt.isAfter(now)) {
                return Res.error({
                    res: res, message: 'Your account is blocked', data: {
                        blocked_at: merchant.blocked_at,
                        unblocked_at: unblockedAt,
                        reamning_time: diff,
                        current_time: now
                    }
                })
            }
            else {
                await merchantService.update({ id: merchant.id }, { is_blocked: false })
            }
        }
        if (lock.status === Constants.STATUS.ENABLE) {
            if (body.code != lock.pin) {
                if (lock.failed_attempt > 1) {
                    await merchantService.block({ id: lock.merchant_id })
                    await lockService.incrementFailedAttempt({ by: 1, merchant_id: lock.merchant_id });
                    const diff = moment(later).diff(moment(now));
                    return next(Res.error({
                        res: res, message: 'Your account is blocked', data: {
                            blocked_at: now,
                            unblocked_at: later,
                            reamning_time: diff,
                            current_time: now
                        }
                    }))
                } else {
                    await lockService.incrementFailedAttempt({ by: 1, merchant_id: lock.merchant_id });
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
            refreshToken,
            lock: false
        }

        return Res.success({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
    }

    updateLock = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const merchant = req.merchant;
        const body = await lockValidation.update.validateAsync(req.body);
        const lock: InferAttributes<Lock> | null = await lockService.findOne({ merchant_id: merchant.id });
        if (!lock)
            return next(ErrorHandler.forbidden("Kindly Set The Lock First"))

        if (lock!.pin != body.pin)
            return next(ErrorHandler.forbidden("Incorrect Lock"))

        body.pin = body.new_pin
        delete body.new_pin
        const data = await lockService.update({ merchant_id: merchant.id }, body);

        return data ? Res.success({ res: res, message: "Lock Updated" }) : next(ErrorHandler.serverError("Lock Update Failed"))
    }

    deleteLock = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const merchant = req.merchant;
        const body = await lockValidation.delete.validateAsync(req.body);
        const lock: InferAttributes<Lock> | null = await lockService.findOne({ merchant_id: merchant.id });
        if (!lock)
            return next(ErrorHandler.forbidden("Kindly Set The Lock First"))

        if (lock!.pin != body.pin)
            return next(ErrorHandler.forbidden("Incorrect Lock"))

        const data = await lockService.destroy({ merchant_id: merchant.id });

        return data ? Res.success({ res: res, message: "Lock Removed" }) : next(ErrorHandler.serverError("Lock Removed Failed"))
    }



}


export default new LockController;
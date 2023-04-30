import { InferAttributes } from "sequelize";
import Lock from "../models/lock-model";
import authService from "../services/auth-service";
import lockService from "../services/lock-service";
import ErrorHandler from "../utils/error-handler";
import responseSuccess from "../utils/response";
import lockValidation from "../validations/lock-validation";
import express,{Request,Response,NextFunction} from "express";
import { AuthRequest } from "../interfaces/interface";
import Res from "../utils/response";

class LockController{

    setLock = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.merchant;
        const body = await lockValidation.create.validateAsync(req.body);
        const lock = await lockService.findOne({user_id:user.id});
        if(lock)
            return next(ErrorHandler.forbidden("Pass Lock Already Been Set"))
        body.user_id = user.id
        body.status = 'enabled'
        const data = await lockService.create(body);
        return data ? Res.success({ res: res, message: "Lock Set" }) : next(ErrorHandler.serverError("Not Set"))
    }

    verifyLock = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.merchant;
        const body = await lockValidation.verify.validateAsync(req.body);
        const lock = await lockService.findOne({id:user.id});
        if(!lock)
            return next(ErrorHandler.badRequest("Kindly Set The Pass First"))

        if(lock.pin != body.pin)
        {
            if(lock.failed_attempt > 2)
                await lockService.update({id:lock.id},{status:'blocked'})

            await lockService.incrementFailedAttempt({by:1});
            return next(ErrorHandler.badRequest("Invalid Pin"));
        }         

        await lockService.update({id:lock.id},{status:'enabled',failed_attempt:0})
        
        //Find token and update the payload locked=false
        
        return lock ? Res.success({ res: res, message: "Password Set" }) : next(ErrorHandler.serverError("Not Set"))
    }

    updateLock = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const mUser = req.merchant;
        const body = await lockValidation.update.validateAsync(req.body);
        const lock: InferAttributes<Lock> | null = await lockService.findOne({ id: mUser.id });
        if(!lock)
            return next(ErrorHandler.forbidden("Kindly Set The Lock First"))

        if (lock!.pin != body.pin )
            return next(ErrorHandler.forbidden("Incorrect Lock"))

        delete body.new_pin
        const data = await lockService.update({ id: mUser!.id }, body);

        return data ? Res.success({ res: res, message: "Lock Updated" }) : next(ErrorHandler.serverError("Lock Update Failed"))
    }

    deleteLock = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const mUser = req.merchant;
        const body = await lockValidation.update.validateAsync(req.body);
        const lock: InferAttributes<Lock> | null = await lockService.findOne({ id: mUser.id });
        if(!lock)
            return next(ErrorHandler.forbidden("Kindly Set The Lock First"))

        if (lock!.pin != body.pin )
            return next(ErrorHandler.forbidden("Incorrect Lock"))

        const data = await lockService.destroy({ id: mUser!.id });

        return data ? Res.success({ res: res, message: "Lock Removed" }) : next(ErrorHandler.serverError("Lock Removed Failed"))
    }


}


export default new LockController;
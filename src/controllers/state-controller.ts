import { Request, Response, NextFunction } from "express"
import stateValidation from "../validations/state-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import stateService from "../services/state-service";


class StateController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        const body = await stateValidation.create.validateAsync(req.body);
        const data = await stateService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.STATE.STATE_CREATED }) : next(ErrorHandler.serverError(Messages.STATE.STATE_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await stateService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.STATE.STATE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.STATE.STATE_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await stateService.findAll({});
        return data ? responseSuccess({ res: res, message: Messages.STATE.STATE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.STATE.STATE_NOT_FOUND));
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await stateValidation.update.validateAsync(req.body);
        const template = await stateService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.STATE.STATE_NOT_FOUND))

        const data = await stateService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.STATE.STATE_UPDATED }) : next(ErrorHandler.serverError(Messages.STATE.STATE_UPDATE_FAILED));
    }


    destroy = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await stateService.destroy({id});
        return data ? responseSuccess({ res: res, message: Messages.STATE.STATE_DELATED }) : next(ErrorHandler.notFound(Messages.STATE.STATE_DELETE_FAILED));
    }
}

export default new StateController
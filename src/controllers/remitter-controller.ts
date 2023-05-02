import { Request, Response, NextFunction } from "express"
import remitterValidation from "../validations/remitter-validation"
import responseSuccess from "../utils/response";
import Constants from "../utils/constants";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import remitterService from "../services/remitter-service";
import Res from "../utils/response";


class RemitterController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        const body = await remitterValidation.create.validateAsync(req.body);
        const data = await remitterService.create(body);
        return data ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_CREATED }) : next(ErrorHandler.serverError(Messages.MESSAGE.TEMPLATE_MESSAGE_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await remitterService.findAll({ id });
        return data ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));

    }

    searchOne = async (req: Request, res: Response, next: NextFunction) => {
        const body = await remitterValidation.searchOne.validateAsync(req.body)
        const data = await remitterService.findAll(body);
        return data ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await remitterService.findAll({});
        return data.length > 1 ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await remitterValidation.update.validateAsync(req.body);
        const template = await remitterService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND))

        const data = await remitterService.update({ id }, body);
        return data ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_UPDATED }) : next(ErrorHandler.serverError(Messages.MESSAGE.TEMPLATE_MESSAGE_UPDATE_FAILED));
    }


    destroy = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await remitterService.destroy({id});
        return data ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_DELATED }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_DELETE_FAILED));
    }
}

export default new RemitterController
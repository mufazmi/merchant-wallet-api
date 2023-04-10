import { Request, Response, NextFunction } from "express"
import otpTemplateValidation from "../validations/message-template-validation"
import responseSuccess from "../utils/response";
import Constants from "../utils/constants";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import messageTemplateService from "../services/message-template-service";


class MessageTemplateController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        const body = await otpTemplateValidation.create.validateAsync(req.body);
        const data = await messageTemplateService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_CREATED }) : next(ErrorHandler.serverError(Messages.MESSAGE.TEMPLATE_MESSAGE_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await messageTemplateService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await messageTemplateService.findAll({});
        return data ? responseSuccess({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await otpTemplateValidation.update.validateAsync(req.body);
        const template = await messageTemplateService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND))

        const data = await messageTemplateService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_UPDATED }) : next(ErrorHandler.serverError(Messages.MESSAGE.TEMPLATE_MESSAGE_UPDATE_FAILED));
    }


    destroy = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await messageTemplateService.destroy({id});
        return data ? responseSuccess({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_DELATED }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_DELETE_FAILED));
    }
}

export default new MessageTemplateController
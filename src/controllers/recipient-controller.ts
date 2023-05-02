import { Request, Response, NextFunction } from "express"
import recipientValidation from "../validations/recipient-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import recipientService from "../services/recipient-service";
import Res from "../utils/response";


class RecipientController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        const body = await recipientValidation.create.validateAsync(req.body);
        // CONDITION
        // CALL THE EKO RECIPIENT API IF RESPONSE IS SUCCESS THEN INSERT DATA IN RECIPEIENT TABLE
        const data = await recipientService.create(body);
        return data ? Res.success({ res: res, message: Messages.RECIPIENT.RECIPIENT_CREATED }) : next(ErrorHandler.serverError(Messages.RECIPIENT.RECIPIENT_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await recipientService.findAll({ id });
        return data ? Res.success({ res: res, message: Messages.RECIPIENT.RECIPIENT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.RECIPIENT.RECIPIENT_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await recipientService.findAll({});
        return data.length > 0 ? Res.success({ res: res, message: Messages.RECIPIENT.RECIPIENT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.RECIPIENT.RECIPIENT_NOT_FOUND));
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await recipientValidation.update.validateAsync(req.body);
        const template = await recipientService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.RECIPIENT.RECIPIENT_NOT_FOUND))

        const data = await recipientService.update({ id }, body);
        return data ? Res.success({ res: res, message: Messages.RECIPIENT.RECIPIENT_UPDATED }) : next(ErrorHandler.serverError(Messages.RECIPIENT.RECIPIENT_UPDATE_FAILED));
    }


    destroy = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await recipientService.destroy({ id });
        return data ? Res.success({ res: res, message: Messages.RECIPIENT.RECIPIENT_DELATED }) : next(ErrorHandler.notFound(Messages.RECIPIENT.RECIPIENT_DELETE_FAILED));
    }
}

export default new RecipientController
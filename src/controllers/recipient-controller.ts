import { Request, Response, NextFunction } from "express"
import recipientValidation from "../validations/recipient-validation"
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


    findAll = async (req: Request, res: Response, next: NextFunction) => {
        //CONDITION
        // FIRST CHECK RECIPIENTS TABLE AND CALL EKO GET LIST OF RECIPEINT
        const data = await recipientService.findAll({});
        return data.length > 0 ? Res.success({ res: res, message: Messages.RECIPIENT.RECIPIENT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.RECIPIENT.RECIPIENT_NOT_FOUND));
    }

}

export default new RecipientController
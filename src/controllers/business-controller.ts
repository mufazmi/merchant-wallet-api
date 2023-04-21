import { Request, Response, NextFunction } from "express"
import businessValidation from "../validations/business-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import businessService from "../services/business-service";


class CityController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        const body = await businessValidation.create.validateAsync(req.body);
        const data = await businessService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.BUSINESS.BUSINESS_CREATED }) : next(ErrorHandler.serverError(Messages.BUSINESS.BUSINESS_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await businessService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.BUSINESS.BUSINESS_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.BUSINESS.BUSINESS_NOT_FOUND));

    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await businessValidation.update.validateAsync(req.body);
        const template = await businessService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.BUSINESS.BUSINESS_NOT_FOUND))

        const data = await businessService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.BUSINESS.BUSINESS_UPDATED }) : next(ErrorHandler.serverError(Messages.BUSINESS.BUSINESS_UPDATE_FAILED));
    }

}

export default new CityController
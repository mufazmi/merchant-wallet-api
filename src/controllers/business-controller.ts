import { Request, Response, NextFunction } from "express"
import businessValidation from "../validations/business-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import businessService from "../services/business-service";
import { AuthRequest } from "../interfaces/interface";


class BusinessController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const merchant = req.merchant;
        const body = await businessValidation.create.validateAsync(req.body);
        const business = await businessService.findOne({ owner_id: merchant.id });
        if (business)
            return ErrorHandler.forbidden(Messages.BUSINESS.BUSINESS_FOUND)

        const data = await businessService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.BUSINESS.BUSINESS_CREATED }) : next(ErrorHandler.serverError(Messages.BUSINESS.BUSINESS_CREATION_FAILED));
    }

    findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant;
        const data = await businessService.findAll({ owner_id: id });
        return data ? responseSuccess({ res: res, message: Messages.BUSINESS.BUSINESS_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.BUSINESS.BUSINESS_NOT_FOUND));

    }

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant;
        const body = await businessValidation.update.validateAsync(req.body);
        const business = await businessService.findOne({ owner_id: id });
        if (!business)
            return next(ErrorHandler.notFound(Messages.BUSINESS.BUSINESS_NOT_FOUND))

        const data = await businessService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.BUSINESS.BUSINESS_UPDATED }) : next(ErrorHandler.serverError(Messages.BUSINESS.BUSINESS_UPDATE_FAILED));
    }
}

export default new BusinessController
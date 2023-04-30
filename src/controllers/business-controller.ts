import { Request, Response, NextFunction } from "express"
import businessValidation from "../validations/business-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import businessService from "../services/business-service";
import { AuthRequest } from "../interfaces/interface";
import { InferAttributes } from "sequelize";
import BusinessModel from "../models/business-model";
import Constants from "../utils/constants";
import Res from "../utils/response";


class BusinessController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant
        const body = await businessValidation.create.validateAsync(req.body);
        const business: InferAttributes<BusinessModel> | null = await businessService.findOne({ merchant_id: id });
        if (business)
            return next(ErrorHandler.forbidden(Messages.BUSINESS.BUSINESS_ALREADY_CREATED))
        body.merchant_id = id
        const data = await businessService.create(body);
        return data ? Res.success({ res: res, message: Messages.BUSINESS.BUSINESS_CREATED }) : next(ErrorHandler.serverError(Messages.BUSINESS.BUSINESS_CREATION_FAILED));
    }

    findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant;
        const data = await businessService.findOne({ merchant_id: id });
        return data ? Res.success({ res: res, message: Messages.BUSINESS.BUSINESS_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.BUSINESS.BUSINESS_NOT_FOUND));

    }

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant;
        const body = await businessValidation.update.validateAsync(req.body);
        const business = await businessService.findOne({ merchant_id: id });
        if (!business)
            return next(ErrorHandler.notFound(Messages.BUSINESS.BUSINESS_NOT_FOUND))
        if (business.kyc_status === Constants.STATUS.ACTIVE)
            return next(ErrorHandler.notFound(Messages.KYC.KYC_ACTIVE))
        const data = await businessService.update({ id: business.id }, body);
        return data ? Res.success({ res: res, message: Messages.BUSINESS.BUSINESS_UPDATED }) : next(ErrorHandler.serverError(Messages.BUSINESS.BUSINESS_UPDATE_FAILED));
    }

}

export default new BusinessController
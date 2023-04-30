import { Request, Response, NextFunction } from "express"
import businessAddressValidation from "../validations/business-address-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import businessAddressService from "../services/business-address-service";
import { AuthRequest } from "../interfaces/interface";
import { InferAttributes } from "sequelize";
import BusinessAddressModel from "../models/business-address-model";
import Constants from "../utils/constants";
import BusinessModel from "../models/business-model";
import businessService from "../services/business-service";
import Res from "../utils/response";


class BusinessController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant
        const body = await businessAddressValidation.create.validateAsync(req.body);
        const businessAddress: InferAttributes<BusinessAddressModel> | null = await businessAddressService.findOne({ merchant_id: id });
        if (businessAddress)
            return next(ErrorHandler.forbidden(Messages.BUSINESS.BUSINESS_ADDRESS_ALREADY_CREATED))

        const business: InferAttributes<BusinessModel> | null = await businessService.findOne({ merchant_id: id });
        if (!business)
            return next(ErrorHandler.forbidden(Messages.BUSINESS.BUSINESS_NOT_FOUND))

        body.merchant_id = id
        body.business = business.id
        const data = await businessAddressService.create(body);
        return data ? Res.success({ res: res, message: Messages.BUSINESS.BUSINESS_ADDRESS_CREATED }) : next(ErrorHandler.serverError(Messages.BUSINESS.BUSINESS_ADDRESS_CREATION_FAILED));
    }

    findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant;
        const data = await businessAddressService.findOne({ merchant_id: id });
        return data ? Res.success({ res: res, message: Messages.BUSINESS.BUSINESS_ADDRESS_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.BUSINESS.BUSINESS_ADDRESS_NOT_FOUND));

    }

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.merchant;
        const body = await businessAddressValidation.update.validateAsync(req.body);
        const businessAddress = await businessAddressService.findOne({ merchant_id: id });
        if (!businessAddress)
            return next(ErrorHandler.notFound(Messages.BUSINESS.BUSINESS_ADDRESS_NOT_FOUND))
        // if (businessAddress.kyc_status === Constants.STATUS.ACTIVE)
        //     return next(ErrorHandler.notFound(Messages.KYC.KYC_ACTIVE))
        const data = await businessAddressService.update({ id: businessAddress.id }, body);
        return data ? Res.success({ res: res, message: Messages.BUSINESS.BUSINESS_ADDRESS_UPDATED }) : next(ErrorHandler.serverError(Messages.BUSINESS.BUSINESS_ADDRESS_UPDATE_FAILED));
    }

}

export default new BusinessController
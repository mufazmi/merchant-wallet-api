import { Request, Response, NextFunction } from "express"
import merchantFundValidation from "../validations/merchant-fund-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import merchantFundService from "../services/merchant-fund-service";
import { AuthRequest } from "../interfaces/interface";
import Res from "../utils/response";

class MerchantFundController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const id = req.merchant.id;
        const body = await merchantFundValidation.create.validateAsync(req.body);
        body.merchant_id = id
        body.remark  = 'asd'
        const data = await merchantFundService.create(body);
        return data ? Res.success({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_CREATED }) : next(ErrorHandler.serverError(Messages.MERCHANT.FUND_MERCHANT_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await merchantFundService.findOne({ id });
        return data ? Res.success({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await merchantFundService.findAll({});
        return data.length > 0 ? Res.success({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }
}

export default new MerchantFundController
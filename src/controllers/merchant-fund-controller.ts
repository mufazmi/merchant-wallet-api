import { Request, Response, NextFunction } from "express"
import merchantFundValidation from "../validations/merchant-fund-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import merchantFundService from "../services/merchant-fund-service";


class MerchantFundController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        const body = await merchantFundValidation.create.validateAsync(req.body);
        const data = await merchantFundService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_CREATED }) : next(ErrorHandler.serverError(Messages.MERCHANT.FUND_MERCHANT_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await merchantFundService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await merchantFundService.findAll({});
        return data ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await merchantFundValidation.update.validateAsync(req.body);
        const template = await merchantFundService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND))

        const data = await merchantFundService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_UPDATED }) : next(ErrorHandler.serverError(Messages.MERCHANT.FUND_MERCHANT_UPDATE_FAILED));
    }


    destroy = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await merchantFundService.destroy({ id });
        return data ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_DELATED }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_DELETE_FAILED));
    }
}

export default new MerchantFundController
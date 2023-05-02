import { Request, Response, NextFunction } from "express"
import remitterValidation from "../validations/remitter-validation"
import responseSuccess from "../utils/response";
import Constants from "../utils/constants";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import remitterService from "../services/remitter-service";
import Res from "../utils/response";


class RemitterController {

    /**
     * CALL EKO CREATE CUSTOMER  API
     * IF API GIVEN 701 - FAILED
     * IF GIVEN REPSONSE IS TYPE ID : 1418
     * THEN INSERT IN REMITTER TABLE AND ALSO
     * INSERT OTP REFRERENCE ID
     * UPDATE DEFAULT STATUS 3 (OTP VERIFICATION PENDING)
     */
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

    
    /**
     * CALL EKO RESEND OTP API
     * IF GIVEN RESPONSE TYPE ID=321
     * THEN UPDATE OTP REFERENCE ID IN REMITTER TABLE
     */
    resendOtp = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await remitterService.findAll({ id });
        return data ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));
    }

    /**
     * CONDITION
     * IF THE CUSTOMER DATA IS AVAILABE IN REMITTER TABLE
     * EVEN THEN CALL EKO GET CUSTOMER INFORMATION API
     * FETCH TOTAL LIMTED AND AVAILABE LIMITED & STATE DESC UPDATE IN REMITTER TABLE
     * 
     * IF CUSTOMER DATA IS NOT AVAILABLE IN REMITTANCE TABLE
     * THEN CALL EKO GET CUSTOMER INFORMATION API
     */
    searchOne = async (req: Request, res: Response, next: NextFunction) => {
        const body = await remitterValidation.searchOne.validateAsync(req.body)
        const data = await remitterService.findAll(body);
        return data ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await remitterService.findAll({});
        return data.length > 1 ? Res.success({ res: res, message: Messages.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));
    }
}

export default new RemitterController
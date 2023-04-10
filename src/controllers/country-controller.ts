import { Request, Response, NextFunction } from "express"
import countryValidation from "../validations/country-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import countryService from "../services/country-service";


class CountryController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        const body = await countryValidation.create.validateAsync(req.body);
        const data = await countryService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.COUNTRY.COUNTRY_CREATED }) : next(ErrorHandler.serverError(Messages.COUNTRY.COUNTRY_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await countryService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.COUNTRY.COUNTRY_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.COUNTRY.COUNTRY_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await countryService.findAll({});
        return data ? responseSuccess({ res: res, message: Messages.COUNTRY.COUNTRY_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.COUNTRY.COUNTRY_NOT_FOUND));
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await countryValidation.update.validateAsync(req.body);
        const template = await countryService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.COUNTRY.COUNTRY_NOT_FOUND))

        const data = await countryService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.COUNTRY.COUNTRY_UPDATED }) : next(ErrorHandler.serverError(Messages.COUNTRY.COUNTRY_UPDATE_FAILED));
    }


    destroy = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await countryService.destroy({id});
        return data ? responseSuccess({ res: res, message: Messages.COUNTRY.COUNTRY_DELATED }) : next(ErrorHandler.notFound(Messages.COUNTRY.COUNTRY_DELETE_FAILED));
    }
}

export default new CountryController
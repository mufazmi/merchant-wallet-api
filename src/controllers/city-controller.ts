import { Request, Response, NextFunction } from "express"
import cityValidation from "../validations/city-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import cityService from "../services/city-service";


class CityController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        const body = await cityValidation.create.validateAsync(req.body);
        const data = await cityService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.CITY.CITY_CREATED }) : next(ErrorHandler.serverError(Messages.CITY.CITY_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await cityService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.CITY.CITY_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.CITY.CITY_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await cityService.findAll({});
        return data ? responseSuccess({ res: res, message: Messages.CITY.CITY_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.CITY.CITY_NOT_FOUND));
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await cityValidation.update.validateAsync(req.body);
        const template = await cityService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.CITY.CITY_NOT_FOUND))

        const data = await cityService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.CITY.CITY_UPDATED }) : next(ErrorHandler.serverError(Messages.CITY.CITY_UPDATE_FAILED));
    }


    destroy = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await cityService.destroy({id});
        return data ? responseSuccess({ res: res, message: Messages.CITY.CITY_DELATED }) : next(ErrorHandler.notFound(Messages.CITY.CITY_DELETE_FAILED));
    }
}

export default new CityController
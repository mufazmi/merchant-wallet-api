import { Request, Response, NextFunction } from "express"
// import notificationValidation from "../validations/notification-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import notificationService from "../services/notification-token-service";
import Res from "../utils/response";


class NotificationController {

    // create = async (req: Request, res: Response, next: NextFunction) => {
    //     const body = await notificationValidation.create.validateAsync(req.body);
    //     const data = await notificationService.create(body);
        // return data ? Res.success({ res: res, message: Messages.NOTIFICATION.NOTIFICATION_TOKEN_CREATED }) : next(ErrorHandler.serverError(Messages.NOTIFICATION.NOTIFICATION_TOKEN_CREATION_FAILED));
    // }

    // destroy = async (req: Request, res: Response, next: NextFunction) => {
    //     const { id } = req.params;
    //     const data = await notificationService.destroy({id});
    //     return data ? Res.success({ res: res, message: Messages.NOTIFICATION.NOTIFICATION_TOKEN_DELATED }) : next(ErrorHandler.notFound(Messages.NOTIFICATION.NOTIFICATION_TOKEN_DELETE_FAILED));
    // }
}

export default new NotificationController
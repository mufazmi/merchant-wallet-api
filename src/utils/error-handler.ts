import Constants from "./constants";

class ErrorHandler extends Error {

    constructor(message: string, statusCode: Number) {
        super(message)
        //@ts-ignore
        this.statusCode = statusCode
        ErrorHandler.captureStackTrace(this, this.constructor);
    }

    static notFound = (message: string = Constants.SERVER_MESSAGE.NOT_FOUND) => new ErrorHandler(message, Constants.STATUS_CODE.NOT_FOUND);
    static forbidden = (message: string = Constants.SERVER_MESSAGE.FORBIDDEN) => new ErrorHandler(message, Constants.STATUS_CODE.FORBIDDEN);
    static badRequest = (message: string = Constants.SERVER_MESSAGE.BAD_REQUEST) => new ErrorHandler(message, Constants.STATUS_CODE.BAD_REQUEST);
    static serverError = (message: string = Constants.SERVER_MESSAGE.SERVER_ERROR) => new ErrorHandler(message, Constants.STATUS_CODE.SERVER_ERROR);

}

export default ErrorHandler
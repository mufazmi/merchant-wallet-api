"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        //@ts-ignore
        this.statusCode = statusCode;
        ErrorHandler.captureStackTrace(this, this.constructor);
    }
}
ErrorHandler.notFound = (message = constants_1.default.SERVER_MESSAGE.NOT_FOUND) => new ErrorHandler(message, constants_1.default.STATUS_CODE.NOT_FOUND);
ErrorHandler.forbidden = (message = constants_1.default.SERVER_MESSAGE.FORBIDDEN) => new ErrorHandler(message, constants_1.default.STATUS_CODE.FORBIDDEN);
ErrorHandler.badRequest = (message = constants_1.default.SERVER_MESSAGE.BAD_REQUEST) => new ErrorHandler(message, constants_1.default.STATUS_CODE.BAD_REQUEST);
ErrorHandler.serverError = (message = constants_1.default.SERVER_MESSAGE.SERVER_ERROR) => new ErrorHandler(message, constants_1.default.STATUS_CODE.SERVER_ERROR);
exports.default = ErrorHandler;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const token_service_1 = __importDefault(require("../services/token-service"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // console.log(req.header("authorization"));
    // console.log(req.header("refresh"));
    // const {authorization: accessTokenReq, refresh: refreshTokenReq} = req.header;
    let accessTokenReq = (_a = req.header("authorization")) !== null && _a !== void 0 ? _a : '';
    let refreshTokenReq = (_b = req.header("refresh")) !== null && _b !== void 0 ? _b : '';
    if (accessTokenReq)
        accessTokenReq = accessTokenReq.split(' ')[1];
    if (refreshTokenReq)
        refreshTokenReq = refreshTokenReq.split(' ')[1];
    console.log({ accessTokenReq });
    try {
        const tokenUser = token_service_1.default.verifyAccessToken({ token: accessTokenReq });
        if (!tokenUser)
            return next(error_handler_1.default.forbidden("Access Expired"));
        //@ts-ignore
        req.admin = token_service_1.default;
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.TokenExpiredError) {
            if (!refreshTokenReq)
                return error_handler_1.default.forbidden("Access Expired");
            const tokenUser = token_service_1.default.verifyRefreshToken({ token: refreshTokenReq });
            if (!tokenUser)
                return error_handler_1.default.forbidden("Access Expired");
            const token = yield token_service_1.default.findRefreshToken(refreshTokenReq);
            if (!token)
                return error_handler_1.default.forbidden("Access Expired");
            console.log(token);
        }
    }
    return next();
});
exports.default = auth;

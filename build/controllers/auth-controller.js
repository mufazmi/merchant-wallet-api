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
const auth_validation_1 = __importDefault(require("../validations/auth-validation"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const response_1 = __importDefault(require("../utils/response"));
const otp_service_1 = __importDefault(require("../services/otp-service"));
const token_service_1 = __importDefault(require("../services/token-service"));
const constants_1 = __importDefault(require("../utils/constants"));
const merchant_dto_1 = __importDefault(require("../dtos/merchant-dto"));
const merchant_service_1 = __importDefault(require("../services/merchant-service"));
class AuthController {
    constructor() {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = yield auth_validation_1.default.login.validateAsync(req.body);
            const merchant = yield merchant_service_1.default.findMerchant({ mobile: body.mobile });
            if (!merchant)
                return next(error_handler_1.default.notFound(messages_1.default.AUTH.ACCOUNT_NOT_FOUND));
            const isMatched = merchant_service_1.default.verifyPassword(body.password, merchant.password);
            if (!isMatched)
                return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_PASSWORD));
            const tokenPayload = {
                id: merchant.id,
                name: merchant.name,
                mobile: merchant.mobile,
                auth: false
            };
            const { accessToken, refreshToken } = token_service_1.default.generateToken(tokenPayload);
            const response = {
                merchant: new merchant_dto_1.default(merchant),
                accessToken,
                refreshToken
            };
            return (0, response_1.default)({ res, message: messages_1.default.AUTH.LOGIN_SUCCESS, data: response });
        });
        this.verify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let isValidToken = false;
            const body = yield auth_validation_1.default.verify.validateAsync(req.body);
            const merchant = yield merchant_service_1.default.findMerchant({ mobile: body.mobile });
            if (!merchant)
                return next(error_handler_1.default.notFound(messages_1.default.AUTH.ACCOUNT_NOT_FOUND));
            const otp = yield otp_service_1.default.verifyOtp({ merchant_id: merchant.id, otp: body.otp, type: constants_1.default.OTP_TYPE.MOBILE_VERIFICATION });
            if (!otp)
                return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_OTP));
            //  => otp expired validation
            // pg_balance, wallet, 
            if (!merchant.isPhoneVerified)
                yield merchant_service_1.default.updateMerchant({ mobile: merchant.mobile }, { isPhoneVerified: true });
            if (body.token) {
                const tokenMerfindMerchant = token_service_1.default.verifyAccessToken(body.token);
                if (!tokenMerfindMerchant)
                    return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_ACCESS_TOKEN));
                isValidToken = true;
            }
            if (isValidToken) {
                const tokenPayload = {
                    id: merchant.id,
                    name: merchant.name,
                    mobile: merchant.mobile,
                    auth: true
                };
                const { accessToken, refreshToken } = token_service_1.default.generateToken(tokenPayload);
                const response = {
                    merchant: new merchant_dto_1.default(merchant),
                    accessToken,
                    refreshToken
                };
                return (0, response_1.default)({ res, message: messages_1.default.AUTH.LOGIN_SUCCESS, data: response });
            }
            return (0, response_1.default)({ res, message: messages_1.default.AUTH.ACCOUNT_VERIFIED });
        });
    }
}
exports.default = new AuthController;

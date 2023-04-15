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
const merchant_fund_validation_1 = __importDefault(require("../validations/merchant-fund-validation"));
const response_1 = __importDefault(require("../utils/response"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const merchant_fund_service_1 = __importDefault(require("../services/merchant-fund-service"));
class MerchantFundController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const id = req.merchant.id;
            const body = yield merchant_fund_validation_1.default.create.validateAsync(req.body);
            body.merchant_id = id;
            const data = yield merchant_fund_service_1.default.create(body);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.MERCHANT.FUND_MERCHANT_CREATED }) : next(error_handler_1.default.serverError(messages_1.default.MERCHANT.FUND_MERCHANT_CREATION_FAILED));
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield merchant_fund_service_1.default.findAll({ id });
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(error_handler_1.default.notFound(messages_1.default.MERCHANT.FUND_MERCHANT_NOT_FOUND));
        });
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield merchant_fund_service_1.default.findAll({});
            return data.length > 1 ? (0, response_1.default)({ res: res, message: messages_1.default.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(error_handler_1.default.notFound(messages_1.default.MERCHANT.FUND_MERCHANT_NOT_FOUND));
        });
    }
}
exports.default = new MerchantFundController;

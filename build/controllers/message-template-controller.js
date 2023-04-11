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
const message_template_validation_1 = __importDefault(require("../validations/message-template-validation"));
const response_1 = __importDefault(require("../utils/response"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const message_template_service_1 = __importDefault(require("../services/message-template-service"));
class MessageTemplateController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = yield message_template_validation_1.default.create.validateAsync(req.body);
            const data = yield message_template_service_1.default.create(body);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.MESSAGE.TEMPLATE_MESSAGE_CREATED }) : next(error_handler_1.default.serverError(messages_1.default.MESSAGE.TEMPLATE_MESSAGE_CREATION_FAILED));
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield message_template_service_1.default.findAll({ id });
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(error_handler_1.default.notFound(messages_1.default.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));
        });
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield message_template_service_1.default.findAll({});
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.MESSAGE.TEMPLATE_MESSAGE_FOUND, data: data }) : next(error_handler_1.default.notFound(messages_1.default.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = yield message_template_validation_1.default.update.validateAsync(req.body);
            const template = yield message_template_service_1.default.findOne({ id });
            if (!template)
                return next(error_handler_1.default.notFound(messages_1.default.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND));
            const data = yield message_template_service_1.default.update({ id }, body);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.MESSAGE.TEMPLATE_MESSAGE_UPDATED }) : next(error_handler_1.default.serverError(messages_1.default.MESSAGE.TEMPLATE_MESSAGE_UPDATE_FAILED));
        });
        this.destroy = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield message_template_service_1.default.destroy({ id });
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.MESSAGE.TEMPLATE_MESSAGE_DELATED }) : next(error_handler_1.default.notFound(messages_1.default.MESSAGE.TEMPLATE_MESSAGE_DELETE_FAILED));
        });
    }
}
exports.default = new MessageTemplateController;

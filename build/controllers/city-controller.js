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
const city_validation_1 = __importDefault(require("../validations/city-validation"));
const response_1 = __importDefault(require("../utils/response"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const city_service_1 = __importDefault(require("../services/city-service"));
class CityController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = yield city_validation_1.default.create.validateAsync(req.body);
            const data = yield city_service_1.default.create(body);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.CITY.CITY_CREATED }) : next(error_handler_1.default.serverError(messages_1.default.CITY.CITY_CREATION_FAILED));
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield city_service_1.default.findAll({ id });
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.CITY.CITY_FOUND, data: data }) : next(error_handler_1.default.notFound(messages_1.default.CITY.CITY_NOT_FOUND));
        });
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield city_service_1.default.findAll({});
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.CITY.CITY_FOUND, data: data }) : next(error_handler_1.default.notFound(messages_1.default.CITY.CITY_NOT_FOUND));
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = yield city_validation_1.default.update.validateAsync(req.body);
            const template = yield city_service_1.default.findOne({ id });
            if (!template)
                return next(error_handler_1.default.notFound(messages_1.default.CITY.CITY_NOT_FOUND));
            const data = yield city_service_1.default.update({ id }, body);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.CITY.CITY_UPDATED }) : next(error_handler_1.default.serverError(messages_1.default.CITY.CITY_UPDATE_FAILED));
        });
        this.destroy = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield city_service_1.default.destroy({ id });
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.CITY.CITY_DELATED }) : next(error_handler_1.default.notFound(messages_1.default.CITY.CITY_DELETE_FAILED));
        });
    }
}
exports.default = new CityController;

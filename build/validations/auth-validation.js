"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class AuthValidation {
    constructor() {
        this.register = joi_1.default.object({
            name: joi_1.default.string().min(3).max(100).required(),
            mobile: joi_1.default.string().min(10).required(),
            password: joi_1.default.string().min(8).max(50).required(),
            device_id: joi_1.default.string().required(),
            coordinates: joi_1.default.string().required().min(10).max(300)
        });
        this.login = joi_1.default.object({
            mobile: joi_1.default.string().min(10).required(),
            password: joi_1.default.string().min(8).max(50).required()
        });
        this.verify = joi_1.default.object({
            mobile: joi_1.default.string().min(10).required(),
            otp: joi_1.default.string().min(6).max(6).required(),
            token: joi_1.default.string().optional(),
        });
    }
}
exports.default = new AuthValidation;

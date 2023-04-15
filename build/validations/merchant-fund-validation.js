"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class MerchantFundValidation {
    constructor() {
        this.create = joi_1.default.object({
            amount: joi_1.default.number().min(1).required()
        });
        this.update = joi_1.default.object({
            amount: joi_1.default.number().min(1).optional()
        });
    }
}
exports.default = new MerchantFundValidation;

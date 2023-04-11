"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class MessageTemplateValidation {
    constructor() {
        this.create = joi_1.default.object({
            title: joi_1.default.string().min(3).max(100).required(),
            type: joi_1.default.string().min(2).required(),
            template_id: joi_1.default.string().min(2).max(50).required(),
            template: joi_1.default.string().min(10).required(),
            status: joi_1.default.boolean().default(true)
        });
        this.update = joi_1.default.object({
            title: joi_1.default.string().min(3).max(100).optional(),
            type: joi_1.default.string().min(2).optional(),
            template_id: joi_1.default.string().min(2).max(50).optional(),
            template: joi_1.default.string().min(10).optional(),
            status: joi_1.default.boolean().optional()
        });
    }
}
exports.default = new MessageTemplateValidation;

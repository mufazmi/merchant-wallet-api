"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const responseSuccess = ({ res, message, data }) => {
    let payload = {
        success: true,
        message
    };
    if (data)
        Object.assign(payload, { data });
    return res.status(constants_1.default.STATUS_CODE.SUCCESS).json(payload);
};
exports.default = responseSuccess;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../utils/constants"));
const sequelize_1 = require("sequelize");
const errorMiddleware = (err, req, res, next) => {
    let errors = '';
    err.statusCode = err.statusCode || constants_1.default.STATUS_CODE.SERVER_ERROR;
    err.message = err.message || constants_1.default.SERVER_MESSAGE.SERVER_ERROR;
    if (err instanceof sequelize_1.ValidationError) {
        err.errors.map((e) => {
            var _a;
            let error;
            console.log(e);
            switch (e.validatorKey) {
                case 'isEmail':
                    error = 'Please enter a valid email';
                    break;
                case 'isDate':
                    error = 'Please enter a valid date';
                    break;
                case 'len':
                    if (e.validatorArgs[0] === e.validatorArgs[1]) {
                        error = 'Use ' + e.validatorArgs[0] + ' characters';
                    }
                    else {
                        error = 'Use between ' + e.validatorArgs[0] + ' and ' + e.validatorArgs[1] + ' characters';
                    }
                    break;
                case 'min':
                    error = 'Use a number greater or equal to ' + e.validatorArgs[0];
                    break;
                case 'max':
                    error = 'Use a number less or equal to ' + e.validatorArgs[0];
                    break;
                case 'isInt':
                    error = 'Please use an integer number';
                    break;
                case 'is_null':
                    error = 'Please complete this field';
                    break;
                case 'not_unique':
                    error = { [(_a = e.path) !== null && _a !== void 0 ? _a : 'error']: e.value + ' is taken. Please choose another one' };
                // e.path = e.path.replace("_UNIQUE", "");
            }
            errors = error;
            console.log({ error });
        });
    }
    let payload = { success: false, message: err.message };
    console.log({ payload });
    if (errors)
        Object.assign(payload, { errors });
    console.log({ payload });
    res.status(err.statusCode).json(payload);
};
exports.default = errorMiddleware;

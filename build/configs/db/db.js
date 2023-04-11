"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
console.log({ config: config_1.default });
const db = new sequelize_1.Sequelize(config_1.default.DB_NAME, config_1.default.DB_USER, config_1.default.DB_PASS, {
    host: config_1.default.DB_HOST,
    dialect: config_1.default.DB_DIALECT
});
try {
    db.authenticate();
    console.log("SUCCESSFULLY CONNECTED WITH DATABASE SERVER");
}
catch (e) {
    console.log("FAILED TO CONNECT WITH DATABASE SERVER");
}
exports.default = db;

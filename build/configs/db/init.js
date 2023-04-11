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
``;
const config_1 = __importDefault(require("../config"));
const admin_wallet_1 = __importDefault(require("../../models/admin-wallet"));
const admin_wallet_transaction_model_1 = __importDefault(require("../../models/admin-wallet-transaction-model"));
const merchant_wallet_1 = __importDefault(require("../../models/merchant-wallet"));
require('./db');
const isDev = config_1.default.APP_ENV === 'development';
console.log("config.APP_ENV === 'development'", config_1.default.APP_ENV === 'development');
const dbInit = () => __awaiter(void 0, void 0, void 0, function* () {
    // await Admin.sync({alter:isDev})
    // await Otp.sync({alter:isDev})
    // await MessageTemplateModel.sync({alter:isDev})
    // await CountryModel.sync({alter:isDev})
    // await StateModel.sync({alter:isDev})
    // await CityModel.sync({alter:isDev})
    // await NotificationTokenModel.sync({alter:isDev})
    // await TokenModel.sync({alter:isDev})
    // await Merchant.sync({alter:isDev})
    yield admin_wallet_1.default.sync({ alter: isDev });
    yield admin_wallet_transaction_model_1.default.sync({ alter: isDev });
    yield merchant_wallet_1.default.sync({ alter: isDev });
});
exports.default = dbInit;

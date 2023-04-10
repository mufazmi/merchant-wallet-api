
import Otp from "../../models/otp-model";
import Admin from "../../models/admin-model";
import CountryModel from "../../models/country-model";``
import MessageTemplateModel from "../../models/message-template-model";
import config from "../config";
import StateModel from "../../models/state-model";
import CityModel from "../../models/city-model";
import NotificationTokenModel from "../../models/notification-token-model";
import Merchant from "../../models/merchant-model";
import TokenModel from "../../models/token-model";
import AdminWalletModel from "../../models/admin-wallet";
import AdminWalletTransactionModel from "../../models/admin-wallet-transaction-model";
import MerchantWalletModel from "../../models/merchant-wallet";
require('./db')

const isDev = config.APP_ENV === 'development'
console.log("config.APP_ENV === 'development'",config.APP_ENV === 'development')

const dbInit = async () =>{
    // await Admin.sync({alter:isDev})
    // await Otp.sync({alter:isDev})
    // await MessageTemplateModel.sync({alter:isDev})
    // await CountryModel.sync({alter:isDev})
    // await StateModel.sync({alter:isDev})
    // await CityModel.sync({alter:isDev})
    // await NotificationTokenModel.sync({alter:isDev})
    // await TokenModel.sync({alter:isDev})
    // await Merchant.sync({alter:isDev})
    await AdminWalletModel.sync({alter:isDev})
    await AdminWalletTransactionModel.sync({alter:isDev})
    await MerchantWalletModel.sync({alter:isDev})
}

export default dbInit
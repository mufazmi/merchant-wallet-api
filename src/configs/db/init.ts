
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
import MerchantFundModel from "../../models/merchant-funds";
import MerchantWalletTransactionModel from "../../models/merchant-wallet-transaction";
import BusinessModel from "../../models/business-model";
<<<<<<< HEAD
import KycDocumentModel from "../../models/kyc-document-model";
import BusinessAddressModel from "../../models/business-address-model";
=======
>>>>>>> d1ea2f4da22767d2345a9c032180d01c9bc7ecd7
require('./db')

const isDev = config.APP_ENV === 'development'
console.log("config.APP_ENV === 'development'",config.APP_ENV === 'development')

const dbInit = async () =>{
<<<<<<< HEAD
    await Admin.sync({alter:isDev})
    await Merchant.sync({alter:isDev})
    await Otp.sync({alter:isDev})
    await MessageTemplateModel.sync({alter:isDev})
    await CountryModel.sync({alter:isDev})
    await StateModel.sync({alter:isDev})
    await CityModel.sync({alter:isDev})
    await NotificationTokenModel.sync({alter:isDev})
    await TokenModel.sync({alter:isDev})
    //Admin
    await AdminWalletModel.sync({alter:isDev})
    await AdminWalletTransactionModel.sync({alter:isDev})

    //Merchant
    await MerchantWalletModel.sync({alter:isDev})
    await MerchantWalletTransactionModel.sync({alter:true})
    await MerchantFundModel.sync({alter:isDev})
    await BusinessModel.sync({alter:true})
    await BusinessAddressModel.sync({alter:true})
    await KycDocumentModel.sync({alter:true})
=======
    // await Admin.sync({alter:isDev})
    await Merchant.sync({alter:isDev})
    // await Otp.sync({alter:isDev})
    // await MessageTemplateModel.sync({alter:isDev})
    // await CountryModel.sync({alter:isDev})
    // await StateModel.sync({alter:isDev})
    // await CityModel.sync({alter:isDev})
    // await NotificationTokenModel.sync({alter:isDev})
    // await TokenModel.sync({alter:isDev})
    // //Admin
    // await AdminWalletModel.sync({alter:isDev})
    // await AdminWalletTransactionModel.sync({alter:isDev})

    // //Merchant
    // await MerchantWalletModel.sync({alter:isDev})
    // await MerchantWalletTransactionModel.sync({alter:true})
    // await MerchantFundModel.sync({alter:isDev})
    await BusinessModel.sync({alter:isDev})
>>>>>>> d1ea2f4da22767d2345a9c032180d01c9bc7ecd7

}

export default dbInit
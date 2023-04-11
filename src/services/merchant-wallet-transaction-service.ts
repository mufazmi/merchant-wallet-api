import { InferCreationAttributes } from "sequelize";
import MerchantWalletTransactionModel from "../models/merchant-wallet-transaction";

class MerchantWalletTransactionService{

    create = async (data:InferCreationAttributes<MerchantWalletTransactionModel>) => await MerchantWalletTransactionModel.create(data);

    findOne = async (filter:any) => await MerchantWalletTransactionModel.findOne({where:filter});

    findAll = async (filter:any) => await MerchantWalletTransactionModel.findAll({where:filter});

    update = async (filter:any,data:any) => await MerchantWalletTransactionModel.update(data,{where:filter});

    destroy = async (filter:any) => await MerchantWalletTransactionModel.destroy({where:filter});
    
}

export default new MerchantWalletTransactionService
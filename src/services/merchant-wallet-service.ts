import MerchantWallet from "../models/merchant-wallet"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class MerchantWalletService{

    create = async (data:InferCreationAttributes<MerchantWallet>) => await MerchantWallet.create(data);

    findOne = async (filter:any) => await MerchantWallet.findOne({where:filter});

    findAll = async (filter:any) => await MerchantWallet.findAll({where:filter});

    update = async (filter:any,data:any) => await MerchantWallet.update(data,{where:filter});

    destroy = async (filter:any) => await MerchantWallet.destroy({where:filter});
    
}

export default new MerchantWalletService
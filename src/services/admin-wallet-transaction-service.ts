import { InferCreationAttributes } from "sequelize";
import AdminWalletModel from "../models/admin-wallet";
import AdminWalletTransaction from "../models/admin-wallet-transaction-model"

class AdminWalletTransactionService{

    create = async (data:InferCreationAttributes<AdminWalletTransaction>) => await AdminWalletTransaction.create(data);
    // create = async (data:InferCreationAttributes<AdminWalletTransaction>) => {
    //     console.log(await AdminWalletTransaction.create(data).toString())
    //     return await AdminWalletTransaction.create(data)
    // };

    findOne = async (filter:any) => await AdminWalletTransaction.findOne({where:filter});

    findAll = async (filter:any) => await AdminWalletTransaction.findAll({where:filter});

    update = async (filter:any,data:any) => await AdminWalletTransaction.update(data,{where:filter});

    destroy = async (filter:any) => await AdminWalletTransaction.destroy({where:filter});

    
}

export default new AdminWalletTransactionService
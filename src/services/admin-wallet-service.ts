import AdminWallet from "../models/admin-wallet"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import Constants from '../utils/constants';
import AdminWalletModel from "../models/admin-wallet";

// const type = Constants.TRANSACTION.TYPE_CREDIT | Constants.TRANSACTION.TYPE_DEBIT

enum type {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT'
}

interface iUpdateAccountBalance {
    data: InferAttributes<AdminWalletModel>,
    amount: number,
    // type: 'credit' | 'debit '
    type: any,
    transaction_type: any
}

class AdminWalletService {

    create = async (data: InferCreationAttributes<AdminWallet>) => await AdminWallet.create(data);

    findOne = async (filter: any) => await AdminWallet.findOne({ where: filter });

    findAll = async (filter: any) => await AdminWallet.findAll({ where: filter });

    update = async (filter: any, data: any) => await AdminWallet.update(data, { where: filter });

    destroy = async (filter: any) => await AdminWallet.destroy({ where: filter });


    updateAccountBalance = async (payload: iUpdateAccountBalance) => {
        let data = null;
        
        if (payload.type === Constants.TRANSACTION.TYPE_CREDIT) {

            let finalAmout = payload.data.pool_account + payload.amount
            
            data = await this.update({},{pool_account:finalAmout})

        } else if (payload.type === Constants.TRANSACTION.TYPE_DEBIT) {
            
            let finalAmout = payload.data.pool_account - payload.amount
            data = await this.update({},{pool_account:finalAmout})
        }else{
            console.log('nottihng')
        }
        return data;
    }

}

export default new AdminWalletService
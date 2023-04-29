import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';
import Admin from './admin-model';

class AdminWalletTransactionModel extends Model<InferAttributes<AdminWalletTransactionModel>, InferCreationAttributes<AdminWalletTransactionModel>> {
    declare id: CreationOptional<string>
    // declare order: number
    declare type: string
    declare transaction_type: string
    declare transaction: string
    declare amount: number
    declare opening_balance: number
    declare closing_balance: number
    declare remark: string
    declare status: string
    declare created_by : ForeignKey<Admin['id']>
    declare updated_by : ForeignKey<Admin['id']>
}

AdminWalletTransactionModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        values: [Constants.WALLET.TYPE_POOL, Constants.WALLET.TYPE_WALLET],
        allowNull: false
    },
    transaction_type: {
        type: DataTypes.ENUM,
        values: [Constants.TRANSACTION.TYPE_CREDIT, Constants.TRANSACTION.TYPE_DEBIT],
        allowNull: false
    },
    transaction: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    opening_balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    closing_balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    remark: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: [Constants.TRANSACTION.STATUS_SUCCESS, Constants.TRANSACTION.STATUS_FAILED],
        allowNull: false
    }
}, {
    tableName: 'admin_wallet_transactions',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default AdminWalletTransactionModel
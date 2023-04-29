import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';
import Merchant from './merchant-model';

class MerchantWalletModel extends Model<InferAttributes<MerchantWalletModel>, InferCreationAttributes<MerchantWalletModel>> {
    declare id: CreationOptional<string>
    declare pg_balance: number
    declare balance: number
    declare hold_balance: number
    declare status: string
    declare merchant_id : ForeignKey<Merchant['id']>
}

MerchantWalletModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    pg_balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    hold_balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        values: [Constants.STATUS.ENABLE, Constants.STATUS.DISABLE, Constants.STATUS.FREEZ],
        defaultValue: Constants.STATUS.ENABLE
    }
}, {
    tableName: 'merchant_wallets',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default MerchantWalletModel
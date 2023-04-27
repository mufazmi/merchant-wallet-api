import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';
import Merchant from './merchant-model';
import MerchantWalletModel from './merchant-wallet';
import Admin from './admin-model';

class MerchantFundModel extends Model<InferAttributes<MerchantFundModel>, InferCreationAttributes<MerchantFundModel, {omit:'id'}>> {
    declare id: CreationOptional<string>
    declare amount: number
    declare status: string
    declare remark: string
    declare merchant_id : ForeignKey<Merchant['id']>
    declare transaction_id : ForeignKey<MerchantWalletModel['id']>
    declare approved_by : ForeignKey<Admin['id']>
}

MerchantFundModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        values: [Constants.STATUS.PENDING, Constants.STATUS.APPROVED, Constants.STATUS.REJECTED],
        defaultValue: Constants.STATUS.PENDING
    },
    remark: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'merchant_funds',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default MerchantFundModel
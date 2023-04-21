import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';
import Merchant from './merchant-model';

class dBusinessModel extends Model<InferAttributes<dBusinessModel>, InferCreationAttributes<dBusinessModel>> {
    declare id: CreationOptional<string>
    declare entity_type: string
    declare name: string
    declare legal_name: string
    declare business_pan: string
    declare gst_number: number
    declare registered_number: string
    // declare relation_ship_manager_name: string
    declare kyc_status: string
    declare merchant_id: ForeignKey<Merchant['id']>
}

dBusinessModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    entity_type: {
        type: DataTypes.STRING,
        values: [Constants.STATUS.ENABLE, Constants.STATUS.DISABLE, Constants.STATUS.FREEZ],
        defaultValue: Constants.STATUS.ENABLE
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    legal_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_pan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gst_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registered_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kyc_status: {
        type: DataTypes.ENUM,
        values: [Constants.STATUS.PENDING, Constants.STATUS.APPROVED],
        defaultValue: Constants.STATUS.PENDING
    },

}, {
    tableName: 'merchant_wallets',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default dBusinessModel
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';
import Merchant from './merchant-model';

class BusinessModel extends Model<InferAttributes<BusinessModel>, InferCreationAttributes<BusinessModel>> {
    declare id: CreationOptional<string>
    declare entity_type: string
    declare name: string
    declare legal_name: string
    declare business_pan: string
    declare gst_number: number
    declare aadhar_number: number
    declare pan_number: number
    declare registered_number: string
    // declare relation_ship_manager_name: string
    declare kyc_status: string
    declare merchant_id: ForeignKey<Merchant['id']>
}

BusinessModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    entity_type: {
        type: DataTypes.STRING,
        values: [Constants.ENTITY.TYPE_TEST],
        defaultValue: Constants.ENTITY.TYPE_TEST
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
    aadhar_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pan_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registered_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    kyc_status: {
        type: DataTypes.ENUM,
        values: [Constants.STATUS.PENDING, Constants.STATUS.APPROVED],
        defaultValue: Constants.STATUS.PENDING
    },

}, {
    tableName: 'businesses',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default BusinessModel
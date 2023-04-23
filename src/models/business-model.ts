import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
<<<<<<< HEAD
import Constants from '../utils/constants';
import Merchant from './merchant-model';
import BusinessAddressModel from './business-address-model';

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

BusinessModel.hasOne(BusinessAddressModel,{sourceKey:'id',foreignKey:'business_id'})
=======
import Merchant from './merchant-model';
import StateModel from './state-model';

class BusinessModel extends Model<InferAttributes<BusinessModel>,InferCreationAttributes<BusinessModel>> {
    declare id:CreationOptional<string>
    declare name:string
    declare legal_name:string
    declare pan:string
    declare gst:string
    declare no:string
    declare type:string
    declare status:string
    declare owner_id : ForeignKey<Merchant['id']>
}

BusinessModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    legal_name:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    pan:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    gst:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    no:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    type:{
        type:DataTypes.STRING(10),
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM,
        values:['kyc_pending'],
        defaultValue:'kyc_pending'
    }
},{
    tableName:'businesses',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

>>>>>>> d1ea2f4da22767d2345a9c032180d01c9bc7ecd7

export default BusinessModel
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
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


export default BusinessModel
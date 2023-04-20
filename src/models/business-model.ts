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
    declare status:boolean
    declare merchant_id : ForeignKey<Merchant['id']>
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
        unique:true,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'businesses',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

BusinessModel.hasMany(StateModel,{
    sourceKey:'id',
    foreignKey:'business_id'
})

export default BusinessModel
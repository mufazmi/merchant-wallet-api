import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import Merchant from './merchant-model';

class KycDocumentModel extends Model<InferAttributes<KycDocumentModel>,InferCreationAttributes<KycDocumentModel,{omit:'id'}>> {
    declare id?:CreationOptional<string>
    declare pan_front:string
    declare aadhar_front:string
    declare aadhar_back:string
    declare proof:string
    declare merchant_id : ForeignKey<Merchant['id']>
}

KycDocumentModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    pan_front:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    aadhar_front:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    aadhar_back:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    proof:{
        type:DataTypes.STRING(128),
        allowNull:true
    }
},{
    tableName:'kyc_documents',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default KycDocumentModel
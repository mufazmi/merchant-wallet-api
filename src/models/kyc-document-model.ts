import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import StateModel from './state-model';

class CityModel extends Model<InferAttributes<CityModel>,InferCreationAttributes<CityModel>> {
    declare id:CreationOptional<string>
    declare pan_front:string
    declare aadhar_front:string
    declare aadhar_back:string
    declare proof:string
    declare stateId : ForeignKey<StateModel['id']>
}

CityModel.init({
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
        allowNull:false
    }
},{
    tableName:'kyc_documents',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default CityModel
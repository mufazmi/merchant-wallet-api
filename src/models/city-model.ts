import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import StateModel from './state-model';

class CityModel extends Model<InferAttributes<CityModel>,InferCreationAttributes<CityModel>> {
    declare id:CreationOptional<string>
    declare name:string
    declare status:boolean
    declare stateId : ForeignKey<StateModel['id']>
}

CityModel.init({
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
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'cities',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default CityModel
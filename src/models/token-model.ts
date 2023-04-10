import { Model,InferAttributes,InferCreationAttributes,CreationOptional, DataTypes } from "sequelize";
import db from "../configs/db/db";
import { UUIDV4,ForeignKey } from "sequelize";
import AdminModel from "./admin-model";

class TokenModel extends Model<InferAttributes<TokenModel>,InferCreationAttributes<TokenModel>>{
   
    declare id : CreationOptional<string>
    declare token:string
    declare device:string
    declare user_id:ForeignKey<AdminModel['id']>
}

TokenModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    device:{
        type:DataTypes.STRING,
        allowNull:false
    },
    token:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    timestamps:true,
    underscored:true,
    freezeTableName:true,
    tableName:'tokens',
    sequelize:db,
})

export default TokenModel
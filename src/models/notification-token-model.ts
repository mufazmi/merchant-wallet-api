import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import AdminModel from './admin-model';

class NotificationTokenModel extends Model<InferAttributes<NotificationTokenModel>,InferCreationAttributes<NotificationTokenModel>> {
    declare id:CreationOptional<string>
    declare deviceId:string
    declare token:boolean
    declare adminId : ForeignKey<AdminModel['id']>
}

NotificationTokenModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    deviceId:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    token:{
        type:DataTypes.STRING(1000),
        allowNull:false
    }
},{
    tableName:'notification_tokens',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default NotificationTokenModel
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import db from "../configs/db/db";

class MessageTemplateModel extends Model<InferAttributes<MessageTemplateModel>,InferCreationAttributes<MessageTemplateModel>> {
    declare id:CreationOptional<string>
    declare title:string
    declare type:string
    declare template_id:string
    declare template:string
    declare status:boolean
}

MessageTemplateModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    type:{
        type:DataTypes.STRING(128),
        allowNull:false,
        unique:true
    },
    template_id:{
        type:DataTypes.STRING(128),
        allowNull:false,
        unique:true
    },
    template:{
        type:DataTypes.STRING(2000),
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'message_templates',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default MessageTemplateModel
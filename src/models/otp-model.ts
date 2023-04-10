import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional, HasManyAddAssociationMixin, HasMany } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';
import Admin from './admin-model';

class Otp extends Model<InferAttributes<Otp>,InferCreationAttributes<Otp>> {
    declare id:CreationOptional<string>
    declare otp:string
    declare type:CreationOptional<string>
    // declare setAdmin: HasManyAddAssociationMixin<Admin, string>;
    declare userId: ForeignKey<Admin['id']>
}

Otp.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    otp:{
        type:DataTypes.STRING(6),
        allowNull:false
    },
    type:{
        type:DataTypes.ENUM,
        values:[Constants.OTP_TYPE.MOBILE_VERIFICATION, Constants.OTP_TYPE.FORGOT_PASSWORD],
        defaultValue:[Constants.OTP_TYPE.MOBILE_VERIFICATION]
    }
},{
    tableName:'otps',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});


// Otp.belongsTo(Admin,{targetKey:'id'});


export default Otp
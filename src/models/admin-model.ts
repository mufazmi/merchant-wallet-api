import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, Sequelize, HasManyAddAssociationMixin, HasManySetAssociationsMixin } from 'sequelize';
import db from "../configs/db/db";
import Otp from './otp-model';
import bcrypt from 'bcryptjs'
import Constants from '../utils/constants';
import MerchantFundModel from './merchant-funds';

class Admin extends Model<InferAttributes<Admin>,InferCreationAttributes<Admin>>{

    declare id:CreationOptional<string>
    declare name: string
    declare mobile: string
    declare email: string
    declare password:string
    declare role : string
    declare accountId : string
    declare coordinates :string
    declare isPhoneVerified:boolean
    declare isEmailVerified:boolean
    declare createOtp: HasManyAddAssociationMixin<Otp, 'user_id'>;
    declare setAdmin: HasManySetAssociationsMixin<Otp, string>;
}

Admin.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    mobile:{
        type:DataTypes.STRING(13),
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM,
        values:[Constants.ADMIN.ROLE_DIRECTOR,Constants.ADMIN.ROLE_OPERATOR,Constants.ADMIN.ROLE_TECHNICAL],
        defaultValue:Constants.ADMIN.ROLE_DIRECTOR
    },
    accountId:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    coordinates:{
        type:DataTypes.STRING(500),
        allowNull:false,
    },
    isEmailVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    isPhoneVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
},{

    tableName:'admins',
    timestamps:true,
    underscored:true,
    freezeTableName:true,
    sequelize:db
});


const salt = bcrypt.genSaltSync(3);
let password = bcrypt.hashSync('password',salt);

console.log({password})

Admin.beforeCreate((user)=>{
    const salt = bcrypt.genSaltSync(3);
    user.password = bcrypt.hashSync(user.password,salt);
})

Admin.hasMany(Otp,{sourceKey:'id',foreignKey:'user_id',as:'otps'});

Admin.hasMany(MerchantFundModel,{sourceKey:'id',foreignKey:'approved_by',as:'merchant_funds'});

export default Admin
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, Sequelize, HasManyAddAssociationMixin, HasManySetAssociationsMixin } from 'sequelize';
import db from "../configs/db/db";
import bcrypt from 'bcryptjs';
import Otp from './otp-model';
import Constants from '../utils/constants';
import MerchantWalletModel from './merchant-wallet';
import MerchantFundModel from './merchant-funds';
import AdminWalletModel from './admin-wallet';
import BusinessModel from './business-model';
import KycDocumentModel from './kyc-document-model';
import BusinessAddressModel from './business-address-model';

class Merchant extends Model<InferAttributes<Merchant>,InferCreationAttributes<Merchant>>{

    declare id:CreationOptional<string>
    declare name: string
    declare mobile: string
    declare email: string
    declare password:string
    declare role : string
    declare accountId : string
    declare coordinates :string
    declare status :string
    declare lockType :string
    declare passCode :string
    declare isPhoneVerified:boolean
    declare isEmailVerified:boolean
    declare createOtp: HasManyAddAssociationMixin<Otp, 'user_id'>;
    declare setMerchant: HasManySetAssociationsMixin<Otp, string>;
}

Merchant.init({
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
    },
    status:{
        type:DataTypes.ENUM,
        values:[Constants.TYPE.KYC_PENDING,Constants.TYPE.KYC_SUBMITTED,Constants.TYPE.ACTIVE,Constants.TYPE.SUSPENDED],
        defaultValue:Constants.TYPE.KYC_PENDING
    },
    lockType:{
        type:DataTypes.ENUM,
        values:[Constants.LOCK.NOTHING,Constants.LOCK.PASSCODE,Constants.LOCK.DEVICE],
        defaultValue:Constants.LOCK.NOTHING
    },
    passCode:{
        type:DataTypes.STRING(50),
        allowNull:true,
    },
},{

    tableName:'merchants',
    timestamps:true,
    underscored:true,
    freezeTableName:true,
    sequelize:db
});


const salt = bcrypt.genSaltSync(3);
let password = bcrypt.hashSync('password',salt);
console.log({password})


Merchant.beforeCreate((user)=>{
    const salt = bcrypt.genSaltSync(3);
    user.password = bcrypt.hashSync(user.password,salt);
})


Merchant.hasMany(Otp,{sourceKey:'id',foreignKey:'merchant_id',as:'otps'});

Merchant.hasOne(MerchantWalletModel,{sourceKey:'id',foreignKey:'merchant_id',as:'wallet'});

Merchant.hasOne(BusinessModel,{sourceKey:'id',foreignKey:'merchant_id',as:'business'});

BusinessModel.belongsTo(Merchant,{foreignKey:'merchant_id',as:'business'});

Merchant.hasMany(MerchantFundModel,{sourceKey:'id',foreignKey:'merchant_id',as:'merchant_fund'});

Merchant.hasMany(AdminWalletModel,{sourceKey:'id',foreignKey:'approved_by',as:'approved_by'});

Merchant.hasOne(KycDocumentModel,{sourceKey:'id',foreignKey:'merchant_id',as:'kys_documents'});

Merchant.hasOne(BusinessAddressModel,{sourceKey:'id',foreignKey:'merchant_id',as:'business_address'});

export default Merchant
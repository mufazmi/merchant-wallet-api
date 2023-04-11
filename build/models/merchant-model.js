"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const otp_model_1 = __importDefault(require("./otp-model"));
const constants_1 = __importDefault(require("../utils/constants"));
const merchant_wallet_1 = __importDefault(require("./merchant-wallet"));
class Merchant extends sequelize_1.Model {
}
Merchant.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING(13),
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM,
        values: [constants_1.default.ADMIN.ROLE_DIRECTOR, constants_1.default.ADMIN.ROLE_OPERATOR, constants_1.default.ADMIN.ROLE_TECHNICAL],
        defaultValue: constants_1.default.ADMIN.ROLE_DIRECTOR
    },
    accountId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    coordinates: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
    },
    isEmailVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isPhoneVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: [constants_1.default.TYPE.KYC_PENDING, constants_1.default.TYPE.KYC_SUBMITTED, constants_1.default.TYPE.ACTIVE, constants_1.default.TYPE.SUSPENDED],
        defaultValue: constants_1.default.TYPE.KYC_PENDING
    },
    lockType: {
        type: sequelize_1.DataTypes.ENUM,
        values: [constants_1.default.LOCK.NOTHING, constants_1.default.LOCK.PASSCODE, constants_1.default.LOCK.DEVICE],
        defaultValue: constants_1.default.LOCK.NOTHING
    },
    passCode: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    tableName: 'merchants',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    sequelize: db_1.default
});
const salt = bcrypt_1.default.genSaltSync(3, 'a');
let password = bcrypt_1.default.hashSync('password', salt);
console.log({ password });
Merchant.beforeCreate((user) => {
    const salt = bcrypt_1.default.genSaltSync(3, 'a');
    user.password = bcrypt_1.default.hashSync(user.password, salt);
});
Merchant.hasMany(otp_model_1.default, { sourceKey: 'id', foreignKey: 'merchant_id', as: 'otps' });
Merchant.hasOne(merchant_wallet_1.default, { sourceKey: 'id', foreignKey: 'merchant_id', as: 'wallet' });
exports.default = Merchant;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const constants_1 = __importDefault(require("../utils/constants"));
class Otp extends sequelize_1.Model {
}
Otp.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    otp: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.ENUM,
        values: [constants_1.default.OTP_TYPE.MOBILE_VERIFICATION, constants_1.default.OTP_TYPE.FORGOT_PASSWORD],
        defaultValue: [constants_1.default.OTP_TYPE.MOBILE_VERIFICATION]
    }
}, {
    tableName: 'otps',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db_1.default
});
// Otp.belongsTo(Admin,{targetKey:'id'});
exports.default = Otp;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const constants_1 = __importDefault(require("../utils/constants"));
class MerchantWalletModel extends sequelize_1.Model {
}
MerchantWalletModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    pg_balance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    hold_balance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    balance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        values: [constants_1.default.STATUS.ENABLE, constants_1.default.STATUS.DISABLE, constants_1.default.STATUS.FREEZ],
        defaultValue: constants_1.default.STATUS.ENABLE
    }
}, {
    tableName: 'merchant_wallets',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db_1.default
});
exports.default = MerchantWalletModel;

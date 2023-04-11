"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const constants_1 = __importDefault(require("../utils/constants"));
class AdminWalletTransactionModel extends sequelize_1.Model {
}
AdminWalletTransactionModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    // order: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    type: {
        type: sequelize_1.DataTypes.ENUM,
        values: [constants_1.default.WALLET.TYPE_POOL, constants_1.default.WALLET.TYPE_WALLET],
        allowNull: false
    },
    transaction_type: {
        type: sequelize_1.DataTypes.ENUM,
        values: [constants_1.default.TRANSACTION.TYPE_CREDIT, constants_1.default.TRANSACTION.TYPE_DEBIT],
        allowNull: false
    },
    transaction: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    opening_balance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    closing_balance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    remark: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: [constants_1.default.TRANSACTION.STATUS_SUCCESS, constants_1.default.TRANSACTION.STATUS_SUCCESS],
        allowNull: false
    }
}, {
    tableName: 'admin_wallet_transactions',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db_1.default
});
exports.default = AdminWalletTransactionModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const constants_1 = __importDefault(require("../utils/constants"));
class MerchantFundModel extends sequelize_1.Model {
}
MerchantFundModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        values: [constants_1.default.STATUS.PENDING, constants_1.default.STATUS.APPROVED, constants_1.default.STATUS.REJECTED],
        defaultValue: constants_1.default.STATUS.PENDING
    }
}, {
    tableName: 'merchant_funds',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db_1.default
});
exports.default = MerchantFundModel;

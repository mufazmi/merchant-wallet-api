"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const sequelize_2 = require("sequelize");
class TokenModel extends sequelize_1.Model {
}
TokenModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_2.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    device: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'tokens',
    sequelize: db_1.default,
});
exports.default = TokenModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
class NotificationTokenModel extends sequelize_1.Model {
}
NotificationTokenModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    deviceId: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false
    }
}, {
    tableName: 'notification_tokens',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db_1.default
});
exports.default = NotificationTokenModel;

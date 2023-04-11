"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const city_model_1 = __importDefault(require("./city-model"));
class StateModel extends sequelize_1.Model {
}
StateModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'states',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db_1.default
});
StateModel.hasMany(city_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'state_id'
});
exports.default = StateModel;

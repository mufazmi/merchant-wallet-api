"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const state_model_1 = __importDefault(require("./state-model"));
class CountryModel extends sequelize_1.Model {
}
CountryModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'countries',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db_1.default
});
CountryModel.hasMany(state_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'country_id'
});
exports.default = CountryModel;

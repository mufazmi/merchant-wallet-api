
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";

class NavigationModel extends Model<InferAttributes<NavigationModel>, InferCreationAttributes<NavigationModel>> {
    declare id: CreationOptional<string>
    declare page_name: string
    declare url: string
    declare icon: string
    declare tree_view: number
    declare parent: number
    declare order_by: number
    declare depth: number
}

NavigationModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    page_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tree_view: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue:0
    },
    parent: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue:0
    },
    order_by: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue:0
    },
    depth: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue:0
    },
}, {
    tableName: 'admin_navigation',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default NavigationModel
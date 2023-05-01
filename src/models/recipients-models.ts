import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional, HasManyAddAssociationMixin, HasMany } from 'sequelize';
import db from "../configs/db/db";

class Recipient extends Model<InferAttributes<Recipient>, InferCreationAttributes<Recipient>> {
    declare id: CreationOptional<string>
    declare customer_id: string
    declare recipient_id: number
    declare bank_name: string
    declare ifsc: string
    declare branch: string
    declare account: number
    declare recipient_name: string
    declare recipient_mobile: number
    declare status: string
}

Recipient.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    customer_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipient_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ifsc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    recipient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipient_mobile: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['1', '2'],
        defaultValue: '1'
    }
}, {
    tableName: 'recipients',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default Recipient
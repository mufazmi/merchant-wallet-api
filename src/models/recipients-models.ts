import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional, HasManyAddAssociationMixin, HasMany } from 'sequelize';
import db from "../configs/db/db";

class Recipient extends Model<InferAttributes<Recipient>, InferCreationAttributes<Recipient>> {
    declare id: CreationOptional<string>
    declare customer_id: string
    declare recipient_id: CreationOptional<number>
    declare bank_name: string
    declare ifsc_code: string
    declare branch: CreationOptional<string>
    declare account_number: number
    declare recipient_name: string
    declare recipient_mobile: CreationOptional<number>
    declare status: CreationOptional<string>
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
        allowNull: true
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ifsc_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    account_number: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    recipient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipient_mobile: {
        type: DataTypes.BIGINT,
        allowNull: true
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
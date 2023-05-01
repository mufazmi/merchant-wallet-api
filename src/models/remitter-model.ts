import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import db from "../configs/db/db";

class Remitter extends Model<InferAttributes<Remitter>, InferCreationAttributes<Remitter>> {
    declare id: CreationOptional<string>
    declare customer_id : string
    declare mobile : number
    declare name : string
    declare dob : string
    declare onboard_by : string
    declare address : string
    declare total_limit : number
    declare available_limit : number
    declare status : string
    declare otp_ref_id : string
}

Remitter.init({
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
    mobile: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    dob: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    onboard_by: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    address: {
        type: DataTypes.JSON,
        allowNull: false
    },
    total_limit: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 25000.00
    },
    available_limit: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Verification Pending'
    },
    otp_ref_id: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'remitters',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default Remitter
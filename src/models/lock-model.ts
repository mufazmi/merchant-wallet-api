import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional, HasManyAddAssociationMixin, HasMany } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';
import Merchant from './merchant-model';

class Lock extends Model<InferAttributes<Lock>, InferCreationAttributes<Lock>> {
    declare id: CreationOptional<string>
    declare user_id: ForeignKey<Merchant['id']>
    declare pin: CreationOptional<string>
    declare status: string;
    declare blocked_at: Date
    declare unblocked_at: Date
    declare failed_attempt: number;
}

Lock.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    pin: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null
    },
    failed_attempt: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM,
        values: ["disabled", "enable", "blocked"],
        defaultValue: "disabled"
    },
    blocked_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    unblocked_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
    {
        tableName: 'locks',
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        sequelize: db
    });


// Lock.belongsTo(Admin,{targetKey:'id'});


export default Lock
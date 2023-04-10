import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import db from "../configs/db/db";

class MerchantWalletModel extends Model<InferAttributes<MerchantWalletModel>, InferCreationAttributes<MerchantWalletModel>> {
    declare id: CreationOptional<string>
    declare wallet: number
    declare pool_account: number
    declare status: boolean
}

MerchantWalletModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    wallet: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    pool_account: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'merchant_wallets',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default MerchantWalletModel
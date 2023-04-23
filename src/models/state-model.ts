import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import CountryModel from './country-model';
import CityModel from './city-model';
import BusinessAddressModel from './business-address-model';

class StateModel extends Model<InferAttributes<StateModel>, InferCreationAttributes<StateModel>> {
    declare id: CreationOptional<string>
    declare name: string
    declare status: boolean
    declare countryId: ForeignKey<CountryModel['id']>
}

StateModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'states',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

StateModel.hasMany(
    CityModel,
    {
        sourceKey: 'id',
        foreignKey: 'state_id'
    }
)

StateModel.hasMany(BusinessAddressModel, { sourceKey: 'id', foreignKey: 'state_id', as: 'state' })

BusinessAddressModel.belongsTo(StateModel, { foreignKey: 'state_id', as: 'state' });

export default StateModel
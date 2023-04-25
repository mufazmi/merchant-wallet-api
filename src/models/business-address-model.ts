import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from "../configs/db/db";
import Merchant from './merchant-model';
import CityModel from './city-model';
import CountryModel from './country-model';
import StateModel from './state-model';
import BusinessModel from './business-model';

class BusinessAddressModel extends Model<InferAttributes<BusinessAddressModel>, InferCreationAttributes<BusinessAddressModel>> {
    declare id: CreationOptional<string>
    declare area: string
    declare district: string
    declare pin_code: string
    declare merchant_id: ForeignKey<Merchant['id']>
    declare business_id: ForeignKey<BusinessModel['id']>
    declare country_id: ForeignKey<CountryModel['id']>
    declare state_id: ForeignKey<StateModel['id']>
    declare city_id: ForeignKey<CityModel['id']>
}

BusinessAddressModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pin_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'business_addresses',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});


export default BusinessAddressModel
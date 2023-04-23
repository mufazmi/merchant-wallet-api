import BusinessAddress from "../models/business-address-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import CountryModel from "../models/country-model";
import StateModel from "../models/state-model";
import CityModel from "../models/city-model";
class BusinessAddressService {

    create = async (data: InferCreationAttributes<BusinessAddress>) => await BusinessAddress.create(data);

    findOne = async (filter: any) => await BusinessAddress.findOne({
        where: filter, include: [
            { model: CountryModel, attributes: ['id', 'name'], as: 'country' },
            { model: StateModel, attributes: ['id', 'name'], as: 'state' },
            { model: CityModel, attributes: ['id', 'name'], as: 'city' }
        ]
    });

    findAll = async (filter: any) => await BusinessAddress.findAll({ where: filter });

    update = async (filter: any, data: any) => await BusinessAddress.update(data, { where: filter });

    destroy = async (filter: any) => await BusinessAddress.destroy({ where: filter });
}

export default new BusinessAddressService
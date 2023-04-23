import BusinessAddress from "../models/business-address-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class BusinessAddressService {

    create = async (data: InferCreationAttributes<BusinessAddress>) => await BusinessAddress.create(data);

    findOne = async (filter: any) => await BusinessAddress.findOne({ where: filter });

    findAll = async (filter: any) => await BusinessAddress.findAll({ where: filter });

    update = async (filter: any, data: any) => await BusinessAddress.update(data, { where: filter });

    destroy = async (filter: any) => await BusinessAddress.destroy({ where: filter });

}

export default new BusinessAddressService
import Country from "../models/country-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class CountryService{

    create = async (data:InferCreationAttributes<Country>) => await Country.create(data);

    findOne = async (filter:any) => await Country.findOne({where:filter});

    findAll = async (filter:any) => await Country.findAll({where:filter});

    update = async (filter:any,data:any) => await Country.update(data,{where:filter});

    destroy = async (filter:any) => await Country.destroy({where:filter});
}

export default new CountryService
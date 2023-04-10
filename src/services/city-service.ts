import City from "../models/city-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class CityService{

    create = async (data:InferCreationAttributes<City>) => await City.create(data);

    findOne = async (filter:any) => await City.findOne({where:filter});

    findAll = async (filter:any) => await City.findAll({where:filter});

    update = async (filter:any,data:any) => await City.update(data,{where:filter});

    destroy = async (filter:any) => await City.destroy({where:filter});
    
}

export default new CityService
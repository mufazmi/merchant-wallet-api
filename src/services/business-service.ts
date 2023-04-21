import Business from "../models/business-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class BusinessService{

    create = async (data:InferCreationAttributes<Business>) => await Business.create(data);

    findOne = async (filter:any) => await Business.findOne({where:filter});

    findAll = async (filter:any) => await Business.findAll({where:filter});

    update = async (filter:any,data:any) => await Business.update(data,{where:filter});

    destroy = async (filter:any) => await Business.destroy({where:filter});
    
}

export default new BusinessService
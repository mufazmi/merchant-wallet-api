import Remitter from "../models/remitter-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class RemitterService{

    create = async (data:InferCreationAttributes<Remitter>) => await Remitter.create(data);

    findOne = async (filter:any) => await Remitter.findOne({where:filter});

    findAll = async (filter:any) => await Remitter.findAll({where:filter});

    update = async (filter:any,data:any) => await Remitter.update(data,{where:filter});

    destroy = async (filter:any) => await Remitter.destroy({where:filter});
    
    
}

export default new RemitterService
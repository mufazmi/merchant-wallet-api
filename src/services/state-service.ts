import State from "../models/state-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class StateService{

    create = async (data:InferCreationAttributes<State>) => await State.create(data);

    findOne = async (filter:any) => await State.findOne({where:filter});

    findAll = async (filter:any) => await State.findAll({where:filter});

    update = async (filter:any,data:any) => await State.update(data,{where:filter});

    destroy = async (filter:any) => await State.destroy({where:filter});
    
}

export default new StateService
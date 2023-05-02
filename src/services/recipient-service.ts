import Recipient from "../models/recipients-models"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class RecipientService{

    create = async (data:InferCreationAttributes<Recipient>) => await Recipient.create(data);

    findOne = async (filter:any) => await Recipient.findOne({where:filter});

    findAll = async (filter:any) => await Recipient.findAll({where:filter});

    update = async (filter:any,data:any) => await Recipient.update(data,{where:filter});

    destroy = async (filter:any) => await Recipient.destroy({where:filter});
    
}

export default new RecipientService
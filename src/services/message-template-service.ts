import MessageTemplate from "../models/message-template-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class MessageTemplateService{

    create = async (data:InferCreationAttributes<MessageTemplate>) => await MessageTemplate.create(data);

    findOne = async (filter:any) => await MessageTemplate.findOne({where:filter});

    findAll = async (filter:any) => await MessageTemplate.findAll({where:filter});

    update = async (filter:any,data:any) => await MessageTemplate.update(data,{where:filter});

    destroy = async (filter:any) => await MessageTemplate.destroy({where:filter});
    
}

export default new MessageTemplateService
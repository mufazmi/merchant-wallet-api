import NotificationToken from "../models/notification-token-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';

class NotificationTokenService{

    create = async (data:InferCreationAttributes<NotificationToken>) => await NotificationToken.create(data);

    findOne = async (filter:any) => await NotificationToken.findOne({where:filter});

    findAll = async (filter:any) => await NotificationToken.findAll({where:filter});

    update = async (filter:any,data:any) => await NotificationToken.update(data,{where:filter});

    destroy = async (filter:any) => await NotificationToken.destroy({where:filter});
}

export default new NotificationTokenService
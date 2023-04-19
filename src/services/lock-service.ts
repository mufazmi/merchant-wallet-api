import Lock from "../models/lock-model"
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import bcrypt from 'bcryptjs';


class LockService {

    create = async (data: InferCreationAttributes<Lock>) => await Lock.create(data);

    findOne = async (where: any) => await Lock.findOne({ where })

    update = async (where: any, body: any) => await Lock.update(where, body)

    incrementFailedAttempt = async (filter:{by:number}) => await Lock.increment('failed_attempt', {
        by: filter.by
    });

    destroy = async (where: any) => await Lock.destroy({ where })

}


export default new LockService
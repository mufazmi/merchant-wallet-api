import Lock from "../models/lock-model"
import { InferCreationAttributes } from 'sequelize';


class LockService {

    create = async (data: InferCreationAttributes<Lock>) => await Lock.create(data);

    findOne = async (where: any) => await Lock.findOne({ where })

    update = async (where: any, body: any) => await Lock.update(body, { where: where })

    incrementFailedAttempt1 = async (filter: { by: number }) => await Lock.increment('failed_attempt', {
        by: filter.by
    });

    incrementFailedAttempt = async (filter: { by: number, merchant_id: string }) => await Lock.increment('failed_attempt', {
        by: filter.by,
        where: {
            merchant_id: filter.merchant_id
        }
    });


    destroy = async (where: any) => await Lock.destroy({ where })

}


export default new LockService
import Merchant from "../models/merchant-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import bcrypt from 'bcryptjs';
import Constants from "../utils/constants";
import moment from 'moment';

class MerchantService {

    create = async (data: InferCreationAttributes<Merchant>) => await Merchant.create(data);

    findOne = async (filter: any) => await Merchant.findOne({ where: filter });

    update = async (filter: any, data: any) => await Merchant.update(data, { where: filter });

    verifyPassword = (plane: string, hash: string): boolean => {
        const isPasswordMatched = bcrypt.compareSync(plane, hash)
        console.log({ isPasswordMatched });
        return isPasswordMatched;
    }

    block = async (filter: any) => {
        const now = moment();
        const later = now.clone().add(24, 'hours');
        return await Merchant.update({ is_blocked: true, blocked_at: now, unblocked_at: later }, { where: filter });
    }


    unblock = async (filter: any) => {
        return await Merchant.update({ is_blocked: false }, { where: filter });
    }

}

export default new MerchantService
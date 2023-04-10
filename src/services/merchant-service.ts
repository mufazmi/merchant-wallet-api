import Merchant from "../models/merchant-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import bcrypt from 'bcrypt';

class MerchantService{

    createMerchant = async (data:InferCreationAttributes<Merchant>) => await Merchant.create(data);

    findMerchant = async (filter:any) => await Merchant.findOne({where:filter});

    updateMerchant = async (filter:any,data:any) => await Merchant.update(data,{where:filter});

    verifyPassword =  (plane:string,hash:string) : boolean =>{
        const isPasswordMatched = bcrypt.compareSync(plane,hash)
        console.log({isPasswordMatched});
        return isPasswordMatched;
    }

}

export default new MerchantService
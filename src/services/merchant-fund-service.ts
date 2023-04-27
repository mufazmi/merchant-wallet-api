import MerchantFund from "../models/merchant-funds"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class MerchantFundService{

    // create = async (data:InferCreationAttributes<MerchantFund>) => await MerchantFund.create(data,{logging:true});

    create = async (data:InferCreationAttributes<MerchantFund>) => {
        console.log("Data============>",data);
        return await MerchantFund.create(data,{logging:console.log})
    };

    findOne = async (filter:any) => await MerchantFund.findOne({where:filter});

    findAll = async (filter:any) => await MerchantFund.findAll({where:filter});

    update = async (filter:any,data:any) => await MerchantFund.update(data,{where:filter});

    destroy = async (filter:any) => await MerchantFund.destroy({where:filter});
    
}

export default new MerchantFundService
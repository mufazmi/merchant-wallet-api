import Joi from 'joi'

class MerchantFundValidation {

    create = Joi.object({
        amount:Joi.string().min(2).max(100).required()
    });

    update = Joi.object({        
        amount:Joi.string().min(2).max(100).optional()
    });

}

export default new MerchantFundValidation
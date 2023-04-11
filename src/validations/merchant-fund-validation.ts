import Joi from 'joi'

class MerchantFundValidation {

    create = Joi.object({
        amount:Joi.number().min(1).required()
    });

    update = Joi.object({        
        amount:Joi.number().min(1).optional()
    });

}

export default new MerchantFundValidation
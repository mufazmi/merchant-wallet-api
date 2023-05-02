import Joi from 'joi'

class RecipientValidation {

    create = Joi.object({
        customer_id:Joi.string().required(),
        bank_name:Joi.string().required(),
        ifsc_code: Joi.string().required(),
        account_number: Joi.string().required(),
        recipient_name:Joi.string().required()
    });

    update = Joi.object({        
        customer_id:Joi.string().optional(),
        bank_name:Joi.string().optional(),
        ifsc_code: Joi.string().optional(),
        account_number: Joi.string().optional(),
        recipient_name:Joi.string().optional()
    });


}

export default new RecipientValidation
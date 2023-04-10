import Joi from 'joi'

class CountryValidation {

    create = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        code : Joi.string().min(2).max(10).required(),
        status: Joi.boolean().default(true)
    });

    update = Joi.object({        
        name:Joi.string().min(2).max(100).optional(),
        code : Joi.string().min(2).max(10).optional(),
        status: Joi.boolean().default(true)
    });

}

export default new CountryValidation
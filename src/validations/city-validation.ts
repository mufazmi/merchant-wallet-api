import Joi from 'joi'

class CityValidation {

    create = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        code : Joi.string().min(2).max(10).required(),
        state_id : Joi.string().uuid().required(),
        status: Joi.boolean().default(true)
    });

    update = Joi.object({        
        name:Joi.string().min(2).max(100).optional(),
        status: Joi.boolean().default(true),
        state_id : Joi.string().uuid().optional(),
    });

}

export default new CityValidation
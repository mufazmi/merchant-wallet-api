import Joi from 'joi'

class StateValidation {

    create = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        code : Joi.string().min(2).max(10).required(),
        country_id : Joi.string().uuid().required(),
        status: Joi.boolean().default(true),
    });

    update = Joi.object({        
        name:Joi.string().min(2).max(100).optional(),
        code : Joi.string().min(2).max(10).optional(),
        country_id : Joi.string().uuid().optional(),
        status: Joi.boolean().default(true)
    });

}

export default new StateValidation
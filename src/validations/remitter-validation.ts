import Joi from 'joi'

class RemitterValidation {

    create = Joi.object({
        name:Joi.string().required(),
        mobile:Joi.string().min(10).max(13).required(),
        dob: Joi.string().required(),
        address: Joi.string().required(),
        otp_ref_id:Joi.string().required()
    });

    update = Joi.object({        
        amount:Joi.number().min(1).optional()
    });

    searchOne = Joi.object({        
        mobile : Joi.string().min(10).max(13).required()
    });

}

export default new RemitterValidation
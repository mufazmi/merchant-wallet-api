import Joi from 'joi'

class BusinessValidation {

    create = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        legal_name:Joi.string().min(2).max(100).required(),
        pan:Joi.string().min(10).max(10).required(),
        gst:Joi.string().min(15).max(15).required(),
        no:Joi.string().min(2).max(20).required(),
        type:Joi.string().min(2).max(100).required(),
        status: Joi.string().optional()
    });

    update = Joi.object({        
        name:Joi.string().min(2).max(100).optional(),
        legal_name:Joi.string().min(2).max(100).optional(),
        pan:Joi.string().min(10).max(10).optional(),
        gst:Joi.string().min(15).max(15).optional(),
        no:Joi.string().min(2).max(20).optional(),
        type:Joi.string().min(2).max(100).optional(),
        status: Joi.string().optional()
    });

}

export default new BusinessValidation
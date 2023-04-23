import Joi from 'joi'

class BusinessValidation {

    create = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        legal_name: Joi.string().min(2).max(100).required(),
        entity_type: Joi.string().min(2).max(100).required(),
        business_pan: Joi.string().min(2).max(100).required(),
        gst_number: Joi.string().min(2).max(100).required(),
        aadhar_number: Joi.string().min(2).max(100).required(),
        pan_number: Joi.string().min(2).max(100).required(),
        registered_number: Joi.string().min(2).max(100).required()
    });

    update = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        legal_name: Joi.string().min(2).max(100).optional(),
        entity_type: Joi.string().min(2).max(100).optional(),
        business_pan: Joi.string().min(2).max(100).optional(),
        gst_number: Joi.string().min(2).max(100).optional(),
        aadhar_number: Joi.string().min(2).max(100).optional(),
        pan_number: Joi.string().min(2).max(100).optional(),
        registered_number: Joi.string().min(2).max(100).optional()
    });

}

export default new BusinessValidation
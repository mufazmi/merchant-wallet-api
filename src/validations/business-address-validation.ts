import Joi from 'joi'

class BusinessAddressValidation {

    create = Joi.object({
        address: Joi.string().min(2).max(100).required(),
        area: Joi.string().min(2).max(100).required(),
        district: Joi.string().min(2).max(100).required(),
        pin_code: Joi.string().min(2).max(100).required(),
        country_id: Joi.string().min(2).max(100).required(),
        state_id: Joi.string().min(2).max(100).required(),
        city_id: Joi.string().min(2).max(100).required(),
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

export default new BusinessAddressValidation
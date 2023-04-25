import Joi from 'joi'

class BusinessAddressValidation {

    create = Joi.object({
        area: Joi.string().min(2).max(100).required(),
        district: Joi.string().min(2).max(100).required(),
        pin_code: Joi.string().min(2).max(100).required(),
        country_id: Joi.string().uuid().required(),
        state_id: Joi.string().uuid().required(),
        city_id: Joi.string().uuid().required(),
    });

    update = Joi.object({
        area: Joi.string().min(2).max(100).optional(),
        district: Joi.string().min(2).max(100).optional(),
        pin_code: Joi.string().min(2).max(100).optional(),
        country_id: Joi.string().uuid().optional(),
        state_id: Joi.string().uuid().optional(),
        city_id: Joi.string().uuid().optional(),
    });

}

export default new BusinessAddressValidation
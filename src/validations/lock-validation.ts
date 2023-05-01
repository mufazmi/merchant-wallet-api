import Joi from "joi"

class LockValidation {


    create = Joi.object({
        pin: Joi.number().max(9999).required(),
    })

    verify = Joi.object({
        pin: Joi.number().max(9999).required(),
    })

    update = Joi.object({
        pin: Joi.number().max(9999).required(),
        new_pin: Joi.number().max(9999).required(),
    })

    delete = Joi.object({
        pin: Joi.number().max(9999).required()
    })

    unlock = Joi.object({
        device_id : Joi.string().min(10).max(300).required(),
        code: Joi.string().min(4).max(4).required(),
    });

}

export default new LockValidation
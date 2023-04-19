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

}

export default new LockValidation
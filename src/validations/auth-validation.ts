import Joi from 'joi'

class AuthValidation {

    register = Joi.object({
        name:Joi.string().min(3).max(100).required(),
        mobile : Joi.string().min(10).required(),
        password: Joi.string().min(8).max(50).required(),
        device_id:Joi.string().required(),
        coordinates:Joi.string().required().min(10).max(300)
    });

    login = Joi.object({
        mobile : Joi.string().min(10).required(),
        password: Joi.string().min(8).max(50).required()
    });

    verify = Joi.object({
        mobile : Joi.string().min(10).required(),
        otp: Joi.string().min(6).max(6).required(),
        token: Joi.string().optional(),
    });

}

export default new AuthValidation
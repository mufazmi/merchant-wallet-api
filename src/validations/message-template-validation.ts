import Joi from 'joi'

class MessageTemplateValidation {

    create = Joi.object({
        title:Joi.string().min(3).max(100).required(),
        type : Joi.string().min(2).required(),
        template_id: Joi.string().min(2).max(50).required(),
        template:Joi.string().min(10).required(),
        status:Joi.boolean().default(true)
    });

    update = Joi.object({        
        title:Joi.string().min(3).max(100).optional(),
        type : Joi.string().min(2).optional(),
        template_id: Joi.string().min(2).max(50).optional(),
        template:Joi.string().min(10).optional(),
        status:Joi.boolean().optional()
    });

}

export default new MessageTemplateValidation
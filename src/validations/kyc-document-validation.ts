import Joi from 'joi'

class KycDocumentValidation {

    create = Joi.object({
        file: Joi.any().required()
    });

    update = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        code: Joi.string().min(2).max(10).optional(),
        status: Joi.boolean().default(true)
    });

}

export default new KycDocumentValidation
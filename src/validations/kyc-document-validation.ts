import Joi from 'joi'

class KycDocumentValidation {

    create = Joi.object({
        pan_front: Joi.any().required(),
        aadhar_front: Joi.any().required(),
        aadhar_back: Joi.any().required(),
        proof: Joi.any().optional(),
    });

    update = Joi.object({        
        pan_front: Joi.any().optional(),
        aadhar_front: Joi.any().optional(),
        aadhar_back: Joi.any().optional(),
        proof: Joi.any().optional(),
    });

}

export default new KycDocumentValidation
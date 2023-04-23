import Joi from 'joi'

class BusinessValidation {

    create = Joi.object({
<<<<<<< HEAD
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
=======
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
>>>>>>> d1ea2f4da22767d2345a9c032180d01c9bc7ecd7
    });

}

export default new BusinessValidation
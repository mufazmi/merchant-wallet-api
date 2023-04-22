import express from 'express';
import kycDocumentController from '../controllers/kyc-document-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

import multer from 'multer';
import Constants from '../utils/constants';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, Constants.PATH.KYC_IMAGE);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '_' + file.fieldname + '_' + file.originalname);
        }
    }),
    fileFilter: function (req, file, cb) {
        console.log(file.fieldname)
        if (file.fieldname === 'pan_front' || file.fieldname === 'aadhar_front' || file.fieldname === 'aadhar_back' || file.fieldname === 'proof') {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Only image files are allowed!'));
            }
        } else {
            return cb(new Error('Invalid field name!'));
        }
        cb(null, true);
    }
});

router.post('/', upload.fields([
    { name: 'pan_front', maxCount: 1 },
    { name: 'aadhar_front', maxCount: 1 },
    { name: 'aadhar_back', maxCount: 1 },
    { name: 'proof', maxCount: 1 }
]), am(kycDocumentController.create))
router.get('/', am(kycDocumentController.findOne))
router.patch('/', am(kycDocumentController.update))

export default router;
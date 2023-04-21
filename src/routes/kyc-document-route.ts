import express from 'express';
import kycDocumentController from '../controllers/kyc-document-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/', am(kycDocumentController.create))
router.get('/', am(kycDocumentController.findOne))
router.patch('/', am(kycDocumentController.update))

export default router;
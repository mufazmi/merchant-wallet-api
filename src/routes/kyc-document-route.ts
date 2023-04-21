import express from 'express';
import kycDocumentController from '../controllers/kyc-document-controller';
import { upload } from '../handlers/file-hanlder';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/', upload.array('files',4), am(kycDocumentController.create))
router.get('/', am(kycDocumentController.findOne))
router.patch('/', am(kycDocumentController.update))

export default router;
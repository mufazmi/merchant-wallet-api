import express from 'express';
import businessAddressController from '../controllers/business-address-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/', am(businessAddressController.create))
router.get('/', am(businessAddressController.findOne))
router.patch('/', am(businessAddressController.update))

export default router;
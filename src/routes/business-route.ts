import express from 'express';
import businessController from '../controllers/business-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/', am(businessController.create))
router.get('/', am(businessController.findOne))
router.patch('/', am(businessController.update))

export default router;
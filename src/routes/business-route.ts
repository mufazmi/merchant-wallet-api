import express from 'express';
import businessController from '../controllers/business-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(businessController.create))
router.get('/:id',am(businessController.findOne))
router.patch('/:id',am(businessController.update))

export default router;
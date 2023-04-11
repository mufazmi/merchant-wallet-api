import express from 'express';
import countryController from '../controllers/country-controller';
import merchantFundController from '../controllers/merchant-fund-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(merchantFundController.create))
router.get('/',am(merchantFundController.findAll))
router.get('/:id',am(merchantFundController.findOne))
router.patch('/:id',am(merchantFundController.update))
router.delete('/:id',am(merchantFundController.destroy))

export default router;
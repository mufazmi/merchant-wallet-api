import express from 'express';
import countryController from '../controllers/country-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(countryController.create))
router.get('/',am(countryController.findAll))
router.get('/:id',am(countryController.findOne))
router.patch('/:id',am(countryController.update))
router.delete('/:id',am(countryController.destroy))

export default router;
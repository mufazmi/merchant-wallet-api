import express from 'express';
import cityController from '../controllers/city-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(cityController.create))
router.get('/',am(cityController.findAll))
router.get('/:id',am(cityController.findOne))
router.patch('/:id',am(cityController.update))
router.delete('/:id',am(cityController.destroy))

export default router;
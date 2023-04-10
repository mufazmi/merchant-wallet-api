import express from 'express';
import stateController from '../controllers/state-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(stateController.create))
router.get('/',am(stateController.findAll))
router.get('/:id',am(stateController.findOne))
router.patch('/:id',am(stateController.update))
router.delete('/:id',am(stateController.destroy))

export default router;
import express from 'express';
import remitterController from '../controllers/remitter-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(remitterController.create))
router.get('/',am(remitterController.findAll))
router.get('/:id',am(remitterController.findOne))
router.get('/search',am(remitterController.searchOne))
router.patch('/:id',am(remitterController.update))
router.delete('/:id',am(remitterController.destroy))

export default router;
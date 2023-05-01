import express from 'express';
import lockController from '../controllers/lock-controller';

const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/', am(lockController.setLock))
router.post('/verify', am(lockController.verifyLock))
router.post('/unlock', am(lockController.unlock))
router.patch('/', am(lockController.updateLock))
router.delete('/', am(lockController.deleteLock))


export default router;
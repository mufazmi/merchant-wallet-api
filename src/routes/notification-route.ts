import express from 'express';
import notificationController from '../controllers/notification-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

// router.post('/',am(notificationController.create))
// router.delete('/:id',am(notificationController.destroy))

export default router;
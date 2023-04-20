import express from 'express';
import merchantController from '../controllers/merchant-controller';

const am = require('../middlewares/async-middleware');

const router = express.Router();

router.get('/profile',am(merchantController.profile))

export default router;
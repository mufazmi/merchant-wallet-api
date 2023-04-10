import express from 'express';
import merchantController from '../controllers/auth-controller';

const am = require('../middlewares/async-middleware');

const router = express.Router();

// router.post('/register',am(merchantController.register))
router.post('/login',am(merchantController.login))
router.post('/verify',am(merchantController.verify))


export default router;
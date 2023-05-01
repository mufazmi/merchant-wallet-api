import express from 'express';
import autController from '../controllers/auth-controller';
import auth from '../middlewares/auth-middleware';

const am = require('../middlewares/async-middleware');

const router = express.Router();

// router.post('/register',am(autController.register))
router.post('/login',am(autController.login))
router.post('/verify',am(autController.verify))


export default router;
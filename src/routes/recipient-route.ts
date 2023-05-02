import express from 'express';
import recipientController from '../controllers/recipient-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(recipientController.create))
router.get('/',am(recipientController.findAll))

export default router;
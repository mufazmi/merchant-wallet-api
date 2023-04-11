import express from 'express';
import merchantWalletTransaction from '../controllers/merchant-wallet-transaction';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.get('/',am(merchantWalletTransaction.findAll))
router.get('/:id',am(merchantWalletTransaction.findOne))

export default router;
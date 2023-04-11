import express from 'express';
const router = express.Router();


import merchantAuthRoute from './merchant'
import messageTemplateRoute from '../routes/message-template-route';
import merchantFundRoute from '../routes/merchant-fund-route';
import merchantWalletTransactionRoute from '../routes/merchant-wallet-transaction-route';

import countryRoute from '../routes/country-route';
import stateRoute from '../routes/state-route';
import cityRoute from '../routes/city-route';
import notificationRoute from '../routes/notification-route';
import auth from '../middlewares/auth-middleware';


router.use('/auth', merchantAuthRoute);
router.use('/fund', merchantFundRoute);
router.use('/transaction', merchantWalletTransactionRoute);
router.use('/message/template', messageTemplateRoute);
router.use('/country', countryRoute);
// router.use('/state', stateRoute);
// router.use('/city', cityRoute);
// router.use('/notification', notificationRoute);



export default router
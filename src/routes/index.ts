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
import businessRoute from './business-route';


router.use('/auth',auth, merchantAuthRoute);
router.use('/fund', auth,merchantFundRoute);
router.use('/transaction', auth,merchantWalletTransactionRoute);
router.use('/message/template',auth, messageTemplateRoute);
router.use('/country',auth, countryRoute);
router.use('/business',auth, businessRoute);
// router.use('/state', stateRoute);
// router.use('/city', cityRoute);
// router.use('/notification', notificationRoute);



export default router
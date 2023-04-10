import express from 'express';
const router = express.Router();


import adminAuthRoute from './admin'
import merchantAuthRoute from './merchant'
import messageTemplateRoute from '../routes/message-template-route';
import adminWalletTransactionRoute from '../routes/admin-wallet-transaction-route';

import countryRoute from '../routes/country-route';
import stateRoute from '../routes/state-route';
import cityRoute from '../routes/city-route';
import notificationRoute from '../routes/notification-route';
import auth from '../middlewares/auth-middleware';


router.use('/auth/admin', adminAuthRoute);
router.use('/auth/merchant', merchantAuthRoute);
router.use('/message/template', messageTemplateRoute);
router.use('/country', countryRoute);
router.use('/admin/wallet/transaction',auth,adminWalletTransactionRoute)
// router.use('/state', stateRoute);
// router.use('/city', cityRoute);
// router.use('/notification', notificationRoute);



export default router
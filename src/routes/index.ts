import express from 'express';
const router = express.Router();


import merchantAuthRoute from './auth-route'
import messageTemplateRoute from '../routes/message-template-route';
import merchantFundRoute from '../routes/merchant-fund-route';
import merchantWalletTransactionRoute from '../routes/merchant-wallet-transaction-route';

import countryRoute from '../routes/country-route';
import stateRoute from '../routes/state-route';
import cityRoute from '../routes/city-route';
import notificationRoute from '../routes/notification-route';
import auth from '../middlewares/auth-middleware';
import businessRoute from './business-route';
import lockRoute from './lock-route';
import recipientRoute from './recipient-route';
import remitterRoute from './remitter-route';
import businessAddressRoute from './business-address-route';
import kycDocumentRoute from './kyc-document-route';


router.use('/auth', merchantAuthRoute);
router.use('/fund', auth,merchantFundRoute);
router.use('/transaction', auth,merchantWalletTransactionRoute);
router.use('/message/template',auth, messageTemplateRoute);
router.use('/country',auth, countryRoute);
router.use('/state', stateRoute);
router.use('/city', cityRoute);
router.use('/lock',auth, lockRoute);
router.use('/recipient',auth, recipientRoute);
router.use('/business',auth, businessRoute);
router.use('/remitter',auth, remitterRoute);
router.use('/business/address',auth, businessAddressRoute);
router.use('/kyc/document',auth, kycDocumentRoute);
// router.use('/notification', notificationRoute);


export default router
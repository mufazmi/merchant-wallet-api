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
<<<<<<< HEAD
import businessRoute from './business-route';
import kycDocumentRoute from './kyc-document-route';


router.use('/auth', merchantAuthRoute);
router.use('/fund', auth,merchantFundRoute);
router.use('/transaction', auth,merchantWalletTransactionRoute);
router.use('/message/template',auth, messageTemplateRoute);
router.use('/country',auth, countryRoute);
router.use('/business',auth, businessRoute);
router.use('/kyc/document',auth, kycDocumentRoute);
=======
import businessRoute from '../routes/business-route';
import merchantRoute from '../routes/merchant-route'


router.use('/auth', merchantAuthRoute);
router.use('/fund', merchantFundRoute);
router.use('/transaction', auth, merchantWalletTransactionRoute);
router.use('/message/template', messageTemplateRoute);
router.use('/country', countryRoute);
router.use('/business', auth, businessRoute);

router.use('/merchant', auth, merchantRoute);
>>>>>>> d1ea2f4da22767d2345a9c032180d01c9bc7ecd7
// router.use('/state', stateRoute);
// router.use('/city', cityRoute);
// router.use('/notification', notificationRoute);



export default router
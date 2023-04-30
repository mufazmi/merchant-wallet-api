
class Constants {

   static ADMIN = {
      ROLE_DIRECTOR: 'Director',
      ROLE_TECHNICAL: 'Technical',
      ROLE_OPERATOR: 'Operator'
   }

   static CODE = {
      ONE: '01',
      TWO: '02',
      THREE: '03',
      FOUR: '04',
      FIVE: '05',
      SIX: '06'
   }

   static ENTITY = {
      TYPE_TEST: 'test'
   }

   // static ADKMIN = {
   //    ROLE_DIRECTOR: 'Director',
   //    ROLE_TECHNICAL: 'Technical',
   //    ROLE_OPERATOR: 'Operator'
   // }

   static PATH = {
      KYC_IMAGE: './storage/uploads/kyc/images/'
   }

   static USER = {
      TYPE_ADMIN: 'admin',
      TYPE_MERCHANT: 'merchant'
   }

   static SERVER_MESSAGE = {
      NOT_FOUND: "Oops..! It's 404",
      FORBIDDEN: "Oops..! It's 403",
      BAD_REQUEST: "Bad Request",
      SERVER_ERROR: "Oops..! Something went wrong"
   }

   static STATUS_CODE = {
      SUCCESS: 200,
      NOT_FOUND: 404,
      FORBIDDEN: 403,
      BAD_REQUEST: 400,
      SERVER_ERROR: 500
   }

   static OTP_TYPE = {
      MOBILE_VERIFICATION: 'mobile_verification',
      FORGOT_PASSWORD: 'forgot_password'
   }

   static STATUS = {
      ENABLE: 'enable',
      DISABLE: 'disable',
      FREEZ: 'freez',
      APPROVED: 'approved',
      PENDING: 'pending',
      REJECTED: 'rejected',
      SUBMITTED: 'submitted',
      ACTIVE: 'active',
      SUSPENDED: 'suspended',
      BLOCKED: 'blocked'
   }



   static LOCK = {
      NOTHING: 'no_lock',
      PASSCODE: 'password_lock',
      DEVICE: 'device_lock'
   }


   static WALLET = {
      TYPE_POOL: 'pool',
      TYPE_WALLET: 'wallet',
      WALLET_NOT_FOUND: 'No Wallet Found'
   }


   static TRANSACTION = {
      CREATION_FAILED: 'Failed To Create This Transaction',
      TYPE_DEBIT: 'debit',
      TYPE_CREDIT: 'credit',
      TYPE_DEPOSIT: 'deposit',
      TYPE_PURCHASE: 'purchase',
      TYPE_NOT_CREDIT: 'Not A Credit Transaction',
      TYPE_NOT_DEBIT: 'Not A Debit Transaction',
      STATUS_SUCCESS: 'success',
      STATUS_FAILED: 'failed',

   }
}

export default Constants
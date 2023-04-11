"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
}
Constants.ADMIN = {
    ROLE_DIRECTOR: 'Director',
    ROLE_TECHNICAL: 'Technical',
    ROLE_OPERATOR: 'Operator'
};
Constants.USER = {
    TYPE_ADMIN: 'admin',
    TYPE_MERCHANT: 'merchant'
};
Constants.SERVER_MESSAGE = {
    NOT_FOUND: "Oops..! It's 404",
    FORBIDDEN: "Oops..! It's 403",
    BAD_REQUEST: "Bad Request",
    SERVER_ERROR: "Oops..! Something went wrong"
};
Constants.STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500
};
Constants.OTP_TYPE = {
    MOBILE_VERIFICATION: 'mobile_verification',
    FORGOT_PASSWORD: 'forgot_password'
};
Constants.STATUS = {
    ENABLE: 'enable',
    DISABLE: 'disable',
    FREEZ: 'freez',
    APPROVED: 'approved',
    PENDING: 'pending',
    REJECTED: 'rejected',
};
Constants.TYPE = {
    KYC_PENDING: 'kyc_pending',
    KYC_SUBMITTED: 'kyc_submitted',
    ACTIVE: 'active',
    SUSPENDED: 'suspended',
};
Constants.LOCK = {
    NOTHING: 'no_lock',
    PASSCODE: 'password_lock',
    DEVICE: 'device_lock'
};
Constants.WALLET = {
    TYPE_POOL: 'pool',
    TYPE_WALLET: 'wallet',
    WALLET_NOT_FOUND: 'No Wallet Found'
};
Constants.TRANSACTION = {
    CREATION_FAILED: 'Failed To Create This Transaction',
    TYPE_DEBIT: 'debit',
    TYPE_CREDIT: 'credit',
    TYPE_DEPOSIT: 'deposit',
    TYPE_PURCHASE: 'purchase',
    TYPE_NOT_CREDIT: 'Not A Credit Transaction',
    TYPE_NOT_DEBIT: 'Not A Debit Transaction',
    STATUS_SUCCESS: 'success',
    STATUS_FAILED: 'failed',
};
exports.default = Constants;

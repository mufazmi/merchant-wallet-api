import Admin from "../../models/admin-model";
import CountryModel from "../../models/country-model";
import Merchant from "../../models/merchant-model";

const insert = async () => {

    // Add Admin
    try {
        const admin = await Admin.create({
            name: 'Umair Farooqui',
            mobile: '9867503256',
            email: 'info.umairfarooqui@gmail.com',
            password: 'password',
            role: 'Director',
            accountId: '234567',
            coordinates: '4567,5678',
            isEmailVerified: false,
            isPhoneVerified: false
        });
        console.log(admin.toJSON()); // print the created admin object
    } catch (error) {
        console.error(error);
    }

    // Add Merchant
    try {
        const merchant = await Merchant.create({
            name: 'Umair Farooqui',
            mobile: '9867503256',
            email: 'info.umairfarooqui@gmail.com',
            password: 'password',
            role: 'Director',
            accountId: '234567',
            coordinates: '4567,5678',
            isEmailVerified: false,
            isPhoneVerified: false,
            status: 'kyc_pending',
            lockType: 'no_lock',
            passCode: '123',
            device_id: '5667876876',
            is_blocked:false,
        });
        console.log(merchant.toJSON()); // print the created merchant object
    } catch (error) {
        console.error(error);
    }

    // Add Country
    try {
        const country = await CountryModel.create({
            name: 'INDIA',
            code: 'IN',
            status: true

        });
        console.log(country.toJSON()); // print the created country object
    } catch (error) {
        console.error(error);
    }
}

export default insert;

import crypto from 'crypto';
import Otp from '../models/otp-model';
import moment from 'moment';
import smsService from './sms-service';

class OtpService {

    generateOtp = (): string => crypto.randomInt(100000, 999999).toString();

    createOtp = async (data: any) => await Otp.create(data);

    storeOtp = async (data: any) => {
        data.expired_at =  moment().add(5, 'minutes').toDate();
        await this.destroyOtp({ merchant_id: data.merchant_id });
        return await Otp.create(data)
    };

    findOtp = async (filter: any) => await Otp.findOne({ where: filter });

    destroyOtp = async (filter: any) => await Otp.destroy({ where: filter });

    verifyOtp = async (filter: any) => {
        const otp = await Otp.findOne({ where: filter })
        // if otp expired
        if (otp)
            await this.destroyOtp(filter);
        return otp ? otp : false;
    };

    sendOtp = async (data: {otp:string,mobile:string}) => {
        return await smsService.sendOtp({otp:data.otp,mobile:data.mobile});
    };

}

export default new OtpService
import crypto from 'crypto';
import { InferCreationAttributes } from 'sequelize';
import Otp from '../models/otp-model';

class OtpService {

    generateOtp = (): string => crypto.randomInt(100000, 999999).toString();

    createOtp = async (data:any) => await Otp.create(data);
    
    findOtp = async (filter:any) => await Otp.findOne({where:filter});

    destroyOtp = async (filter:any) => await Otp.destroy({where:filter});
    
    verifyOtp = async (filter:any) => {
        const otp = await Otp.findOne({where:filter})
        // if otp expired
        if(otp)
            await this.destroyOtp(filter);
        return otp ? otp : false;
    };

}
export default new OtpService
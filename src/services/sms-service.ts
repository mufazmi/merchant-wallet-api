import axios from "axios";

interface iSendSms {
    mobile: string,
    text: string
}

interface iSendOtp {
    mobile: string,
    otp: string
}

class SmsService {

    sendOtp = async (data: iSendOtp) => {
        const text = `SocialCodia never calls you asking for OTP. Don't share your OTP with anyone. Your OTP is ${data.otp} Valid for 3 min, ID:78799gdg`;
        const payload: iSendSms = {
            mobile: data.mobile,
            text
        }
        return await this.sendSms(payload);
    }

    /**
     * TEMPRORY DEFINING THE FUNCTION LIKE THIS
     * WE CAN EASILY UTILISE THIS FUNCTION
     */

    sendSms = async (data: iSendSms) => {
        try {
            const apiKey = 'test'
            const domain = 'ab.com'
            const url = `${domain}/api/mt/SendSMS?apikey=${apiKey}&senderid=test&channel=test&DCS=0&flashs ms=0&number=${data.mobile}&text=${data.text}&route=15&DLTTemplateId=1207161596306313471`;
            const res = await axios.get(url);
            console.log(res);
        }
        catch (e: any) {
            console.log(e)
        }
    }

}



export default new SmsService;
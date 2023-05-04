import axios, { AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import qs from 'qs';

class RemitterHttp {

  secretKey: string;
  key: string;
  hash: string;
  header: { [key: string]: string };

  constructor() {
    this.secretKey = new Date().getTime().toString();
    this.key = 'b977803d-0218-456e-a676-79de8c42f4b6';
    this.hash = crypto.createHmac('sha256', this.secretKey).update(this.key).digest('base64');
    this.header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
      developer_key: '0d13fefbdd3d507c3a1485e6694d4197',
    }
  }

  resetOtp = async (mobile: string): Promise<any> => {
    const data = qs.stringify({
      initiator_id: '9433461804',
      user_code: '31739001',
      pipe: '9',
    })
    const remitterResponse: AxiosRequestConfig = {
      method: 'POST',
      url: `https://api.eko.in:25002/ekoicici/v2/customers/mobile_number:${mobile}/otp`,
      headers: this.header,
      data: data,
    };

    try {
      const response = await axios.request(remitterResponse);
      console.log(response);
      if (response.data.response_type_id === '321') {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }

  }

}

export default RemitterHttp;

import axios, { AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import qs from 'qs';

interface RemitterResponse {
  data?: any;
  error?: any;
}

class RemitterHttp {
  private readonly headers: AxiosRequestConfig['headers'];

  constructor() {
    const secretKey = new Date().getTime().toString();
    const key = 'b977803d-0218-456e-a676-79de8c42f4b6';
    const hash = crypto.createHmac('sha256', secretKey).update(key).digest('base64');
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json',
      'developer_key': '0d13fefbdd3d507c3a1485e6694d4197',
      'hash': hash,
    };
  }


  public async getRemitterResendOtp(mobile: string): Promise<RemitterResponse | null> {
    try {
      const url = `https://api.eko.in:25002/ekoicici/v2/customers/mobile_number:${mobile}/otp`;
      const data = qs.stringify({
        initiator_id: '9433461804',
        user_code: '31739001',
        pipe: '9',
      });
      const response = await axios.post(url, data, { headers: this.headers });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  
}

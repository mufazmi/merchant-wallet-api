import axios, { AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import { connected } from 'process';
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


  resendOtp = async (mobile: string): Promise<RemitterResponse | null> => {
    try {
      const url = `https://api.eko.in:25002/ekoicici/v2/customers/mobile_number:${mobile}/otp`;
      const data = qs.stringify({
        initiator_id: '9433461804',
        user_code: '31739001',
        pipe: '9',
      });
      const response = await axios.post(url, data, { headers: this.headers });
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  }

  getRemitters = async (mobile: string): Promise<RemitterResponse> => {
    try {
      const url = `https://api.eko.in:25002/ekoicici/v2/customers/mobile_number:${mobile}`;
      const data = qs.stringify({
        initiator_id: '9433461804',
        user_code: '31739001',
      });
      const response = await axios.get(url, { headers: this.headers, params: data });
      if (response.data.response_type_id != '-1') {
        return {
          data: response.data,
        };
      } else {
        return {
          error: response.data,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  }

  verifyRemitter = async (otp: number, otp_ref_id: string, mobile: string) => {
    try {
      const remitterResponse = {
        method: 'PUT',
        url: `https://api.eko.in:25002/ekoicici/v2/customers/verification/otp:${otp}`,
        headers: this.headers,
        data: qs.stringify({
          initiator_id: '9433461804',
          id_type: 'mobile_number',
          id: mobile,
          otp_ref_id: otp_ref_id,
          user_code: '31739001',
          pipe: '9'
        })
      };

      let response = await axios.request(remitterResponse)
      if (response.data.response_type_id == '23')
        return {
          data: response.data
        }
      else
        return {
          error: response.data
        }

    } catch (error) {
      console.log(error)
      return {
        data: error
      }
    }
  }

}

export default RemitterHttp

import axios, { AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import qs from 'qs';

interface RemitterResponse {
  statusCode: number;
  status: string;
  data?: any;
  error?: any;
}

const getRemitterResendOtp = async (mobile: string): Promise<RemitterResponse> => {
  try {
    const secretKey = new Date().getTime().toString();
    const key = 'b977803d-0218-456e-a676-79de8c42f4b6';
    const hash = crypto.createHmac('sha256', secretKey).update(key).digest('base64');
    const remitterResponse: AxiosRequestConfig = {
      method: 'POST',
      url: `https://api.eko.in:25002/ekoicici/v2/customers/mobile_number:${mobile}/otp`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
        developer_key: '0d13fefbdd3d507c3a1485e6694d4197',
        // 'secret-key': hash,
        // 'secret-key-timestamp': secretKey,
      },
      data: qs.stringify({
        initiator_id: '9433461804',
        user_code: '31739001',
        pipe: '9',
      }),
    };

    const response = await axios.request(remitterResponse);
    console.log(response);
    if (response.data.response_type_id == '321') {
      return {
        statusCode: 200,
        status: 'Success',
        data: response.data,
      };
    } else {
      return {
        statusCode: 404,
        status: 'Error',
        error: response.data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 404,
      status: 'Error',
      data: error,
    };
  }
};

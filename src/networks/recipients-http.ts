import axios from 'axios';
import crypto from 'crypto';
import qs from 'qs';

interface RemitterResponse {
  data?: any;
  error?: any;
}

class RecipientHttp {
  private readonly headers: any;

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

  async getRecipients(mobile: string): Promise<RemitterResponse> {
    try {
      const remitterResponse = await axios.get(`https://api.eko.in:25002/ekoicici/v2/customers/mobile_number:${mobile}/recipients`, {
        headers: this.headers,
        params: {
          initiator_id: '9433461804',
          user_code: '31739001'
        }
      });

      if (remitterResponse.data.response_type_id == '23')
        return {
          data: remitterResponse.data
        }
      else if (remitterResponse.data.response_type_id == '22')
        return {
          error: remitterResponse.data
        }
      else
        return {
          error: remitterResponse.data
        }
    } catch (error) {
      return {
        error: error
      }
    }
  }

  async addRecipient(mobile: string, recipient_mobile: string, recipient_name: string, account_number: string, ifsc: string): Promise<RemitterResponse> {
    try {
      const panResponse = await axios.post(`https://api.eko.in:25002/ekoicici/v2/customers/mobile_number:${mobile}/recipients/acc_ifsc:${account_number}_${ifsc}`,
        qs.stringify({
          recipient_mobile: recipient_mobile,
          recipient_type: '3',
          recipient_name: recipient_name,
          user_code: '31739001'
        }), {
        headers: this.headers
      });

      return {
        data: panResponse.data
      }
    } catch (error) {
      console.log(error)
      return {
        error: error
      }
    }
  }
}

export default RecipientHttp;

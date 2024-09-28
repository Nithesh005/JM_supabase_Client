import axios from 'axios';
import { DOMAIN } from '../Config/Api';

const apiRequest = async (endpoint='test',  data = null ,method = 'POST') => {
  try {
    const response = await axios({
      url: `${DOMAIN}${endpoint}`,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export default apiRequest;
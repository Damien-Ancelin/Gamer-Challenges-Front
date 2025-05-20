import axios from 'axios';
import { toast } from 'react-toastify';
import errorHandlerAxios from './errorHandler';
const API_URL = import.meta.env.VITE_API_URL;
// Check if the API_URL is defined
if (!API_URL) {
  throw new Error('VITE_API_URL is not defined in the environment variables');
}

// Create an axios instance with the base URL and credentials
const gamerChallengesApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const api = {
  async authLogin(email: string, password: string) {
    try {
      const response = await gamerChallengesApi.post('api/auth/login', {
        email,
        password,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      errorHandlerAxios(error);
      throw error;
    }
  },
};

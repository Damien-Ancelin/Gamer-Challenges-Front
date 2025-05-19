import axios from 'axios';
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

// ! Test
export async function getTestGamer() {
  try {
    const response = await gamerChallengesApi.get('/test');
    return response.data;
  } catch (error) {
    console.error('Error fetching test gamer:', error);
    throw error;
  }
}

export default gamerChallengesApi;

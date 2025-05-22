import { errorHandler } from './errorHandler';

const API_URL = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.VITE_ENV === 'production';

// Check if the API_URL is defined
if (!API_URL) {
  throw new Error('VITE_API_URL is not defined in the environment variables');
}

export const api = {
  // * Login
  async authLogin(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const status = response.status;
      const errorData = await response.json();
      const errorMessage = errorHandler({ status, errorData });

      if (!isProduction) {
        console.error('Error:', errorMessage);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  },

  // * Register
  async authRegister(
    lastname: string,
    firstname: string,
    email: string,
    username: string,
    password: string,
  ) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ lastname, firstname, email, username, password }),
    });

    if (!response.ok) {
      const status = response.status;
      const errorData = await response.json();
      const errorMessage = errorHandler({ status, errorData });

      if (!isProduction) {
        console.error('Error:', errorMessage);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  },

  // * Logout
  async authLogout() {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const status = response.status;
      const errorData = await response.json();
      const errorMessage = errorHandler({ status, errorData });

      if (!isProduction) {
        console.error('Error:', errorMessage);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  },

  // * Refresh Token
  async authRefreshToken() {
    const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const status = response.status;
      const errorData = await response.json();
      const errorMessage = errorHandler({ status, errorData });

      if (!isProduction) {
        console.error('Error:', errorMessage);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  },
};

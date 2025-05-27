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

  // * Get User Data
  async getUserData() {
    const response = await fetch(`${API_URL}/api/account/user`, {
      method: 'GET',
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

  // * Update User Data
  async updateUserData(formData: FormData) {
    const response = await fetch(`${API_URL}/api/account/update`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData,
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

  // * Delete User Account
  async deleteUserAccount() {
    const response = await fetch(`${API_URL}/api/account/delete`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const status = response.status;
      const errorMessage = errorHandler({
        status,
        errorData: { sucess: true, message: 'Account deleted successfully' },
      });

      if (!isProduction) {
        console.error('Error:', errorMessage);
      }

      throw new Error(errorMessage);
    }

    const data = {
      success: true,
      message: 'Votre compte à été supprimé avec succès.',
    };

    if (!isProduction) {
      console.log('Success: Compte utilisateur supprimé avec succès');
    }

    return data;
  },

  // * Get Create Challenge Data
  async getCreateChallengeData() {
    const response = await fetch(`${API_URL}/api/challenges/create`, {
      method: 'GET',
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

  // * Post Create Challenge
  async createChallenge(formData: FormData) {
    const response = await fetch(`${API_URL}/api/challenges/create`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
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

  // * Get Challenges
  async getChallenges(
    limit: number,
    currentPage: number,
    order: string,
    direction: string,
  ) {
    const response = await fetch(
      `${API_URL}/api/challenges?limit=${limit}&page=${currentPage}&order=${order}&direction=${direction}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

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

  // * Get Challenge reviews by challenge_id
  async getChallengeReviewsById(id: number) {
    const response = await fetch(`${API_URL}/api/challenges/${id}/review`, {
      method: 'GET',
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

  // * Get Participation Count by Challenge ID
  async getParticipationCountByChallengeId(challenge_id: number) {
    const response = await fetch(
      `${API_URL}/api/participations/${challenge_id}/review`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

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

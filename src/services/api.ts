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
        errorData: { sucess: false, message: 'Suppression du compte échouée' },
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
      console.error('Success: Compte utilisateur supprimé avec succès');
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
      `${API_URL}/api/challenges?limit=${limit}&currentPage=${currentPage}&order=${order}&direction=${direction}`,
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

  // * Get Challenge by ID
  async getChallengeById(id: string) {
    const response = await fetch(`${API_URL}/api/challenges/${id}`, {
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

  // * Post Challenge Owner by ID
  async getChallengeOwner(challenge_id: number) {
    const response = await fetch(`${API_URL}/api/challenges/owner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ challenge_id }),
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

  // * Review Challenge
  async voteChallenge(challenge_id: number, rating: number) {
    const response = await fetch(`${API_URL}/api/challenge-reviews/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ challenge_id, rating }),
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

  // * Check User Challenge Review
  async checkUserIsVoteChallenge(challenge_id: number) {
    const response = await fetch(
      `${API_URL}/api/challenge-reviews/check/user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ challenge_id }),
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

  // * Get Participations
  async getParticipations(
    limit: number,
    currentPage: number,
    order: string,
    direction: string,
  ) {
    const response = await fetch(
      `${API_URL}/api/participations?limit=${limit}&currentPage=${currentPage}&order=${order}&direction=${direction}`,
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

  // * Get Popular Challenges
  async getPopularChallenges(limit: number, currentPage: number) {
    const response = await fetch(
      `${API_URL}/api/participations/popular?limit=${limit}&currentPage=${currentPage}`,
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

  // * Create User Participation
  async createUserParticipation(challenge_id: number) {
    const response = await fetch(`${API_URL}/api/participations/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ challenge_id }),
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

  // * Delete User Participation
  async deleteUserParticipation(challenge_id: number) {
    const response = await fetch(`${API_URL}/api/participations/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ challenge_id }),
    });

    if (!response.ok) {
      const status = response.status;
      const errorMessage = errorHandler({
        status,
        errorData: {
          sucess: false,
          message: 'Suppression de la participation échouée',
        },
      });

      if (!isProduction) {
        console.error('Error:', errorMessage);
      }

      throw new Error(errorMessage);
    }

    const data = {
      success: true,
      message: 'Votre participation à été supprimé avec succès.',
    };

    if (!isProduction) {
      console.error('Success: Participation utilisateur supprimé avec succès');
    }

    return data;
  },

  // * Check User Participation
  async checkUserParticipation(challenge_id: number) {
    const response = await fetch(`${API_URL}/api/participations/check/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ challenge_id }),
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

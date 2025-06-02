import { errorHandler } from './errorHandler';

const API_URL = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.VITE_ENV === 'production';

// Check if the API_URL is defined
if (!API_URL) {
  throw new Error('VITE_API_URL is not defined in the environment variables');
}

export const api = {
  // ? 1 - Authentication
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

  // ? 2 - User Account
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

  // ? 3 - Challenges
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

  // * Patch Update Challenge
  async updateChallenge(
    id: number,
    formData: FormData,
  ): Promise<{ success: string; message: string; challengeId: number }> {
    const response = await fetch(`${API_URL}/api/challenges/${id}/update`, {
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

  // * Delete Challenge
  async deleteChallenge(id: number) {
    const response = await fetch(`${API_URL}/api/challenges/delete`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      const status = response.status;
      const errorMessage = errorHandler({
        status,
        errorData: {
          sucess: false,
          message: 'Suppression du challenge échoué',
        },
      });

      if (!isProduction) {
        console.error('Error:', errorMessage);
      }

      throw new Error(errorMessage);
    }

    const data = {
      success: true,
      message: 'Votre challenge à été supprimé avec succès.',
    };

    return data;
  },

  // * POST - Get User Challenges
  async getUserChallenges(
    limit: number,
    currentPage: number,
    order: string,
    direction: string,
  ) {
    const response = await fetch(
      `${API_URL}/api/challenges/user?limit=${limit}&currentPage=${currentPage}&order=${order}&direction=${direction}`,
      {
        method: 'POST',
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

  // ? 4 - Challenge Reviews
  // * Get Challenge reviews by challenge_id
  async getChallengeReviewsById(challenge_id: number) {
    const response = await fetch(
      `${API_URL}/api/challenge-reviews/challenge/${challenge_id}/review`,
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

  // * Challenge Review
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

  // * Check User has alreadyt voted Challenge Review
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

  // ? 5 - Participation Reviews
  // * Get Participation reviews by participation_id
  async getParticipationReviewsById(participation_id: number) {
    const response = await fetch(
      `${API_URL}/api/participation-reviews/participation/${participation_id}/review`,
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

  // * Participation Review
  async voteParticipation(participation_id: number, rating: number) {
    const response = await fetch(
      `${API_URL}/api/participation-reviews/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ participation_id, rating }),
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

  // * Check User has already voted Participation Review
  async checkUserIsVoteParticipation(participation_id: number) {
    const response = await fetch(
      `${API_URL}/api/participation-reviews/check/user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ participation_id }),
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

  // ? 6 - Participations
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

  // * Get Leaderboard Participation
  async getLeaderboardParticipations() {
    const response = await fetch(`${API_URL}/api/participations/leaderboard`, {
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

  // * Get User Participations
  async getUserParticipations(
    limit: number,
    currentPage: number,
    order: string,
    direction: string,
  ) {
    const response = await fetch(
      `${API_URL}/api/participations/user?limit=${limit}&currentPage=${currentPage}&order=${order}&direction=${direction}`,
      {
        method: 'POST',
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

  // * Get Participation by ID
  async getParticipationById(id: string) {
    const response = await fetch(`${API_URL}/api/participations/${id}`, {
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
      `${API_URL}/api/participations/challenge/${challenge_id}/count`,
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

  // * Get Participation by Challenge ID
  async getChallengeParticipations(
    challenge_id: number,
    limit: number,
    currentPage: number,
    order: string,
    direction: string,
  ) {
    const response = await fetch(
      `${API_URL}/api/participations/challenge/${challenge_id}?limit=${limit}&currentPage=${currentPage}&order=${order}&direction=${direction}`,
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

  // * Get Participation Owner
  async getParticipationOwner(participation_id: number) {
    const response = await fetch(`${API_URL}/api/participations/owner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ participation_id }),
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

  // * Update User Participation
  async updateUserParticipation(id: number, videoLink: string) {
    const response = await fetch(`${API_URL}/api/participations/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id, videoLink }),
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

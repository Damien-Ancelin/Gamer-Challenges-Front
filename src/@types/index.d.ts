export interface User {
  lastname: string;
  firstname: string;
  email: string;
  avatar?: string | File;
  username: string;
}

export interface Participation {
  id: number;
  videoLink: string;
  isValidated: boolean;
  userId: number;
  challengeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Challenge {
  id: number;
  name: string;
  description: string;
  rules: string;
  isOpen: boolean;
  challengeImage: string | File;
  userId: string;
  gameId: string;
  categoryId: string;
  levelId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  description: string;
  gameImage: string | File;
  developer: string;
  publisher: string;
  releaseDate: string;
  genre: string;
  pegi: string;
}

export interface Level {
  id: number;
  name: string;
  levelColor: string;
}

export interface ChallengeReview {
  ratingCounts: number;
  averageRating: number;
}

export interface ParticipationReview {
  participationCounts: number;
}

// Extended interfaces for cards used in the application
export interface ChallengeCard extends Challenge {
  category: Category;
  game: Game;
  level: Level;
}

export interface ParticipationCard extends Participation {
  challenge: ChallengeCard;
  user: {
    username: string;
  };
}

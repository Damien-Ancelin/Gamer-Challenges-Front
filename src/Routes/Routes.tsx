import type { RouteObject } from 'react-router';
import { accountRoutes } from './AccountRoutes';
import { authRoutes } from './AuthRoutes';
import { challengeRoutes } from './ChallengeRoutes';
import { gameRoutes } from './GameRoutes';
import { homeRoutes } from './HomeRoutes';
import { participationRoutes } from './ParticipationRoutes';

export const routes: RouteObject[] = [
  ...homeRoutes,
  ...challengeRoutes,
  ...gameRoutes,
  ...authRoutes,
  ...accountRoutes,
  ...participationRoutes,
];

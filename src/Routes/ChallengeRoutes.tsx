import type { RouteObject } from 'react-router';
import ChallengesDetails from '../pages/ChallengeDetails/ChallengeDetails';
import ChallengeParticipationsPage from '../pages/ChallengeDetails/ChallengeParticipationsPage';
import ChallengesPage from '../pages/ChallengesPage';

export const challengeRoutes: RouteObject[] = [
  {
    path: 'challenges',
    children: [
      { index: true, element: <ChallengesPage /> },
      {
        path: ':id',
        children: [
          { index: true, element: <ChallengesDetails /> },
          {
            path: 'participations',
            element: <ChallengeParticipationsPage />,
          },
          {
            path: 'participer',
            element: <h1>Déclenche la participation sur l'API</h1>,
          },
        ],
      },
    ],
  },
];

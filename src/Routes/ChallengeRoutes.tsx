import type { RouteObject } from 'react-router';
import ChallengesDetailsPage from '../pages/ChallengeDetailsPage';
import ChallengeParticipationsPage from '../pages/ChallengeParticipationsPage';
import ChallengeUserParticipationPage from '../pages/ChallengeUserParticipationPage';
import ChallengesPage from '../pages/ChallengesPage';

export const challengeRoutes: RouteObject[] = [
  {
    path: 'challenges',
    children: [
      { index: true, element: <ChallengesPage /> },
      {
        path: ':challengeId',
        children: [
          { index: true, element: <ChallengesDetailsPage /> },
          {
            path: 'participations',
            children: [
              { index: true, element: <ChallengeParticipationsPage /> },
              { path: ':id', element: <ChallengeUserParticipationPage /> },
            ],
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

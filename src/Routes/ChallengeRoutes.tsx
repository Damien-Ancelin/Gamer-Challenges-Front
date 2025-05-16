import type { RouteObject } from 'react-router';
import ChallengeParticipationsPage from '../components/ChallengeDetailsPage/ChallengeParticipationsPage';
import ChallengesDetailsPage from '../pages/ChallengeDetailsPage';
import ChallengesPage from '../pages/ChallengesPage';

export const challengeRoutes: RouteObject[] = [
  {
    path: 'challenges',
    children: [
      { index: true, element: <ChallengesPage /> },
      {
        path: ':id',
        children: [
          { index: true, element: <ChallengesDetailsPage /> },
          {
            path: 'participations',
            children: [
              { index: true, element: <ChallengeParticipationsPage /> },
              { path: ':id', element: <h1>Une participation</h1> },
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

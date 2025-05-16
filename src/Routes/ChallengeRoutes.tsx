import type { RouteObject } from 'react-router';
import ChallengesDetails from '../pages/ChallengeDetails/ChallengeDetails';
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
            element: <h1>Participations d'un challenge</h1>,
          },
          {
            path: 'participer',
            element: <h1>Lien lançant la participation</h1>,
          },
        ],
      },
    ],
  },
];

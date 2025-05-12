import type { RouteObject } from 'react-router';

export const challengeRoutes: RouteObject[] = [
  {
    path: 'challenges',
    children: [
      { index: true, element: <h1>Les Challenges</h1> },
      {
        path: ':id',
        children: [
          { index: true, element: <h1>Un challenge</h1> },
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

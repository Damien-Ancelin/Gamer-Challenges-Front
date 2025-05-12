import type { RouteObject } from 'react-router';

export const participationRoutes: RouteObject[] = [
  {
    path: 'participations',
    children: [
      { index: true, element: <h1>Les participations</h1> },
      { path: ':id', element: <h1>Une participation</h1> },
    ],
  },
];

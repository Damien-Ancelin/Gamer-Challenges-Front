import type { RouteObject } from 'react-router';

export const gameRoutes: RouteObject[] = [
  {
    path: 'jeux',
    children: [
      { index: true, element: <h1>Les Jeux</h1> },
      { path: ':id', element: <h1>Un jeu</h1> },
    ],
  },
];

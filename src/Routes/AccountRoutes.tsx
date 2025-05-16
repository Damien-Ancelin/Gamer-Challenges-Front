import type { RouteObject } from 'react-router';
import AuthGuard from '../Auth/AuthGuard';
import UserChallengesPage from '../pages/AccountPages/UserChallengesPage';

export const accountRoutes: RouteObject[] = [
  {
    path: 'compte',
    element: <AuthGuard />,
    children: [
      { index: true, element: <h1>Dashboard</h1> },
      { path: 'modifier-compte', element: <h1>Modifier compte</h1> },
      {
        path: 'challenges-by-me',
        children: [
          { index: true, element: <UserChallengesPage /> },
          { path: ':id', element: <h1>Modif challenge</h1> },
          { path: 'creer-challenge', element: <h1>Créer challenge</h1> },
        ],
      },
      {
        path: 'mes-participations',
        children: [
          { index: true, element: <h1>Mes participations</h1> },
          {
            path: 'annuler-participation',
            element: <h1>Supprimer participation</h1>,
          },
          { path: ':id', element: <h1>Modif participations</h1> },
        ],
      },
    ],
  },
];

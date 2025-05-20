import type { RouteObject } from 'react-router';
import LoginPage from '../pages/AuthPages/LoginPage';

export const authRoutes: RouteObject[] = [
  {
    path: 'authentification',
    children: [
      { path: 'connexion', element: <LoginPage /> },
      { path: 'inscription', element: <h1>Register</h1> },
      { path: 'logout', element: <h1>Logout</h1> },
    ],
  },
];

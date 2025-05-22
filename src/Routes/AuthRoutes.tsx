import type { RouteObject } from 'react-router';
import LoginPage from '../pages/AuthPages/LoginPage';
import Logout from '../pages/AuthPages/Logout';

export const authRoutes: RouteObject[] = [
  {
    path: 'authentification',
    children: [
      { path: 'connexion', element: <LoginPage /> },
      { path: 'inscription', element: <h1>Register</h1> },
      { path: 'logout', element: <Logout /> },
    ],
  },
];

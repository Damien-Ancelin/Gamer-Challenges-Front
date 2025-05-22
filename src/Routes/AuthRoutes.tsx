import type { RouteObject } from 'react-router';
import LoginPage from '../pages/AuthPages/LoginPage';
import Logout from '../pages/AuthPages/Logout';
import RegisterPage from '../pages/AuthPages/RegisterPage';

export const authRoutes: RouteObject[] = [
  {
    path: 'authentification',
    children: [
      { path: 'connexion', element: <LoginPage /> },
      { path: 'inscription', element: <RegisterPage /> },
      { path: 'logout', element: <Logout /> },
    ],
  },
];

import type { RouteObject } from 'react-router';

export const authRoutes: RouteObject[] = [
  {
    path: 'authentification',
    children: [
      { index: true, element: <h1>Auth</h1> },
      { path: 'connexion', element: <h1>Login</h1> },
      { path: 'inscription', element: <h1>Register</h1> },
      { path: 'logout', element: <h1>Logout</h1> },
    ],
  },
];

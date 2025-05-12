import type { RouteObject } from 'react-router';
import HomePage from '../pages/Homepage';

export const homeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
];

import type { RouteObject } from 'react-router';
import LeaderBoardPage from '../pages/LeaderBoardPage';

export const leaderboardRoutes: RouteObject[] = [
  {
    path: 'leaderboard',
    element: <LeaderBoardPage />,
  },
];

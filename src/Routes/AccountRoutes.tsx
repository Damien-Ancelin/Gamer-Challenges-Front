import type { RouteObject } from "react-router";
import AuthGuard from "../Auth/AuthGuard";
import CreateChallengePage from "../pages/AccountPages/CreateChallengePage";
import DashBoard from "../pages/AccountPages/DashBoard";
import UpdateChallengePage from "../pages/AccountPages/UpdateChallengePage";
import UpdateUserPage from "../pages/AccountPages/UpdateUserPage";
import UserChallengesPage from "../pages/AccountPages/UserChallengesPage";
import UserParticipationsPage from "../pages/AccountPages/UserParticipationsPage";
import ChallengeUserParticipationPage from "../pages/ChallengeUserParticipationPage";

export const accountRoutes: RouteObject[] = [
  {
    path: "compte",
    element: <AuthGuard />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "modifier-compte", element: <UpdateUserPage /> },
      {
        path: "challenges-by-me",
        children: [
          { index: true, element: <UserChallengesPage /> },
          {
            path: ":challengeId/modifier-challenge",
            element: <UpdateChallengePage />,
          },
          { path: "creer-challenge", element: <CreateChallengePage /> },
        ],
      },
      {
        path: "mes-participations",
        children: [
          { index: true, element: <UserParticipationsPage /> },
          { path: ":id", element: <ChallengeUserParticipationPage /> },
        ],
      },
    ],
  },
];

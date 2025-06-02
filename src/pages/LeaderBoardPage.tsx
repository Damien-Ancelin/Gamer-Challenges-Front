import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { LeaderBoard as TLeaderboard } from '../@types';

import { useErrorHandler } from '../components/ErrorHandlerComponent';
import LeaderBoardCard from '../components/LeaderBoardCard';
import { api } from '../services/api';
import Loader from '../ui/Loader';

export default function LeaderBoardPage() {
  // Hooks
  const handleError = useErrorHandler();

  // States
  const [leaderBoard, setLeaderBoard] = useState<TLeaderboard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const rankTab = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
  ];

  useEffect(() => {
    setIsLoading(true);
    const fetchLeaderBoard = async () => {
      try {
        const data = await api.getLeaderboardParticipations();
        if (data) {
          setLeaderBoard(data.leaderBoard);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderBoard();
  }, [handleError]);

  return (
    <>
      <Helmet>
        <title>Leaderboard | Gamer Challenges</title>
        <meta
          name="description"
          content="Découvrez les 10 meilleurs gamers sur GamerChallenges. Qui dominera le classement cette semaine ?"
        />
        <meta property="og:title" content="Leaderboard | Gamer Challenges" />
        <meta
          property="og:description"
          content="Découvrez les 10 meilleurs gamers sur GamerChallenges. Qui dominera le classement cette semaine ?"
        />
      </Helmet>
      <section className="leaderboard-page">
        <h1 className="leaderboard-page__title">leaderboard</h1>
        {!isLoading ? (
          rankTab.map((rank, index) => (
            <LeaderBoardCard
              key={rankTab[index]}
              rank={rank}
              leaderBoard={leaderBoard[index]}
            />
          ))
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
}

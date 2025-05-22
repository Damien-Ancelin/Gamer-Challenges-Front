import { Helmet } from 'react-helmet-async';
import LeaderBoardCard from '../components/LeaderBoardCard';

export default function LeaderBoardPage() {
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
        {rankTab.map((rank, index, rankTab) => (
          <LeaderBoardCard key={rankTab[index]} rank={rank} />
        ))}
      </section>
    </>
  );
}

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
      <section className="leaderboard-page">
        <h1 className="leaderboard-page__title">leaderboard</h1>
        {rankTab.map((rank, index, rankTab) => (
          <LeaderBoardCard key={rankTab[index]} rank={rank} />
        ))}
      </section>
    </>
  );
}

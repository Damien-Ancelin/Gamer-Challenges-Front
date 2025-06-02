import type { LeaderBoard as TLeaderboard } from '../@types';

interface LeaderBoardCardProps {
  rank: string;
  leaderBoard: TLeaderboard;
}

export default function LeaderBoardCard({
  rank,
  leaderBoard,
}: LeaderBoardCardProps) {
  const defaultLeaderBoard: TLeaderboard = {
    username: 'Unknown',
    participation_count: '0',
  };

  const currentLeaderBoard = leaderBoard || defaultLeaderBoard;
  const score = Number(currentLeaderBoard.participation_count) * 1000;

  return (
    <article className="leaderboard-card">
      <div className="leaderboard-card__rank-user-container">
        <p className="leaderboard-card__rank">{rank}</p>
        <p className="leaderboard-card__username">
          {currentLeaderBoard.username}
        </p>
      </div>
      <p className="leaderboard-card__score">{score} pts</p>
    </article>
  );
}

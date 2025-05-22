interface LeaderBoardCardProps {
  rank: string;
}

export default function LeaderBoardCard({ rank }: LeaderBoardCardProps) {
  return (
    <article className="leaderboard-card">
      <div className="leaderboard-card__rank-user-container">
        <p className="leaderboard-card__rank">{rank}</p>
        <p className="leaderboard-card__username">
          LErOIdeLaBretagneArmoricaineeeeeeeeeeeeeeeeeeeeeeeeeeee
        </p>
      </div>
      <p className="leaderboard-card__score">250.000 pts</p>
    </article>
  );
}

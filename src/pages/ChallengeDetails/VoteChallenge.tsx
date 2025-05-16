import RatingBar from '../../components/RatingBar';

interface VoteChallengeProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setIsVoted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VoteChallenge({
  rating,
  setRating,
  setIsVoted,
}: VoteChallengeProps) {
  const handleRatingChallenge = (rating: number) => {
    const purifyRating = Number(rating);
    setIsVoted(true);
    console.log('Rating submitted:', purifyRating);
  };
  return (
    <div className="challenge-details-page__vote-container">
      <h3 className="challenge-details-page__vote__title">
        Votez pour ce challenge
      </h3>
      <div className="challenge-details-page__vote__rating">
        <RatingBar rating={rating} setRating={setRating} />
        <button
          className="button button--purple-border"
          type="button"
          onClick={() => handleRatingChallenge(rating)}
        >
          Envoyer ma note
        </button>
      </div>
    </div>
  );
}

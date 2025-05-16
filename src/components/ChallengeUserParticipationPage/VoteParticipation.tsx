import RatingBar from '../RatingBar';

interface VoteParticipationProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setIsVoted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VoteParticipation({
  rating,
  setRating,
  setIsVoted,
}: VoteParticipationProps) {
  const handleRatingParticipation = (rating: number) => {
    const purifyRating = Number(rating);
    setIsVoted(true);
    console.log('Rating submitted:', purifyRating);
  };
  return (
    <div className="challenge-user-participation-page__vote-container">
      <h3 className="challenge-user-participation-page__vote__title">
        Votez pour cette participation
      </h3>
      <div className="challenge-user-participation-page__vote__rating">
        <RatingBar rating={rating} setRating={setRating} />
        <button
          className="button button--purple-border"
          type="button"
          onClick={() => handleRatingParticipation(rating)}
        >
          Envoyer ma note
        </button>
      </div>
    </div>
  );
}

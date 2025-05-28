import { useState } from 'react';
import RatingBar from '../RatingBar';

interface VoteChallengeProps {
  isAuthenticated: boolean;
  isOwner: boolean;
}

export default function VoteChallenge({
  isAuthenticated,
  isOwner,
}: VoteChallengeProps) {
  // States
  const [rating, setRating] = useState<number>(1);
  const [isVoted, setIsVoted] = useState<boolean>(false);

  const handleRatingChallenge = (rating: number) => {
    const purifyRating = Number(rating);
    setIsVoted(true);
    console.log('Rating submitted:', purifyRating);
  };

  return (
    <>
      {!isVoted && isAuthenticated && !isOwner && (
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
      )}
    </>
  );
}

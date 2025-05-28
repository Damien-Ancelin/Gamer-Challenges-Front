import { useEffect, useState } from 'react';
import type { ChallengeReview as TChallengeReview } from '../../@types';

import { useErrorHandler } from '../ErrorHandlerComponent';

import { api } from '../../services/api';
import Loader from '../../ui/Loader';
import ProgressBar from '../ProgressBar';

interface ChallengeDetailsRatingProps {
  challenge_id: number;
  ratingUpdated: boolean;
  setRatingUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChallengeDetailsRating({
  challenge_id,
  ratingUpdated,
  setRatingUpdated,
}: ChallengeDetailsRatingProps) {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [ratingIsLoading, setRatingIsLoading] = useState(false);
  const [challengeReview, setChallengeReview] = useState<TChallengeReview>({
    ratingCounts: 0,
    averageRating: 0,
  });

  const ChallengeRatingPercent = Math.round(
    (challengeReview.averageRating / 5) * 100,
  );

  useEffect(() => {
    setRatingIsLoading(true);
    const fetchChallengeReviews = async () => {
      try {
        const data = await api.getChallengeReviewsById(challenge_id);
        if (data.challengeReview) {
          setChallengeReview(data.challengeReview);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setRatingIsLoading(false);
        if (ratingUpdated) {
          setRatingUpdated(false);
        }
      }
    };
    fetchChallengeReviews();
  }, [handleError, challenge_id, ratingUpdated, setRatingUpdated]);

  return (
    <>
      {ratingIsLoading && <Loader />}
      {!ratingIsLoading && (
        <div className="challenge-details-page__aside__rating-container">
          <p
            className="challenge-details-page__aside__rating"
            aria-label="note en pourcentage du challenge"
          >
            {ChallengeRatingPercent}%
          </p>
          <ProgressBar rating={ChallengeRatingPercent} />
        </div>
      )}
    </>
  );
}

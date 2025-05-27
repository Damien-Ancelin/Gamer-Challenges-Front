import { useEffect, useState } from 'react';
import type { ChallengeReview as TChallengeReview } from '../../@types';

import { getBorderClassByRating } from '../../../utils/borderClass';
import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

import Loader from '../../ui/Loader';
import ProgressBar from '../ProgressBar';

interface ChallengeCardRatingProps {
  challengeId: number;
  setBorderClassArticle: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChallengeCardRating({
  challengeId,
  setBorderClassArticle,
}: ChallengeCardRatingProps) {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [ratingIsLoading, setRatingIsLoading] = useState(true);
  const [challengeReview, setChallengeReview] = useState<TChallengeReview>({
    ratingCounts: 0,
    averageRating: 0,
  });

  const ChallengeRatingPercent = Math.round(
    (challengeReview.averageRating / 5) * 100,
  );

  useEffect(() => {
    const fetchChallengeReviews = async () => {
      try {
        const data = await api.getChallengeReviewsById(challengeId);
        if (data.challengeReview) {
          setChallengeReview(data.challengeReview);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setRatingIsLoading(false);
      }
    };
    fetchChallengeReviews();
  }, [handleError, challengeId]);

  useEffect(() => {
    const borderClass = getBorderClassByRating(ChallengeRatingPercent);
    setBorderClassArticle(borderClass);
  }, [ChallengeRatingPercent, setBorderClassArticle]);

  return (
    <>
      {ratingIsLoading && <Loader />}
      {!ratingIsLoading && (
        <div className="challenge-card__content__details__rating-container">
          <p
            className="challenge-card__content__details__rating"
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

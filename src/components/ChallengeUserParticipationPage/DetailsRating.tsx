import { useEffect, useState } from 'react';
import type { ParticipationReview as TParticipationReview } from '../../@types';

import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

import Loader from '../../ui/Loader';
import ProgressBar from '../ProgressBar';

interface DetailsRatingProps {
  participation_id: number;
  ratingUpdated: boolean;
  setRatingUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DetailsRating({
  participation_id,
  ratingUpdated,
  setRatingUpdated,
}: DetailsRatingProps) {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [ratingIsLoading, setRatingIsLoading] = useState(false);
  const [participationReview, setParticipationReview] =
    useState<TParticipationReview>({
      ratingCounts: 0,
      averageRating: 0,
    });

  const participationReviewPercent = Math.round(
    (participationReview.averageRating / 5) * 100,
  );

  useEffect(() => {
    setRatingIsLoading(true);
    const fetchParticipationReviews = async () => {
      try {
        const data = await api.getParticipationReviewsById(participation_id);
        if (data.participationReview) {
          setParticipationReview(data.participationReview);
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
    fetchParticipationReviews();
  }, [handleError, participation_id, ratingUpdated, setRatingUpdated]);

  return (
    <>
      {ratingIsLoading && <Loader />}
      {!ratingIsLoading && (
        <div className="challenge-user-participation-page__rating-container">
          <p
            className="challenge-user-participation-page__rating"
            aria-label="note en pourcentage du challenge"
          >
            {participationReviewPercent}%
          </p>
          <ProgressBar rating={participationReviewPercent} />
        </div>
      )}
    </>
  );
}

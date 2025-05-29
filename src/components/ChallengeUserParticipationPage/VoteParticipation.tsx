import { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useErrorHandler } from '../ErrorHandlerComponent';

import { toast } from 'react-toastify';
import { api } from '../../services/api';
import Loader from '../../ui/Loader';
import RatingBar from '../RatingBar';

interface VoteParticipationProps {
  isOwner: boolean;
  isValidated: boolean;
  participation_id: number;
  setRatingUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VoteParticipation({
  isOwner,
  isValidated,
  participation_id,
  setRatingUpdated,
}: VoteParticipationProps) {
  // Hooks
  const { isAuthenticated } = useAuth();
  const handleError = useErrorHandler();

  // State
  const [rating, setRating] = useState<number>(1); // Rating for the video
  const [isVoted, setIsVoted] = useState<boolean>(false); // Check if user has already voted
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    if (!isAuthenticated || isOwner || !participation_id) {
      return;
    }
    setIsLoading(true);
    const fetchCheckIsVoted = async () => {
      try {
        const data = await api.checkUserIsVoteParticipation(participation_id);
        if (data) {
          setIsVoted(data.isReviewed);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCheckIsVoted();
    setIsLoading(true);
  }, [handleError, isAuthenticated, isOwner, participation_id]);

  const handleRatingParticipation = async () => {
    if (!isAuthenticated || isOwner || isVoted) {
      return;
    }
    if (rating < 1 || rating > 5) {
      throw new Error('La note doit être comprise entre 1 et 5.');
    }
    const purifyRating = Number(rating);
    setIsLoading(true);
    try {
      const data = await api.voteParticipation(participation_id, purifyRating);
      if (data) {
        setIsVoted(data.isVoted);
        setRatingUpdated(true);
        toast.success(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        await handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {!isVoted && isAuthenticated && !isOwner && isValidated && (
        <div className="challenge-user-participation-page__vote-container">
          <h3 className="challenge-user-participation-page__vote__title">
            Votez pour cette participation
          </h3>
          {!isLoading ? (
            <div className="challenge-user-participation-page__vote__rating">
              <RatingBar rating={rating} setRating={setRating} />
              <button
                className="button button--purple-border"
                type="button"
                onClick={() => handleRatingParticipation()}
              >
                Envoyer ma note
              </button>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      )}
      {isVoted && (
        <div className="rating-bar__already-voted">
          <h4>Vous avez déjà voté pour cette participation.</h4>
        </div>
      )}
    </>
  );
}

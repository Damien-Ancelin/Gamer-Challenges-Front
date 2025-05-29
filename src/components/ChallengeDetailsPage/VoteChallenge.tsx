import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

import Loader from '../../ui/Loader';
import RatingBar from '../RatingBar';

interface VoteChallengeProps {
  isOwner: boolean;
  challenge_id: number;
  isOpen: boolean;
  setRatingUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VoteChallenge({
  isOwner,
  challenge_id,
  isOpen,
  setRatingUpdated,
}: VoteChallengeProps) {
  // Hooks
  const handleError = useErrorHandler();
  const { isAuthenticated } = useAuth();

  // States
  const [rating, setRating] = useState<number>(1);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated || !challenge_id || isOwner) {
      return;
    }
    setIsLoading(true);
    const fetchCheckIsVoted = async () => {
      try {
        const data = await api.checkUserIsVoteChallenge(challenge_id);
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
  }, [handleError, challenge_id, isAuthenticated, isOwner]);

  const handleRatingChallenge = async () => {
    if (!isAuthenticated || isOwner || isVoted) {
      return;
    }
    if (rating < 1 || rating > 5) {
      throw new Error('La note doit être comprise entre 1 et 5.');
    }
    const purifyRating = Number(rating);

    setIsLoading(true);
    try {
      const data = await api.voteChallenge(challenge_id, purifyRating);
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
      {!isVoted && isAuthenticated && !isOwner && isOpen && (
        <div className="challenge-details-page__vote-container">
          <h3 className="challenge-details-page__vote__title">
            Votez pour ce challenge
          </h3>
          {!isLoading ? (
            <div className="challenge-details-page__vote__rating">
              <RatingBar rating={rating} setRating={setRating} />
              <button
                className="button button--purple-border"
                type="button"
                onClick={() => handleRatingChallenge()}
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
          <h4>Vous avez déjà voté pour ce challenge.</h4>
        </div>
      )}
    </>
  );
}

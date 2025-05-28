import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { toast } from 'react-toastify';
import { api } from '../../services/api';
import Loader from '../../ui/Loader';
import { useErrorHandler } from '../ErrorHandlerComponent';

interface HandleParticipationProps {
  isOwner: boolean;
  isAuthenticated: boolean;
  challenge_id: number;
  isOpen: boolean;
  setParticipationUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HandleParticipation({
  isOwner,
  isAuthenticated,
  challenge_id,
  isOpen,
  setParticipationUpdated,
}: HandleParticipationProps) {
  // Hooks
  const handleError = useErrorHandler();

  // States
  const [isAlreadyParticipating, setIsAlreadyParticipating] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated || !challenge_id || isOwner) {
      return;
    }
    setIsLoading(true);
    const checkParticipation = async () => {
      try {
        const data = await api.checkUserParticipation(challenge_id);
        if (data) {
          setIsAlreadyParticipating(data.isParticipated);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkParticipation();
  }, [handleError, isAuthenticated, challenge_id, isOwner]);

  const handleCreateParticipation = async () => {
    if (!isAuthenticated || isOwner || !isOpen) {
      return;
    }
    setIsLoading(true);
    try {
      const data = await api.createUserParticipation(challenge_id);
      if (data) {
        setIsAlreadyParticipating(data.isParticipated);
        setParticipationUpdated(true);
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

  const handleDeleteParticipation = async () => {
    if (!isAuthenticated || isOwner || !isOpen) {
      return;
    }
    setIsLoading(true);
    try {
      const data = await api.deleteUserParticipation(challenge_id);
      if (data.success) {
        setIsAlreadyParticipating(false);
        setParticipationUpdated(true);
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
      {!isLoading ? (
        <div className="challenge-details-page__participations">
          <div className="challenge-details-page__button-container">
            {isOwner && isAuthenticated && (
              <button type="button" className="button button--blue-border">
                modifier le challenge
              </button>
            )}

            {!isOwner &&
              !isAlreadyParticipating &&
              isAuthenticated &&
              isOpen && (
                <button
                  type="button"
                  className="button button--blue-border"
                  onClick={handleCreateParticipation}
                >
                  participer
                </button>
              )}

            {!isOwner &&
              isAlreadyParticipating &&
              isAuthenticated &&
              isOpen && (
                <button
                  type="button"
                  className="button button--alert-border"
                  onClick={handleDeleteParticipation}
                >
                  annuler la participation
                </button>
              )}

            <Link to="/challenges/1/participations">
              <button type="button" className="button button--orange-border">
                voir les participations
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

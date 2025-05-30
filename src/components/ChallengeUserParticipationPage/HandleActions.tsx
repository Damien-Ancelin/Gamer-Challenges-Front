import { useState } from 'react';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router';

import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

import Loader from '../../ui/Loader';
import FormVideoUrl from './FormVideoUrl';

interface HandleActionsProps {
  isOwner: boolean;
  isValidated: boolean;
  setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setParticipationUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  participation_id: number;
  challengeId: number;
}

export default function HandleActions({
  isOwner,
  isValidated,
  setIsValidated,
  setParticipationUpdated,
  participation_id,
  challengeId,
}: HandleActionsProps) {
  // Hooks
  const { isAuthenticated } = useAuth();
  const handleError = useErrorHandler();
  const navigate = useNavigate();

  // States
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteParticipation = async () => {
    if (!isAuthenticated || !isOwner) {
      return;
    }
    setIsLoading(true);
    try {
      const data = await api.deleteUserParticipation(challengeId);
      if (data.success) {
        toast.success(data.message);
        navigate(`/challenges/${challengeId}`);
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
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="challenge-user-participation-page__form__container">
          {isOwner && isAuthenticated && (
            <>
              {isOpenForm && (
                <FormVideoUrl
                  setIsValidated={setIsValidated}
                  setIsOpenForm={setIsOpenForm}
                  setParticipationUpdated={setParticipationUpdated}
                  participation_id={participation_id}
                />
              )}

              {!isOpenForm && !isValidated && (
                <button
                  type="button"
                  className="button button--blue-border"
                  onClick={() => setIsOpenForm(true)}
                >
                  envoyer ma participation
                </button>
              )}

              {!isOpenForm && isValidated && (
                <button
                  type="button"
                  className="button button--orange-border"
                  onClick={() => setIsOpenForm(true)}
                >
                  modifier ma participation
                </button>
              )}

              {!isOpenForm && (
                <button
                  type="button"
                  className="button button--alert-border"
                  onClick={handleDeleteParticipation}
                >
                  annuler ma participation
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
// import { useErrorHandler } from "../ErrorHandlerComponent";

import FormVideoUrl from './FormVideoUrl';

interface HandleActionsProps {
  isOwner: boolean;
}

export default function HandleActions({ isOwner }: HandleActionsProps) {
  // Hooks
  const { isAuthenticated } = useAuth();
  // const handleError = useErrorHandler();

  // States
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isAlreadyValidated, setIsAlreadyValidated] = useState<boolean>(false); // Check if user has already submitted a video

  return (
    <div className="challenge-user-participation-page__form__container">
      {isOwner && isAuthenticated && (
        <>
          {isOpenForm && (
            <FormVideoUrl
              setIsAlreadyValidated={setIsAlreadyValidated}
              setIsOpenForm={setIsOpenForm}
            />
          )}

          {!isOpenForm && !isAlreadyValidated && (
            <button
              type="button"
              className="button button--blue-border"
              onClick={() => setIsOpenForm(true)}
            >
              envoyer ma participation
            </button>
          )}

          {!isOpenForm && isAlreadyValidated && (
            <button
              type="button"
              className="button button--orange-border"
              onClick={() => setIsOpenForm(true)}
            >
              modifier ma participation
            </button>
          )}

          {!isOpenForm && (
            <button type="button" className="button button--alert-border">
              annuler ma participation
            </button>
          )}
        </>
      )}
    </div>
  );
}

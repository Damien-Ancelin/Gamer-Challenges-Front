import { useState } from 'react';
import { Link } from 'react-router';

interface HandleParticipationProps {
  isOwner: boolean;
  isAuthenticated: boolean;
}

export default function HandleParticipation({
  isOwner,
  isAuthenticated,
}: HandleParticipationProps) {
  // States

  const [isAlreadyParticipating, setIsAlreadyParticipating] =
    useState<boolean>(false);

  console.log('isAlreadyParticipating', setIsAlreadyParticipating);

  return (
    <div className="challenge-details-page__participations">
      <div className="challenge-details-page__button-container">
        {isOwner && isAuthenticated && (
          <button type="button" className="button button--blue-border">
            modifier le challenge
          </button>
        )}

        {!isOwner && !isAlreadyParticipating && isAuthenticated && (
          <button type="button" className="button button--blue-border">
            participer
          </button>
        )}

        {!isOwner && isAlreadyParticipating && isAuthenticated && (
          <button type="button" className="button button--alert-border">
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
  );
}

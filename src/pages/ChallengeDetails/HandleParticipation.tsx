import { Link } from 'react-router';

interface HandleParticipationProps {
  isOwner: boolean;
  isAlreadyParticipating: boolean;
}

export default function HandleParticipation({
  isOwner,
  isAlreadyParticipating,
}: HandleParticipationProps) {
  return (
    <div className="challenge-details-page__participations">
      <div className="challenge-details-page__button-container">
        {isOwner && (
          <button type="button" className="button button--blue-border">
            modifier le challenge
          </button>
        )}

        {!isOwner && !isAlreadyParticipating && (
          <button type="button" className="button button--blue-border">
            participer
          </button>
        )}

        {!isOwner && isAlreadyParticipating && (
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

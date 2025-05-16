interface HandleParticipationProps {
  isOwner: boolean;
}

export default function HandleParticipation({
  isOwner,
}: HandleParticipationProps) {
  return (
    <div className="challenge-details-page__participations">
      <div className="challenge-details-page__button-container">
        {isOwner ? (
          <button type="button" className="button button--blue-border">
            modifier le challenge
          </button>
        ) : (
          <button type="button" className="button button--blue-border">
            participer
          </button>
        )}
        <button type="button" className="button button--orange-border">
          voir les participations
        </button>
      </div>
    </div>
  );
}

import { Link } from 'react-router';
import type { ParticipationCard as TParticipationCard } from '../../@types';

import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

import { toast } from 'react-toastify';
import StatusLabel from '../../ui/StatusLabel';

interface DashBoardParticipationCardProps {
  participation: TParticipationCard;
  setParticipationUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashBoardParticipationCard({
  participation,
  setParticipationUpdated,
}: DashBoardParticipationCardProps) {
  // Hooks
  const { isAuthenticated } = useAuth();
  const handleError = useErrorHandler();

  const handleDeleteParticipation = async () => {
    if (!isAuthenticated) {
      return;
    }
    setParticipationUpdated(true);
    try {
      const data = await api.deleteUserParticipation(participation.challengeId);
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        await handleError(error);
      }
    }
  };

  return (
    <article className="dashboard-participation-card yellow-border">
      <div className="dashboard-participation-card__content">
        <div className="dashboard-participation-card__content__details-container">
          <div className="dashboard-participation-card__content__details__header">
            <header className="dashboard-participation-card__content__details__header-container">
              <h3 className="dashboard-participation-card__content__details__header-title">
                {participation.challenge.name}
              </h3>
              <StatusLabel status={participation.challenge.isOpen} />
            </header>
            <div className="dashboard-participation-card__content__details__infos">
              <p className="dashboard-participation-card__content__details__infos-game">
                jeu : {participation.challenge.game.name}
              </p>
              <p className="dashboard-participation-card__content__details__infos-category">
                catégorie : {participation.challenge.category.name}
              </p>
              <p className="dashboard-participation-card__content__details__infos-level">
                niveau : {participation.challenge.level.name}
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard-participation-card__content__button-container">
          <Link
            to={`/challenges/${participation.challengeId}/participations/${participation.id}`}
          >
            {participation.isValidated && (
              <button
                className="dashboard-participation-card__content__button button button--purple-border"
                type="button"
              >
                voir la vidéo
              </button>
            )}
            {!participation.isValidated && (
              <button
                className="dashboard-participation-card__content__button button button--blue-border"
                type="button"
              >
                envoyer vidéo
              </button>
            )}
          </Link>
          <button
            className="dashboard-participation-card__content__button button button--alert-border"
            type="button"
            onClick={handleDeleteParticipation}
          >
            annuler
          </button>
        </div>
      </div>
    </article>
  );
}

import { Link } from 'react-router';
import StatusLabel from '../../ui/StatusLabel';

export default function DashBoardParticipationCard() {
  const isValidated = false;
  return (
    <article className="dashboard-participation-card yellow-border">
      <div className="dashboard-participation-card__content">
        <div className="dashboard-participation-card__content__details-container">
          <div className="dashboard-participation-card__content__details__header">
            <header className="dashboard-participation-card__content__details__header-container">
              <h3 className="dashboard-participation-card__content__details__header-title">
                celest any %
              </h3>
              <StatusLabel status={true} />
            </header>
            <div className="dashboard-participation-card__content__details__infos">
              <p className="dashboard-participation-card__content__details__infos-game">
                jeu : celeste
              </p>
              <p className="dashboard-participation-card__content__details__infos-category">
                catégorie : speedrun
              </p>
              <p className="dashboard-participation-card__content__details__infos-level">
                niveau : très difficile
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard-participation-card__content__button-container">
          <Link to="/challenges/1/participations/12">
            {isValidated && (
              <button
                className="dashboard-participation-card__content__button button button--purple-border"
                type="button"
              >
                voir la vidéo
              </button>
            )}
            {!isValidated && (
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
          >
            annuler
          </button>
        </div>
      </div>
    </article>
  );
}

import { Link } from 'react-router';
import StatusLabel from '../../ui/StatusLabel';
import ProgressBar from '../ProgressBar';

export default function DashboardChallengeCard() {
  return (
    <Link to="/challenges/1">
      <article className="dashboard-challenge-card yellow-border">
        <div className="dashboard-challenge-card__content">
          <div className="dashboard-challenge-card__content__details-container">
            <div className="dashboard-challenge-card__content__details__header">
              <header className="dashboard-challenge-card__content__details__header-container">
                <h3 className="dashboard-challenge-card__content__details__header-title">
                  God of War No Hit
                </h3>
                <StatusLabel status={true} />
              </header>
              <div className="dashboard-challenge-card__content__details__infos">
                <p className="dashboard-challenge-card__content__details__infos-game">
                  jeu : god of war
                </p>
                <p className="dashboard-challenge-card__content__details__infos-category">
                  catégorie : performance
                </p>
                <p className="dashboard-challenge-card__content__details__infos-level">
                  niveau : difficile
                </p>
              </div>
            </div>
            <footer className="dashboard-challenge-card__content__details__footer">
              <div className="dashboard-challenge-card__content__details__rating-container">
                <p
                  className="dashboard-challenge-card__content__details__rating"
                  aria-label="note en pourcentage du challenge"
                >
                  45%
                </p>
                <ProgressBar rating={45} />
              </div>
              <p className="dashboard-challenge-card__content__details__participations">
                42 participations
              </p>
            </footer>
          </div>
        </div>
      </article>
    </Link>
  );
}

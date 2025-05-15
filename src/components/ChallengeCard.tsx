import altImg100 from '../assets/images/alt-100px.webp';
import StatusLabel from '../ui/StatusLabel';
import ProgressBar from './ProgressBar';

export default function ChallengeCard() {
  return (
    <article className="challenge-card yellow-border">
      <div className="challenge-card__content">
        <div className="challenge-card__content__image">
          <img
            className="challenge-card__content__image-main"
            src={altImg100}
            alt="Illustration du défi God of War no hit"
            loading="lazy"
          />
          <StatusLabel status="open" />
        </div>

        <div className="challenge-card__content__details-container">
          <div className="challenge-card__content__details__header">
            <header className="challenge-card__content__details__header-container">
              <h3 className="challenge-card__content__details__header-title">
                God of War No Hit
              </h3>
            </header>
            <div className="challenge-card__content__details__infos">
              <p className="challenge-card__content__details__infos-game">
                jeu : god of war
              </p>
              <p className="challenge-card__content__details__infos-category">
                catégorie : performance
              </p>
              <p className="challenge-card__content__details__infos-level">
                niveau : difficile
              </p>
            </div>
          </div>

          <footer className="challenge-card__content__details__footer">
            <div className="challenge-card__content__details__rating-container">
              <p
                className="challenge-card__content__details__rating"
                aria-label="note en pourcentage du challenge"
              >
                45%
              </p>
              <ProgressBar rating={45} />
            </div>
            <p className="challenge-card__content__details__participations">
              42 participations
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}

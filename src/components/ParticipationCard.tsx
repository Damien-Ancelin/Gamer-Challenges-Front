import { Link } from 'react-router';
import type { ParticipationCard as TParticipationCard } from '../@types';

interface ParticipationCardProps {
  participation?: TParticipationCard;
}

export default function ParticipationCard({
  participation,
}: ParticipationCardProps) {
  const defaultParticipation = {
    id: 0,
    videoLink: 'https://www.youtube.com/watch?v=q7iKIz1SXpU',
    isValidated: false,
    challengeId: 0,
    userId: 0,
    challenge: {
      name: 'Défi en cours de création',
      isOpen: false,
      game: { name: 'Jeu inconnu' },
      category: { name: 'Catégorie inconnue' },
      level: { name: 'Niveau inconnu' },
    },
    user: { username: 'Utilisateur inconnu' },
  };

  const currentParticipation = participation || defaultParticipation;

  const youtubeURL = currentParticipation.videoLink;
  const youtubeVideoId = youtubeURL.split('v=')[1];
  const youtubeThumbnailURL120x90 = `https://img.youtube.com/vi/${youtubeVideoId}/default.jpg`;
  const youtubeThumbnailURL320x180 = `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`;

  return (
    <article className="participation-card yellow-border">
      <div className="participation-card__content">
        <div className="participation-card__content__image">
          <img
            className="participation-card__content__image-main"
            src={youtubeThumbnailURL120x90}
            srcSet={`${youtubeThumbnailURL120x90} 125w, ${youtubeThumbnailURL320x180} 320w`}
            sizes="(max-width: 768px) 125px, (max-width: 1440px) 320px"
            alt={`Illustration du défi ${currentParticipation.challenge.name}`}
            loading="lazy"
          />

          <Link
            to={`/challenges/${currentParticipation.challengeId}/participations/${currentParticipation.id}`}
          >
            <button
              className="participation-card__content__image-button button button--purple-border"
              type="button"
            >
              voir la vidéo
            </button>
          </Link>
        </div>
        <div className="participation-card__content__details-container">
          <div className="participation-card__content__details__header">
            <header className="participation-card__content__details__header-container">
              <h3 className="participation-card__content__details__header-title">
                {currentParticipation.challenge.name}
              </h3>
              <span className="label participation-card__content__details__header-owner">
                {currentParticipation.user.username}
              </span>
            </header>
            <div className="participation-card__content__details__infos">
              <p className="participation-card__content__details__infos-game">
                jeu : {currentParticipation.challenge.game.name}
              </p>
              <p className="participation-card__content__details__infos-category">
                catégorie : {currentParticipation.challenge.category.name}
              </p>
              <p className="participation-card__content__details__infos-level">
                niveau : {currentParticipation.challenge.level.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

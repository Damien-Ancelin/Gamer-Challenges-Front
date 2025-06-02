import { Link } from 'react-router';
import { parseYoutubeId } from '../../../utils/parseYoutubeId';
import type { ParticipationCard as TParticipationCard } from '../../@types';

interface ParticipationCardProps {
  participation: TParticipationCard;
}

export default function ChallengeParticipationCard({
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

  const youtubeVideoId = parseYoutubeId(currentParticipation.videoLink);

  const youtubeThumbnailURL120x90 = `https://img.youtube.com/vi/${youtubeVideoId}/default.jpg`;
  const youtubeThumbnailURL320x180 = `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`;

  return (
    <article className="challenge-participation-card yellow-border">
      <div className="challenge-participation-card__content">
        {currentParticipation.isValidated && (
          <div className="challenge-participation-card__content__image">
            <img
              className="challenge-participation-card__content__image-main"
              src={youtubeThumbnailURL120x90}
              srcSet={`${youtubeThumbnailURL120x90} 125w, ${youtubeThumbnailURL320x180} 320w`}
              sizes="(max-width: 768px) 125px, (max-width: 1440px) 320px"
              alt={`Illustration du défi ${currentParticipation.challenge.name}`}
              loading="lazy"
            />

            {participation.isValidated && (
              <Link
                to={`/challenges/${participation.challengeId}/participations/${participation.id}`}
              >
                <button
                  className="dashboard-challenge-participation-card__content__button button button--purple-border"
                  type="button"
                >
                  voir la vidéo
                </button>
              </Link>
            )}
          </div>
        )}
        <div className="challenge-participation-card__content__details-container">
          <div className="challenge-participation-card__content__details__header">
            <header className="challenge-participation-card__content__details__header-container">
              <h3 className="challenge-participation-card__content__details__header-title">
                {currentParticipation.challenge.name}
              </h3>
              {currentParticipation.user && (
                <span className="label challenge-participation-card__content__details__header-owner">
                  {currentParticipation.user.username}
                </span>
              )}
            </header>
            <div className="challenge-participation-card__content__details__infos">
              <p className="challenge-participation-card__content__details__infos-game">
                jeu : {currentParticipation.challenge.game.name}
              </p>
              <p className="challenge-participation-card__content__details__infos-category">
                catégorie : {currentParticipation.challenge.category.name}
              </p>
              <p className="challenge-participation-card__content__details__infos-level">
                niveau : {currentParticipation.challenge.level.name}
              </p>
              {!participation.isValidated && (
                <h4 className="challenge-participation-card__content__details__infos-no-participation">
                  En attente de validation
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

import { useState } from 'react';
import type { ChallengeCard as TChallengeCard } from '../../@types';

import { Link } from 'react-router';

import altImg100 from '@/assets/images/alt-100px.webp';
import StatusLabel from '../../ui/StatusLabel';
import ChallengeCardParticipation from './ChallengeCardParticipation';
import ChallengeCardRating from './ChallengeCardRating';

interface ChallengeCardProps {
  challenge?: TChallengeCard;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  // State
  const [borderClassArticle, setBorderClassArticle] = useState<string>('');

  // Valeurs alternatives
  const defaultChallenge = {
    id: 0,
    name: 'Défi en cours de création',
    challengeImage: altImg100,
    isOpen: false,
    game: { name: 'Jeu inconnu' },
    category: { name: 'Catégorie inconnue' },
    level: { name: 'Niveau inconnu' },
  };

  const currentChallenge = challenge || defaultChallenge;

  return (
    <Link to={`/challenges/${currentChallenge.id}`}>
      <article className={`challenge-card ${borderClassArticle}`}>
        <div className="challenge-card__content">
          <div className="challenge-card__content__image">
            {currentChallenge.challengeImage ? (
              <img
                className="challenge-card__content__image-main"
                src={currentChallenge.challengeImage as string}
                alt={`Illustration du défi ${currentChallenge.name}`}
                width="100"
                height="100"
                loading="lazy"
              />
            ) : (
              <img
                className="challenge-card__content__image-main"
                src={altImg100}
                alt="Illustration de défi alternatif"
                width="100"
                height="100"
                loading="lazy"
              />
            )}
            <StatusLabel status={currentChallenge.isOpen} />
          </div>
          <div className="challenge-card__content__details-container">
            <div className="challenge-card__content__details__header">
              <header className="challenge-card__content__details__header-container">
                <h3 className="challenge-card__content__details__header-title">
                  {currentChallenge.name}
                </h3>
              </header>
              <div className="challenge-card__content__details__infos">
                <p className="challenge-card__content__details__infos-game">
                  jeu : {currentChallenge.game.name}
                </p>
                <p className="challenge-card__content__details__infos-category">
                  catégorie : {currentChallenge.category.name}
                </p>
                <p className="challenge-card__content__details__infos-level">
                  niveau : {currentChallenge.level.name}
                </p>
              </div>
            </div>
            <footer className="challenge-card__content__details__footer">
              <ChallengeCardRating
                challengeId={currentChallenge.id}
                setBorderClassArticle={setBorderClassArticle}
              />
              <ChallengeCardParticipation challengeId={currentChallenge.id} />
            </footer>
          </div>
        </div>
      </article>
    </Link>
  );
}

import { Link } from 'react-router';
import StatusLabel from '../../../ui/StatusLabel';

import { useState } from 'react';
import type { ChallengeCard as TChallengeCard } from '../../../@types';
import DashBoardChallengeCardParticipation from './DashBoardChallengeCardParticipation';
import DashBoardChallengeCardRating from './DashBoardChallengeCardRating';

interface DashboardChallengeCardProps {
  challenge: TChallengeCard;
}

export default function DashboardChallengeCard({
  challenge,
}: DashboardChallengeCardProps) {
  const [borderClassArticle, setBorderClassArticle] = useState<string>('');

  // Valeurs alternatives
  const defaultChallenge = {
    id: 0,
    name: 'Défi en cours de création',
    isOpen: false,
    game: { name: 'Jeu inconnu' },
    category: { name: 'Catégorie inconnue' },
    level: { name: 'Niveau inconnu' },
  };

  const currentChallenge = challenge || defaultChallenge;
  return (
    <Link to={`/challenges/${currentChallenge.id}`}>
      <article className={`dashboard-challenge-card ${borderClassArticle}`}>
        <div className="dashboard-challenge-card__content">
          <div className="dashboard-challenge-card__content__details-container">
            <div className="dashboard-challenge-card__content__details__header">
              <header className="dashboard-challenge-card__content__details__header-container">
                <h3 className="dashboard-challenge-card__content__details__header-title">
                  {currentChallenge.name}
                </h3>
                <StatusLabel status={currentChallenge.isOpen} />
              </header>
              <div className="dashboard-challenge-card__content__details__infos">
                <p className="dashboard-challenge-card__content__details__infos-game">
                  jeu : {currentChallenge.game.name}
                </p>
                <p className="dashboard-challenge-card__content__details__infos-category">
                  catégorie : {currentChallenge.category.name}
                </p>
                <p className="dashboard-challenge-card__content__details__infos-level">
                  niveau : {currentChallenge.level.name}
                </p>
              </div>
            </div>
            <footer className="dashboard-challenge-card__content__details__footer">
              <DashBoardChallengeCardRating
                challengeId={currentChallenge.id}
                setBorderClassArticle={setBorderClassArticle}
              />
              <DashBoardChallengeCardParticipation
                challengeId={currentChallenge.id}
              />
            </footer>
          </div>
        </div>
      </article>
    </Link>
  );
}

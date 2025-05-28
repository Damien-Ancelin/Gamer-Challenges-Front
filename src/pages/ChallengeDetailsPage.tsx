import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { ChallengeCard as TChallengeCard } from '../@types';

import { useParams } from 'react-router';
import { useErrorHandler } from '../components/ErrorHandlerComponent';
import { useAuth } from '../contexts/AuthContext';

import { api } from '../services/api';

import altImg240 from '@/assets/images/alt-240px.webp';
import HandleParticipation from '../components/ChallengeDetailsPage/HandleParticipation';
import VoteChallenge from '../components/ChallengeDetailsPage/VoteChallenge';
import ProgressBar from '../components/ProgressBar';
import Loader from '../ui/Loader';
import StatusLabel from '../ui/StatusLabel';

export default function ChallengesDetailsPage() {
  // Hooks
  const { challengeId } = useParams();
  const { isAuthenticated } = useAuth();
  const handleError = useErrorHandler();

  // States
  const [challenge, setChallenge] = useState<TChallengeCard | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // ! Mockdata
  const defaultChallenge = {
    id: 0,
    name: 'Défi en cours de création',
    description: 'Description du défi en cours de création.',
    rules: 'Règles du défi en cours de création.',
    challengeImage: altImg240,
    isOpen: false,
    game: { name: 'Jeu inconnu' },
    category: { name: 'Catégorie inconnue' },
    level: { name: 'Niveau inconnu' },
  };

  const currentChallenge = challenge || defaultChallenge;

  useEffect(() => {
    setIsLoading(true);
    const Authenticated = isAuthenticated || false;
    const challenge_id = challengeId || '0';

    const fetchChallenge = async () => {
      try {
        const data = await api.getChallengeById(challenge_id);
        if (data) {
          setChallenge(data.challenge);
        }
        if (Authenticated) {
          const dataOwner = await api.getChallengeOwner(Number(challenge_id));
          if (dataOwner) {
            setIsOwner(dataOwner.isOwner);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
  }, [handleError, challengeId, isAuthenticated]);

  return (
    <>
      <Helmet>
        <title>
          Détails du Challenge {currentChallenge.name} | Gamer Challenges
        </title>
        <meta
          name="description"
          content={`Explorez les détails du challenge ${currentChallenge.name}, relevez le défi et partagez vos exploits avec la communauté sur Gamer Challenges.`}
        />
        <meta
          property="og:title"
          content={`Détails du Challenge ${currentChallenge.name} | Gamer Challenges`}
        />
        <meta
          property="og:description"
          content={`Découvrez les règles, les participants et les vidéos du challenge ${currentChallenge.name}. Participez et gagnez en popularité grâce aux votes de la communauté.`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.gamerchallenges.com/challenges/${currentChallenge.id}`}
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/logo.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/0-20.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/21-40.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/41-60.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/61-80.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/81-100.svg"
          type="image/svg+xml"
        />
      </Helmet>
      {/* Section de la page */}
      <section className="challenge-details-page">
        {!isLoading ? (
          <>
            <h1 className="challenge-details-page__title">Challenge</h1>
            <h2 className="challenge-details-page__sub-title">
              {currentChallenge.name}
            </h2>
            <div className="challenge-details-page__content">
              <aside className="challenge-details-page__aside">
                <img
                  className="challenge-details-page__aside__image"
                  src={altImg240}
                  alt="illustration du défi God of War no hit"
                  srcSet={`${altImg240} 240w`}
                  loading="lazy"
                />
                <div className="challenge-details-page__aside__infos">
                  <p className="challenge-details-page__aside__infos-game">
                    jeu : {currentChallenge.game.name}
                  </p>
                  <p className="challenge-details-page__aside__infos-category">
                    catégorie : {currentChallenge.category.name}
                  </p>
                  <p className="challenge-details-page__aside__infos-level">
                    niveau : {currentChallenge.level.name}
                  </p>
                </div>
                <div className="challenge-details-page__aside__rating-container">
                  <p
                    className="challenge-details-page__aside__rating"
                    aria-label="note en pourcentage du challenge"
                  >
                    45%
                  </p>
                  <ProgressBar rating={45} />
                </div>
                <p className="challenge-details-page__aside__participations">
                  42 participations
                </p>
                <StatusLabel status={true} />
              </aside>
              <div className="challenge-details-page__articles">
                <article className="challenge-details-page__article">
                  <h3 className="challenge-details-page__article__title">
                    description
                  </h3>
                  <p className="challenge-details-page__article__description">
                    {currentChallenge.description}
                  </p>
                </article>
                <article className="challenge-details-page__article">
                  <h3 className="challenge-details-page__article__title">
                    règles
                  </h3>
                  <p className="challenge-details-page__article__description">
                    {currentChallenge.rules}
                  </p>
                </article>
              </div>
            </div>
            <HandleParticipation
              isOwner={isOwner}
              isAuthenticated={isAuthenticated}
            />
            <VoteChallenge
              isAuthenticated={isAuthenticated}
              isOwner={isOwner}
            />
          </>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { ParticipationCard as TParticipationCard } from '../@types';

import { useParams } from 'react-router';
import { parseEmbedYoutubeUrl } from '../../utils/parseEmbedYoutubeUrl';
import { useErrorHandler } from '../components/ErrorHandlerComponent';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

import DetailsRating from '../components/ChallengeUserParticipationPage/DetailsRating';
import HandleActions from '../components/ChallengeUserParticipationPage/HandleActions';
import VoteParticipation from '../components/ChallengeUserParticipationPage/VoteParticipation';
import Loader from '../ui/Loader';

export default function ChallengeUserParticipationPage() {
  // Hooks
  const { participationId } = useParams();
  const handleError = useErrorHandler();
  const { isAuthenticated } = useAuth();

  // State
  const [participation, setParticipation] = useState<TParticipationCard | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // Update State
  const [ratingUpdated, setRatingUpdated] = useState<boolean>(false);
  const [participationUpdated, setParticipationUpdated] =
    useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const Authenticated = isAuthenticated || false;
    const participation_id = participationId || '0';

    const fetchParticipation = async () => {
      setIsLoading(true);
      try {
        const data = await api.getParticipationById(participation_id);
        if (data) {
          setParticipation(data.participation);
          setIsValidated(data.participation.isValidated);
        }
        if (Authenticated) {
          const dataOwner = await api.getParticipationOwner(
            Number(participation_id),
          );
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
        if (participationUpdated) {
          setParticipationUpdated(false);
        }
      }
    };

    fetchParticipation();
  }, [handleError, participationId, isAuthenticated, participationUpdated]);

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

  const youtubeEmbedURL: string | null = parseEmbedYoutubeUrl(
    currentParticipation.videoLink,
  );

  return (
    <>
      <Helmet>
        <title>{`${currentParticipation.challenge.name} par ${currentParticipation.user.username} | GamerChallenges`}</title>
        <meta
          name="description"
          content={`Regardez la participation de ${currentParticipation.user.username} au challenge ${currentParticipation.challenge.name}.`}
        />
        <meta property="og:title" content="Celeste Any% par JoeMaker95" />
        <meta
          property="og:description"
          content={`Participation au défi ${currentParticipation.challenge.name} sur GamerChallenges.`}
        />
        <meta property="og:type" content="video.other" />
        <meta property="og:video" content={youtubeEmbedURL || ''} />
      </Helmet>
      
      {/* Section part  */}
      <section className="challenge-user-participation-page">
        {!isLoading ? (
          <>
            <h1 className="challenge-user-participation-page__title">
              {currentParticipation.challenge.name}
            </h1>
            <h2 className="challenge-user-participation-page__sub-title">
              de {currentParticipation.user.username}
            </h2>

            {isValidated && youtubeEmbedURL ? (
              <div className="challenge-user-participation-page__content">
                <article className="challenge-user-participation-page__video-container">
                  <iframe
                    className="challenge-user-participation-page__content__video purple-border"
                    src={youtubeEmbedURL}
                    title={`YouTube video player du challenge ${currentParticipation.challenge.name} par ${currentParticipation.user.username}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                  <p className="challenge-user-participation-page__content__video-description secondary">
                    Vidéo de gameplay du challenge{' '}
                    <strong>{`${currentParticipation.challenge.name}`}</strong>{' '}
                    réalisée par {`${currentParticipation.user.username}`}.
                  </p>
                </article>
                <DetailsRating
                  participation_id={currentParticipation.id}
                  ratingUpdated={ratingUpdated}
                  setRatingUpdated={setRatingUpdated}
                />
              </div>
            ) : (
              <div className="challenge-user-participation-page__content">
                <p className="challenge-user-participation-page__content__not-video-description secondary">
                  La vidéo de participation n'est pas encore validée.
                </p>
              </div>
            )}

            <HandleActions
              isOwner={isOwner}
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              setParticipationUpdated={setParticipationUpdated}
              participation_id={currentParticipation.id}
              challengeId={currentParticipation.challengeId}
            />
            <VoteParticipation
              isOwner={isOwner}
              isValidated={isValidated}
              participation_id={currentParticipation.id}
              setRatingUpdated={setRatingUpdated}
            />
          </>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
}

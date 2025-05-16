import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HandleActions from '../components/ChallengeUserParticipationPage/HandleActions';
import VoteParticipation from '../components/ChallengeUserParticipationPage/VoteParticipation';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../contexts/AuthContext';

export default function ChallengeUserParticipationPage() {
  const [rating, setRating] = useState<number>(1);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [isAlreadyValidated, setIsAlreadyValidated] = useState<boolean>(false);

  // ! Mockdata pour les données reçu de l'API par la suite
  const { isAuthenticated } = useAuth();
  const isOwner = true;

  const youtubeURL = 'https://www.youtube.com/watch?v=q7iKIz1SXpU';
  const youtubeVideoId = youtubeURL.split('v=')[1];
  const youtubeEmbedURL = `https://www.youtube.com/embed/${youtubeVideoId}`;

  return (
    <>
      <Helmet>
        <title>Celeste Any% par JoeMaker95 | GamerChallenges</title>
        <meta
          name="description"
          content="Regardez la participation de JoeMaker95 au challenge Celeste Any%."
        />
        <meta property="og:title" content="Celeste Any% par JoeMaker95" />
        <meta
          property="og:description"
          content="Participation au défi Celeste Any% sur GamerChallenges."
        />
        <meta property="og:type" content="video.other" />
        <meta property="og:video" content={youtubeEmbedURL} />
      </Helmet>
      {/* Partie Section de la page */}
      <section className="challenge-user-participation-page">
        <h1 className="challenge-user-participation-page__title">
          celeste any %
        </h1>
        <h2 className="challenge-user-participation-page__sub-title">
          de JoeMaker95
        </h2>
        <div className="challenge-user-participation-page__content">
          <article className="challenge-user-participation-page__video-container">
            <iframe
              className="challenge-user-participation-page__content__video purple-border"
              src={youtubeEmbedURL}
              title="YouTube video player du challenge Celeste Any%"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
            <p className="challenge-user-participation-page__content__video-description secondary">
              Vidéo de gameplay du challenge <strong>Celeste Any %</strong>{' '}
              réalisée par JoeMaker95.
            </p>
          </article>
          <div className="challenge-user-participation-page__rating-container">
            <p
              className="challenge-user-participation-page__rating"
              aria-label="note en pourcentage du challenge"
            >
              45%
            </p>
            <ProgressBar rating={45} />
          </div>
        </div>

        {isOwner && isAuthenticated && (
          <HandleActions
            isAlreadyValidated={isAlreadyValidated}
            setIsAlreadyValidated={setIsAlreadyValidated}
          />
        )}

        {!isVoted && isAuthenticated && !isOwner && (
          <VoteParticipation
            rating={rating}
            setRating={setRating}
            setIsVoted={setIsVoted}
          />
        )}
      </section>
    </>
  );
}

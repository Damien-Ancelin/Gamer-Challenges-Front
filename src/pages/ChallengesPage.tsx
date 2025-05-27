import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { ChallengeCard as TChallengeCard } from '../@types';

import { useErrorHandler } from '../components/ErrorHandlerComponent';
import { api } from '../services/api';

import ChallengeCard from '../components/ChallengeCard/ChallengeCard';
import Loader from '../ui/Loader';

export default function ChallengesPage() {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [challenges, setChallenges] = useState<TChallengeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    limit: 10,
  });

  console.log(pagination);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await api.getChallenges(10, 1, 'createdAt', 'desc');
        if (data) {
          setChallenges(data.challenges);
          setPagination({
            currentPage: data.pagination.currentPage,
            totalPages: data.pagination.totalPages,
            limit: data.pagination.limit,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchChallenges();
  }, [handleError]);

  return (
    <>
      <Helmet>
        <title>Challenges | Gamer Challenges</title>
        <meta
          name="description"
          content="Découvrez les meilleurs challenges, partagez vos exploits en vidéo et grimpez dans les classements grâce aux votes de la communauté sur Gamer Challenges."
        />
        <meta property="og:title" content="Challenges | Gamer Challenges" />
        <meta
          property="og:description"
          content="Participez à des challenges passionnants, partagez vos vidéos et gagnez en popularité grâce aux votes de la communauté."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.gamerchallenges.com/challenges"
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
      <section className="challenges-page">
        <h1 className="challenges-page__title">Challenges</h1>
        {!isLoading ? (
          challenges?.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { ChallengeCard as TChallengeCard } from '../../@types';
import UserChallengePagination from '../../components/Account/UserChallengePage/UserChallengePagination';
import ChallengeCard from '../../components/ChallengeCard/ChallengeCard';
import { useErrorHandler } from '../../components/ErrorHandlerComponent';
import { api } from '../../services/api';
import Loader from '../../ui/Loader';

export default function UserChallengesPage() {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [userChallenges, setUserChallenges] = useState<TChallengeCard[]>([]);
  const [username, setUsername] = useState<string>('?');
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    limit: 10,
  });

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await api.getUserChallenges(10, 1, 'createdAt', 'desc');
        if (data) {
          setUserChallenges(data.challenges);
          setPagination({
            currentPage: data.pagination.currentPage,
            totalPages: data.pagination.totalPages,
            limit: data.pagination.limit,
          });
          const userData = await api.getUserData();
          if (userData) {
            setUsername(userData.user.username);
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
    fetchChallenges();
  }, [handleError]);

  return (
    <>
      <Helmet>
        <title>Challenges de {username} | Gamer Challenges</title>
        <meta
          name="description"
          content="Découvrez les défis relevés par cet utilisateur, visionnez ses vidéos, et votez pour ses meilleures performances sur Gamer Challenges."
        />
        <meta
          property="og:title"
          content="Challenges de l'utilisateur | Gamer Challenges"
        />
        <meta
          property="og:description"
          content="Explorez les challenges auxquels cet utilisateur a participé et soutenez ses exploits en votant pour ses vidéos."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.gamerchallenges.com/challenges/utilisateur"
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
        <h1 className="challenges-page__title">Mes challenges</h1>
        {!isLoading &&
          userChallenges?.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        {isLoading && <Loader />}
        {!isLoading && userChallenges.length === 0 && (
          <h4 className="challenges-page__no-challenges">
            Vous n'avez pas encore créer de challenge.
          </h4>
        )}
      </section>

      <UserChallengePagination
        pagination={pagination}
        setPagination={setPagination}
        setUserChallenges={setUserChallenges}
      />
    </>
  );
}

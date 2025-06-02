import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { ParticipationCard as TParticipationCard } from '../../@types';
import UserParticipationsPagination from '../../components/Account/UserParticipationsPage/UserParticipationsPagination';
import { useErrorHandler } from '../../components/ErrorHandlerComponent';
import ParticipationCard from '../../components/ParticipationCard';
import { api } from '../../services/api';
import Loader from '../../ui/Loader';

export default function UserParticipationsPage() {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [userParticipations, setUserParticipations] = useState<
    TParticipationCard[]
  >([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchParticipations = async () => {
      try {
        const data = await api.getUserParticipations(
          10,
          1,
          'updatedAt',
          'desc',
        );
        if (data) {
          setUserParticipations(data.participations);
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
    fetchParticipations();
  }, [handleError]);

  return (
    <>
      <Helmet>
        <title>Mes participations | Gamer Challenges</title>
        <meta
          name="description"
          content="Retrouvez toutes vos participations aux challenges. Regardez vos vidéos de vos exploits sur Gamer Challenges."
        />
        <meta
          property="og:title"
          content="Mes participations | Gamer Challenges"
        />
        <meta
          property="og:description"
          content="Découvrez vos vidéos sur différents challenges."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.gamerchallenges.com/users/:id/participations"
        />
      </Helmet>

      <section className="user-participations-pages">
        <h1 className="user-participations-pages__title">Mes participation</h1>
        <section className="user-participations-pages__container">
          {!isLoading &&
            userParticipations?.map((participation) => (
              <ParticipationCard
                key={participation.id}
                participation={participation}
              />
            ))}
          {isLoading && <Loader />}
          {!isLoading && userParticipations.length === 0 && (
            <h4 className="challenges-page__no-challenges">
              Vous n'avez pas encore de participations.
            </h4>
          )}
        </section>
      </section>

      <UserParticipationsPagination
        pagination={pagination}
        setPagination={setPagination}
        setUserParticipations={setUserParticipations}
      />
    </>
  );
}

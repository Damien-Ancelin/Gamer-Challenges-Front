import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { ParticipationCard as TParticipationCard } from '../@types';

import { useParams } from 'react-router';
import ChallengeParticipationsPagination from '../components/ChallengeParticipationsPage/ChallengeParticipationPagination';
import ChallengeParticipationCard from '../components/ChallengeParticipationsPage/ChallengeParticipationsCard';
import { useErrorHandler } from '../components/ErrorHandlerComponent';
import { api } from '../services/api';
import Loader from '../ui/Loader';

export default function ChallengeParticipationsPage() {
  // Hooks
  const { challengeId } = useParams();
  const handleError = useErrorHandler();

  // State
  const [participations, setParticipations] = useState<TParticipationCard[]>(
    [],
  );
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!challengeId) {
      return;
    }
    const numberChallengeId = Number(challengeId);
    setIsLoading(true);

    const fetchParticipations = async () => {
      try {
        const data = await api.getChallengeParticipations(
          numberChallengeId,
          10,
          1,
          'createdAt',
          'desc',
        );
        if (data) {
          setParticipations(data.participations);
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
  }, [challengeId, handleError]);

  const currentChallengeId = Number(challengeId) || 0;

  return (
    <>
      <Helmet>
        <title>Participations au challenge | Gamer Challenges</title>
        <meta
          name="description"
          content="Découvrez les vidéos des participants à ce challenge, soutenez-les avec vos votes et inspirez-vous de leurs exploits sur Gamer Challenges."
        />
        <meta
          property="og:title"
          content="Participations au challenge | Gamer Challenges"
        />
        <meta
          property="og:description"
          content="Visionnez les participations à ce challenge, votez pour vos vidéos préférées et participez à votre tour !"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.gamerchallenges.com/challenges/:id/participations"
        />
      </Helmet>
      <section className="challenge-participations">
        <h1 className="challenge-participations__title">participation</h1>
        {participations.length > 0 && (
          <h2 className="challenge-participations__sub-title">
            {participations[0].challenge.name}
          </h2>
        )}
        <section className="challenge-participations__container">
          {!isLoading &&
            participations?.map((participation) => (
              <ChallengeParticipationCard
                key={participation.id}
                participation={participation}
              />
            ))}
          {isLoading && <Loader />}
        </section>
        {!isLoading && participations.length === 0 && (
          <h4 className="user-participations-pages__no-participations">
            Pas encore de participations pour ce challenge.
          </h4>
        )}
      </section>

      <ChallengeParticipationsPagination
        challengeId={currentChallengeId}
        pagination={pagination}
        setPagination={setPagination}
        setParticipations={setParticipations}
      />
    </>
  );
}

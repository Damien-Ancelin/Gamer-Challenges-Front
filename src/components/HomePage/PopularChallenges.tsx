import { useEffect, useState } from 'react';
import type { ChallengeCard as TChallengeCard } from '../../@types';

import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

import Loader from '../../ui/Loader';
import ChallengeCard from '../ChallengeCard/ChallengeCard';

export default function PopularChallenges() {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [challenges, setChallenges] = useState<TChallengeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await api.getPopularChallenges(5, 1);
        if (data) {
          setChallenges(data.challenges);
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
    <section className="popular-challenges">
      <h2>challenges populaires</h2>
      {!isLoading ? (
        challenges?.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))
      ) : (
        <Loader />
      )}
    </section>
  );
}

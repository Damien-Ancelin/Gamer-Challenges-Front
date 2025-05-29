import { useEffect, useState } from 'react';
import type { ParticipationCard as TParticipationCard } from '../../@types';

import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

import Loader from '../../ui/Loader';
import ParticipationCard from '../ParticipationCard';

export default function LastParticipatons() {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [participations, setParticipations] = useState<TParticipationCard[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const data = await api.getParticipations(6, 1, 'updatedAt', 'desc');
        if (data) {
          setParticipations(data.participations);
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
    <section className="last-participations">
      <h2>les dernières participations</h2>
      <section className="last-participations__container">
        {!isLoading ? (
          participations?.map((participation) => (
            <ParticipationCard
              key={participation.id}
              participation={participation}
            />
          ))
        ) : (
          <Loader />
        )}
      </section>
    </section>
  );
}

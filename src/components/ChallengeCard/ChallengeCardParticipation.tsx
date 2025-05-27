import { useEffect, useState } from 'react';
import type { ParticipationReview as TParticipationReview } from '../../@types';

import { api } from '../../services/api';
import Loader from '../../ui/Loader';
import { useErrorHandler } from '../ErrorHandlerComponent';

interface ChallengeCardParticipationProps {
  challengeId: number;
}

export default function ChallengeCardParticipation({
  challengeId,
}: ChallengeCardParticipationProps) {
  // Hooks
  const handleError = useErrorHandler();

  const [participationIsLoading, setParticipationIsLoading] = useState(false);

  const [nbParticipation, setNbParticipation] = useState<TParticipationReview>({
    participationCounts: 0,
  });

  useEffect(() => {
    const fetchParticipationCount = async () => {
      setParticipationIsLoading(true);
      try {
        const data = await api.getParticipationCountByChallengeId(challengeId);
        if (data) {
          setNbParticipation(data.participationReview);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setParticipationIsLoading(false);
      }
    };
    fetchParticipationCount();
  }, [handleError, challengeId]);

  return (
    <>
      {participationIsLoading && <Loader />}
      {!participationIsLoading && (
        <p className="challenge-card__content__details__participations">
          {nbParticipation.participationCounts} participations
        </p>
      )}
    </>
  );
}

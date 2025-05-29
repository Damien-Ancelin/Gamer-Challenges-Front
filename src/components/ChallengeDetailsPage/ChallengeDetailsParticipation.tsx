import { useEffect, useState } from 'react';
import type { ParticipationReviewCount as TParticipationReviewCount } from '../../@types';

import { api } from '../../services/api';
import Loader from '../../ui/Loader';
import { useErrorHandler } from '../ErrorHandlerComponent';

interface ChallengeDetailsParticipationProps {
  challenge_id: number;
  participationUpdated: boolean;
  setParticipationUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChallengeDetailsParticipation({
  challenge_id,
  participationUpdated,
  setParticipationUpdated,
}: ChallengeDetailsParticipationProps) {
  // Hooks
  const handleError = useErrorHandler();

  const [participationIsLoading, setParticipationIsLoading] = useState(false);
  const [nbParticipation, setNbParticipation] =
    useState<TParticipationReviewCount>({
      participationCounts: 0,
    });

  useEffect(() => {
    setParticipationIsLoading(true);
    const fetchParticipationCount = async () => {
      try {
        const data = await api.getParticipationCountByChallengeId(challenge_id);
        if (data) {
          setNbParticipation(data.participationReview);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setParticipationIsLoading(false);
        if (participationUpdated) {
          setParticipationUpdated(false);
        }
      }
    };
    fetchParticipationCount();
  }, [
    handleError,
    challenge_id,
    participationUpdated,
    setParticipationUpdated,
  ]);

  return (
    <>
      {participationIsLoading && <Loader />}
      {!participationIsLoading && (
        <p className="challenge-details-page__aside__participations">
          {nbParticipation.participationCounts} participations
        </p>
      )}
    </>
  );
}

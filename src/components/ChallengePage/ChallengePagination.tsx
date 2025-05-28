import type { ChallengeCard as TChallengeCard } from '../../@types';
import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

interface ChallengesPaginationProps {
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      totalPages: number;
      limit: number;
    }>
  >;
  setChallenges: React.Dispatch<React.SetStateAction<TChallengeCard[]>>;
}

export default function ChallengesPagination({
  pagination,
  setPagination,
  setChallenges,
}: ChallengesPaginationProps) {
  // Hooks
  const handleError = useErrorHandler();

  const loadMoreChallenges = async () => {
    try {
      const nextPage = pagination.currentPage + 1;
      const data = await api.getChallenges(
        pagination.limit,
        nextPage,
        'createdAt',
        'desc',
      );
      if (data) {
        setChallenges((currentChallenges) => [
          ...currentChallenges,
          ...data.challenges,
        ]);
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
    }
  };
  return (
    <>
      {pagination.currentPage < pagination.totalPages && (
        <button
          type="button"
          className="challenges-page__load-more button button--blue-border"
          onClick={loadMoreChallenges}
        >
          Charger plus de challenges
        </button>
      )}
    </>
  );
}

import type { ParticipationCard as TParticipationCard } from '../../../@types';
import { api } from '../../../services/api';
import { useErrorHandler } from '../../ErrorHandlerComponent';

interface UserParticipationsPaginationProps {
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
  setUserParticipations: React.Dispatch<
    React.SetStateAction<TParticipationCard[]>
  >;
}

export default function UserParticipationsPagination({
  pagination,
  setPagination,
  setUserParticipations,
}: UserParticipationsPaginationProps) {
  // Hooks
  const handleError = useErrorHandler();

  const loadMoreParticipations = async () => {
    try {
      const nextPage = pagination.currentPage + 1;
      const data = await api.getUserParticipations(
        pagination.limit,
        nextPage,
        'createdAt',
        'desc',
      );
      if (data) {
        setUserParticipations((currentParticipations) => [
          ...currentParticipations,
          ...data.participations,
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
          onClick={loadMoreParticipations}
        >
          Charger plus de participations
        </button>
      )}
    </>
  );
}

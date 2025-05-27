import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { useErrorHandler } from '../ErrorHandlerComponent';

interface FinalButtonProps {
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActivatedDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FinalButton({
  setIsConfirmed,
  setIsActivatedDelete,
  setIsLoading,
}: FinalButtonProps) {
  const { setIsAuthenticated } = useAuth();
  const handleError = useErrorHandler();
  const navigate = useNavigate();

  const handleClickDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const data = await api.deleteUserAccount();
      if (data.success) {
        toast.success(data.message);
        setIsAuthenticated(false);
        setIsConfirmed(false);
        setIsActivatedDelete(false);
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        await handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="button button--alert-border"
      title="Confirmer la suppression de votre compte"
      aria-label="Confirmer la suppression de mon compte"
      onMouseLeave={() => {
        setIsConfirmed(false);
        setIsActivatedDelete(false);
      }}
      onClick={handleClickDeleteAccount}
    >
      supprimer mon compte
    </button>
  );
}

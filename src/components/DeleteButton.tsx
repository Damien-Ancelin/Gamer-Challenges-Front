import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import Loader from '../ui/Loader';
import { useErrorHandler } from './ErrorHandlerComponent';

interface DeleteButtonProps {
  isActivatedDelete: boolean;
  setIsActivatedDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteButton({
  isActivatedDelete,
  setIsActivatedDelete,
}: DeleteButtonProps) {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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

  const handleClickWithDelay = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
      setIsConfirmed(true);
    }, 3000);
  };

  return (
    <>
      {!isActivatedDelete && (
        <button
          type="button"
          className="button button--blue-border"
          title="Supprimer votre compte"
          aria-label="Supprimer mon compte"
          onClick={() => setIsActivatedDelete(true)}
        >
          supprimer mon compte
        </button>
      )}

      {isActivatedDelete && !isConfirmed && (
        <button
          type="button"
          className={
            !isDisabled
              ? 'button button--orange-border'
              : 'button button--alert-border'
          }
          title="Cette action est irréversible, vous ne pourrez pas récupérer votre compte."
          aria-label="Confirmer la suppression de votre compte"
          disabled={isDisabled}
          onClick={() => handleClickWithDelay()}
        >
          {isDisabled ? 'action irréversible' : 'supprimer mon compte ?'}
        </button>
      )}

      {isConfirmed && !isLoading && (
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
      )}

      {isLoading && <Loader />}
    </>
  );
}

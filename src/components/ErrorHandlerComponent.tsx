import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const isProduction = import.meta.env.VITE_ENV === 'production';

export function useErrorHandler() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleError = useCallback(
    async (error: Error) => {
      const match = error.message.match(/^Error (\d+): (.+)$/);
      if (match) {
        const statusCode = Number.parseInt(match[1], 10);

        if (statusCode === 401) {
          try {
            const data = await api.authRefreshToken();
            if (data.success) {
              toast.success('Vous avez été reconnecté, merci de recommencer');
              setIsAuthenticated(true);
              navigate(0);
              return;
            }
          } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false);
            await api.authLogout();
            navigate('/');
          }
        }
        const message = match[2];
        if (!isProduction) {
          console.error('Error:', error);
        }
        toast.error(message);
      } else {
        if (!isProduction) {
          console.error('Error:', error);
        }
        toast.error('Une erreur est survenue');
      }
    },
    [setIsAuthenticated, navigate],
  );

  return handleError;
}

import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export function useErrorHandler() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleError = async (error: Error) => {
    const match = error.message.match(/^Error (\d+): (.+)$/);
    if (match) {
      const statusCode = Number.parseInt(match[1], 10);
      if (statusCode === 401) {
        try {
          const data = await api.authRefreshToken();
          if (data.success) {
            toast.success('Vous avez été reconnecté, merci de recommencer');
            setIsAuthenticated(true);
            return;
          }
        } catch (error) {
          console.error('Error:', error);
          await api.authLogout();
          setIsAuthenticated(false);
          navigate('/');
        }
      }
      const message = match[2];
      toast.error(message);
    } else {
      toast.error('Une erreur est survenue');
    }
  };

  return handleError;
}

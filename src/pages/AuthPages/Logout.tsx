import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

import { toast } from 'react-toastify';
import { useErrorHandler } from '../../components/ErrorHandlerComponent';
import { api } from '../../services/api';

export default function Logout() {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const logout = async () => {
      try {
        const data = await api.authLogout();
        if (data) {
          setIsAuthenticated(false);
          toast.success(data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        navigate('/');
      }
    };
    logout();
  }, [setIsAuthenticated, navigate, handleError]);

  return null;
}

import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
//import { useAuth } from '../contexts/AuthContext'

export default function AuthGuard() {
  const navigate = useNavigate();
  //const { isAuthenticated } = useAuth()
  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/authentification/connexion');
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
}

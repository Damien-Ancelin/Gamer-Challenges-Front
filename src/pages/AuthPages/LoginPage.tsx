import { useState } from 'react';

import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import LoginImage250px from '@/assets/images/alt-240px.webp';
import LoginImage150px from '@/assets/images/log-register-150px.webp';
import Loader from '../../ui/Loader';

export default function LoginPage() {
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    if (typeof email !== 'string' || typeof password !== 'string') {
      return;
    }

    try {
      const data = await api.authLogin(email, password);
      if (data) {
        setIsAuthenticated(true);
      }
    } catch (_error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      <img
        className="login-page__image"
        src={LoginImage150px}
        alt=""
        srcSet={`${LoginImage150px} 150w, ${LoginImage250px} 250w`}
        sizes="(max-width: 768px) 150px, 250px"
        loading="lazy"
      />
      <form onSubmit={handleLoginSubmit} className="form">
        <div className="form__entry">
          <label className="form--label" htmlFor="email">
            email
          </label>
          <input
            id="email"
            name="email"
            placeholder="monemail@mail.io"
            className="input input--border"
            type="email"
            required
            aria-required="true"
          />
        </div>
        <div className="form__entry">
          <label className="form--label" htmlFor="password">
            mot de passe
          </label>
          <input
            id="password"
            name="password"
            placeholder="********"
            className="input input--border"
            type="password"
            required
            aria-required="true"
          />
        </div>
        {!loading ? (
          <button type="submit" className="button button--blue-border">
            se connecter
          </button>
        ) : (
          <Loader />
        )}
      </form>
      <Link to="/" className="login-page__link-forgotten-password">
        Mot de passe oublié ?
      </Link>
      <div className="login-page__register">
        <p className="login-page__register__text">pas encore de compte ?</p>
        <Link to="/register" className="login-page__register__link">
          inscrivez-vous
        </Link>
      </div>
    </div>
  );
}

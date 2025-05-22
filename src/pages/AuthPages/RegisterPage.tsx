import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import RegisterImage150px from '@/assets/images/log-register-150px.webp';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useErrorHandler } from '../../components/ErrorHandlerComponent';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import Loader from '../../ui/Loader';

export default function RegisterPage() {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const lastname = formData.get('lastname');
    const firstname = formData.get('firstname');
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');

    if (
      typeof lastname !== 'string' ||
      typeof firstname !== 'string' ||
      typeof email !== 'string' ||
      typeof username !== 'string' ||
      typeof password !== 'string'
    ) {
      return;
    }

    try {
      const data = await api.authRegister(
        lastname,
        firstname,
        email,
        username,
        password,
      );
      if (data) {
        setIsAuthenticated(true);
        toast.success(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        await handleError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Inscription | Gamer Challenges</title>
        <meta
          name="description"
          content="Inscrivez-vous sur GamerChallenges pour participer à des défis gaming, partager vos vidéos et rejoindre la communauté des gamers."
        />
        <meta property="og:title" content="Inscription | Gamer Challenges" />
        <meta
          property="og:description"
          content="Inscrivez-vous sur GamerChallenges pour participer à des défis gaming, partager vos vidéos et rejoindre la communauté des gamers."
        />
        <meta
          property="og:image"
          content="/assets/images/log-register-150px.webp"
        />
        <meta property="og:image" content="/assets/images/alt-240px.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/images/log-register-150px.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/alt-240px.webp"
          type="image/webp"
        />
      </Helmet>
      <div className="register-page">
        <h1>inscription</h1>
        <img
          className="register-page__image"
          src={RegisterImage150px}
          alt=""
          srcSet={`${RegisterImage150px} 150w, $RegisterImage250px250w`}
          sizes="(max-width: 768px) 150px, 250px"
          loading="lazy"
        />
        <form onSubmit={handleRegisterSubmit} className="form">
          <div className="form__entry">
            <label className="form--label" htmlFor="lastname">
              Nom
            </label>
            <input
              id="lastname"
              name="lastname"
              placeholder="Doe"
              className="input input--border"
              type="text"
              required
              aria-required="true"
            />
          </div>
          <div className="form__entry">
            <label className="form--label" htmlFor="firstname">
              Prénom
            </label>
            <input
              id="firstname"
              name="firstname"
              placeholder="John"
              className="input input--border"
              type="text"
              required
              aria-required="true"
            />
          </div>
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
            <label className="form--label" htmlFor="username">
              nom d'utilisateur
            </label>
            <input
              id="username"
              name="username"
              placeholder="John_Doe215"
              className="input input--border"
              type="text"
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
        <div className="register-page__login">
          <p className="register-page__login__text">déjà un compte ?</p>
          <Link
            to="/authentification/connexion"
            className="register-page__login__link"
          >
            connectez-vous
          </Link>
        </div>
      </div>
    </>
  );
}

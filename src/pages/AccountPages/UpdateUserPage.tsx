import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useNavigate } from 'react-router';
import { useErrorHandler } from '../../components/ErrorHandlerComponent';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import altImg240 from '@/assets/images/alt-240px.webp';
import DeleteAccountButton from '../../components/DeleteAccountButton/DeleteAccountButton';
import Loader from '../../ui/Loader';

export default function UpdateUserPage() {
  // Hook
  const { isAuthenticated } = useAuth();
  const handleError = useErrorHandler();
  const navigate = useNavigate();

  // State
  const [isloading, setisLoading] = useState(false);
  const [dataUserIsloading, setDataUserIsLoading] = useState(false);

  // Form state
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [formUserData, setFormUserData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setDataUserIsLoading(true);
    const getUser = async () => {
      try {
        const data = await api.getUserData();
        if (data) {
          setFormUserData({
            lastname: data.user.lastname,
            firstname: data.user.firstname,
            email: data.user.email,
            username: data.user.username,
            password: '',
          });
          setAvatar(data.user.avatar);
          setDataUserIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setDataUserIsLoading(false);
      }
    };
    getUser();
  }, [handleError]);

  const handleUpdateUserSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setisLoading(true);
    const formData = new FormData(event.currentTarget);
    const lastname = formData.get('lastname');
    const firstname = formData.get('firstname');
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const avatar = fileAvatar || null;

    if (
      typeof lastname !== 'string' ||
      typeof firstname !== 'string' ||
      typeof email !== 'string' ||
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      (avatar !== null && !(avatar instanceof File))
    ) {
      await handleError(
        new Error('Format de données invalide. Vérifiez vos informations.'),
      );
      setisLoading(false);
      return;
    }

    const sanitizedLastname = DOMPurify.sanitize(lastname.trim());
    const sanitizedFirstname = DOMPurify.sanitize(firstname.trim());
    const sanitizedEmail = DOMPurify.sanitize(email.trim());
    const sanitizedUsername = DOMPurify.sanitize(username.trim());
    const sanitizedPassword = DOMPurify.sanitize(password.trim());

    const sanitizedFormData = new FormData();
    sanitizedFormData.append('lastname', sanitizedLastname);
    sanitizedFormData.append('firstname', sanitizedFirstname);
    sanitizedFormData.append('email', sanitizedEmail);
    sanitizedFormData.append('username', sanitizedUsername);
    sanitizedFormData.append('password', sanitizedPassword);

    if (avatar) {
      sanitizedFormData.append('avatar', avatar);
    }

    try {
      const data = await api.updateUserData(sanitizedFormData);
      if (data) {
        setFormUserData({
          lastname: data.user.lastname,
          firstname: data.user.firstname,
          email: data.user.email,
          username: data.user.username,
          password: '',
        });
        setAvatar(data.user.avatar);
        navigate('/compte');
      }
    } catch (error) {
      if (error instanceof Error) {
        await handleError(error);
      }
    } finally {
      setisLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Modifier mon profil | Gamer Challenges</title>
        <meta
          name="description"
          content="Modifiez vos informations personnelles et mettez à jour votre avatar sur GamerChallenges."
        />
        <meta
          property="og:title"
          content="Modifier mon profil | Gamer Challenges"
        />
        <meta
          property="og:description"
          content="Modifiez vos informations personnelles et mettez à jour votre avatar sur GamerChallenges."
        />
        <meta property="og:image" content="/assets/images/alt-240px.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/images/alt-240px.webp"
          type="image/webp"
        />
      </Helmet>
      <section className="update-user">
        <h1 className="update-user__title">Modifier mon profil</h1>
        <article className="update-user__card">
          {!dataUserIsloading ? (
            <form
              onSubmit={handleUpdateUserSubmit}
              className="update-user__form form"
            >
              <div className="update-user__form-container">
                {avatar ? (
                  <img
                    className="update-user__image"
                    src={avatar}
                    alt="Avatar de profil"
                    loading="lazy"
                  />
                ) : (
                  <img
                    className="update-user__image"
                    src={altImg240}
                    alt="Avatar de profil alternatif"
                    loading="lazy"
                  />
                )}
                <div className="update-user__form__container-first">
                  <div className="update-user__form--entry-bloc form__entry">
                    <label className="form--label" htmlFor="lastname">
                      Nom
                    </label>
                    <input
                      id="lastname"
                      name="lastname"
                      placeholder="Doe"
                      className="input input--border"
                      type="text"
                      value={formUserData.lastname}
                      onChange={(e) =>
                        setFormUserData({
                          ...formUserData,
                          lastname: e.target.value,
                        })
                      }
                      aria-required="false"
                    />
                  </div>
                  <div className="update-user__form--entry-bloc form__entry">
                    <label className="form--label" htmlFor="firstname">
                      Prénom
                    </label>
                    <input
                      id="firstname"
                      name="firstname"
                      placeholder="John"
                      className="input input--border"
                      type="text"
                      value={formUserData.firstname}
                      onChange={(e) =>
                        setFormUserData({
                          ...formUserData,
                          firstname: e.target.value,
                        })
                      }
                      aria-required="false"
                    />
                  </div>
                  <div className="update-user__form--entry-bloc form__entry">
                    <label className="form--label" htmlFor="email">
                      email
                    </label>
                    <input
                      id="email"
                      name="email"
                      placeholder="monemail@mail.io"
                      className="input input--border"
                      type="email"
                      value={formUserData.email}
                      onChange={(e) =>
                        setFormUserData({
                          ...formUserData,
                          email: e.target.value,
                        })
                      }
                      aria-required="false"
                    />
                  </div>
                </div>
                <div className="update-user__form__container-second">
                  <div className="update-user__form--entry-bloc form__entry">
                    <label className="form--label" htmlFor="username">
                      nom d'utilisateur
                    </label>
                    <input
                      id="username"
                      name="username"
                      placeholder="John_Doe215"
                      className="input input--border"
                      type="text"
                      value={formUserData.username}
                      onChange={(e) =>
                        setFormUserData({
                          ...formUserData,
                          username: e.target.value,
                        })
                      }
                      aria-required="false"
                    />
                  </div>
                  <div className="update-user__form--entry-bloc form__entry">
                    <label className="form--label" htmlFor="password">
                      mot de passe
                    </label>
                    <input
                      id="password"
                      name="password"
                      placeholder="********"
                      className="input input--border"
                      type="password"
                      value={formUserData.password}
                      onChange={(e) =>
                        setFormUserData({
                          ...formUserData,
                          password: e.target.value,
                        })
                      }
                      aria-required="false"
                    />
                  </div>
                  <div className="update-user__form--entry-bloc form__entry">
                    <label className="form--label" htmlFor="avatar">
                      avatar
                    </label>
                    <input
                      id="avatar"
                      name="avatar"
                      placeholder="********"
                      className="input input--file"
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        setFileAvatar(file);
                      }}
                      aria-required="false"
                    />
                  </div>
                </div>
              </div>

              <div className="update-user__form__button-container">
                {!isloading ? (
                  <>
                    <button
                      type="submit"
                      className="button button--orange-border"
                    >
                      envoyer
                    </button>
                    <DeleteAccountButton />
                  </>
                ) : (
                  <Loader />
                )}
              </div>
            </form>
          ) : (
            <Loader />
          )}
        </article>
      </section>
    </>
  );
}

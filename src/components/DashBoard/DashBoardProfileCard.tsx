import altImg100 from '@/assets/images/alt-100px.webp';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { api } from '../../services/api';
import Loader from '../../ui/Loader';
import { useErrorHandler } from '../ErrorHandlerComponent';

export default function DashBoardProfileCard() {
  const handleError = useErrorHandler();
  const [isloading, setisLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    setisLoading(true);
    const getUser = async () => {
      try {
        const data = await api.getUserData();
        if (data) {
          setUserData({
            lastname: data.user.lastname,
            firstname: data.user.firstname,
            email: data.user.email,
            username: data.user.username,
          });
          setAvatar(data.user.avatar);
          setisLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setisLoading(false);
      }
    };
    getUser();
  }, [handleError]);

  return (
    <article className="dashboard-profile-card">
      {!isloading ? (
        <>
          <div className="dashboard-profile-card__infos-container">
            {avatar ? (
              <img
                className="dashboard-profile-card__image"
                src={avatar}
                alt="Avatar de profil"
                loading="lazy"
              />
            ) : (
              <img
                className="dashboard-profile-card__image"
                src={altImg100}
                alt="Avatar de profil alternatif"
                loading="lazy"
              />
            )}

            <div className="dashboard-profile-card__content">
              <span className="dashboard-profile-card__content-owner">
                {userData.username}
              </span>
              <div className="dashboard-profile-card__content__info">
                <p>{userData.lastname}</p>
                <p>{userData.firstname}</p>
              </div>
              <p className="dashboard-profile-card__content-email">
                {userData.email}
              </p>
            </div>
          </div>
          <div className="dashboard-profile-card__button-container">
            <Link to="modifier-compte">
              <button
                className="dashboard-profile-card__button button button--orange-border"
                type="button"
              >
                modifier
              </button>
            </Link>
            <Link to="/authentification/logout">
              <button
                className="dashboard-profile-card__button button button--alert-border"
                type="button"
              >
                se déconnecter
              </button>
            </Link>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </article>
  );
}

import altImg100 from '@/assets/images/alt-100px.webp';
import { Link } from 'react-router';

export default function DashBoardProfileCard() {
  return (
    <article className="dashboard-profile-card">
      <div className="dashboard-profile-card__infos-container">
        <img
          className="dashboard-profile-card__image"
          src={altImg100}
          alt="Avatar de profil alternatif"
          loading="lazy"
        />
        <div className="dashboard-profile-card__content">
          <span className="dashboard-profile-card__content-owner">
            username
          </span>
          <div className="dashboard-profile-card__content__info">
            <p>Delafayette</p>
            <p>Jean-eud</p>
          </div>
          <p className="dashboard-profile-card__content-email">
            delafayette.jeaneud@mail.io
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
    </article>
  );
}

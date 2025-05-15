import logo from '@/assets/svg/logo.svg';
import { BiLogoTwitch } from 'react-icons/bi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';

export default function FooterDesktop() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="footer-desktop">
        <div className="footer-desktop__top-container">
          <div className="footer-desktop__logo">
            <img
              className="footer-desktop__logo__image"
              src={logo}
              alt="Trophé avec dégradé de couleurs"
            />
            <h2 className="footer-desktop__logo__title">gamer challenges</h2>
            <p className="footer-desktop__logo__tagline">Relevez des défis.</p>
            <p className="footer-desktop__logo__tagline">Montrez vos skills.</p>
            <p className="footer-desktop__logo__tagline">
              Grimpez au classement.
            </p>
          </div>
          <div
            className="footer-desktop__legal"
            aria-label="Informations légales"
          >
            <div className="footer-desktop__legal__container">
              <h3 className="footer-desktop__legal__title">à propos</h3>
              <ul className="footer-desktop__legal__list">
                <li className="footer-desktop__legal__list__item">
                  <Link to="/" aria-label="contact">
                    <span className="footer-desktop__legal__list__item-span">
                      infos et contacts
                    </span>
                  </Link>
                </li>
                <li className="footer-desktop__legal__list__item">
                  <Link to="/" aria-label="politique de confidentialité">
                    <span className="footer-desktop__legal__list__item-span">
                      politique de cookies
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-desktop__legal__container">
              <h3 className="footer-desktop__legal__title">
                informations légales
              </h3>
              <ul className="footer-desktop__legal__list">
                <li className="footer-desktop__legal__list__item">
                  <Link to="/" aria-label="Mentions légales">
                    <span className="footer-desktop__legal__list__item-span">
                      Mentions légales
                    </span>
                  </Link>
                </li>
                <li className="footer-desktop__legal__list__item">
                  <Link to="/" aria-label="conditions générales d'utilisation">
                    <span className="footer-desktop__legal__list__item-span">
                      Conditions Générales
                    </span>
                  </Link>
                </li>
                <li className="footer-desktop__legal__list__item">
                  <Link
                    to="/"
                    aria-label="règlement général de protection des données"
                  >
                    <span className="footer-desktop__legal__list__item-span">
                      RGPD
                    </span>
                  </Link>
                </li>
                <li className="footer-desktop__legal__list__item">
                  <Link
                    to="/"
                    aria-label="Déclaration d'accessibilité : non conforme"
                  >
                    <span className="footer-desktop__legal__list__item-span">
                      Accessibilité: non conforme
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-desktop__infos">
          <div className="footer-desktop__infos__social-media">
            <FaFacebookF
              size={28}
              color="#00CFFF"
              aria-label="Accéder à la page Facebook"
            />
            <FaInstagram
              size={32}
              color="#3A91FF"
              aria-label="Accéder à la page Instagram"
            />
            <FaYoutube
              size={32}
              color="#FF2DCB"
              aria-label="Accéder à la page Youtube"
            />
            <BiLogoTwitch
              size={32}
              color="#8A00FF"
              aria-label="Accéder à la page Twitch"
            />
          </div>
          <p>© {year} Gamer Challenges</p>
        </div>
      </footer>
    </>
  );
}

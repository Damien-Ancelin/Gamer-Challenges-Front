import { useEffect, useRef } from 'react';
import { BiLogoTwitch } from 'react-icons/bi';
import { CgLogOut } from 'react-icons/cg';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { GoHome, GoTrophy } from 'react-icons/go';
import { LuCircleUser, LuJoystick } from 'react-icons/lu';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

interface BurgerMenuProps {
  closeMenu: () => void;
}

export default function BurgerMenu({ closeMenu }: BurgerMenuProps) {
  const { isAuthenticated } = useAuth();
  // 1. create a ref with initial value "null"
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        burgerMenuRef.current &&
        // 3. Check if the clicked element are a child of the burger menu (parent)
        // If i'm clicking on child of the burger menu, i don't want to close it
        // else if the clicked element is not a child of the burger menu, it closes
        // Js function => parent.contains(child)
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu]);
  return (
    <>
      <nav
        // 2. define the burger nav as a ref
        ref={burgerMenuRef}
        className="burger-menu burger-menu__nav"
        aria-label="Navigation mobile via menu"
      >
        <ul className="burger-menu__nav-list">
          <li className="burger-menu__nav-list__item">
            <NavLink to="/" onClick={closeMenu}>
              <GoHome
                aria-label="Retour à l'accueil"
                size={32}
                color="#00CFFF"
              />
              <span className="burger-menu__nav-list__item-span">accueil</span>
            </NavLink>
          </li>
          <li className="burger-menu__nav-list__item">
            <NavLink to="/challenges" onClick={closeMenu}>
              <GoTrophy
                aria-label="Accéder à la page des défis"
                size={32}
                color="#3A91FF"
              />
              <span className="burger-menu__nav-list__item-span">
                challenges
              </span>
            </NavLink>
          </li>
          <li className="burger-menu__nav-list__item">
            <NavLink to="/leaderboard" onClick={closeMenu}>
              <MdOutlineLeaderboard
                aria-label="Accéder à la page des classements"
                size={32}
                color="#8A00FF"
              />
              <span className="burger-menu__nav-list__item-span">
                leaderboard
              </span>
            </NavLink>
          </li>
          <li className="burger-menu__nav-list__item">
            <NavLink to="/jeux" onClick={closeMenu}>
              <LuJoystick
                aria-label="Accéder à la page des jeux"
                size={32}
                color="#FF2DCB"
              />
              <span className="burger-menu__nav-list__item-span">jeux</span>
            </NavLink>
          </li>
          <li className="burger-menu__nav-list__item">
            <NavLink to="/compte" className="no-active" onClick={closeMenu}>
              <LuCircleUser
                aria-label="Aller à la page de connexion ou au compte utilisateur"
                size={32}
                color="#DDAD33"
              />
              <span className="burger-menu__nav-list__item-span">
                {isAuthenticated ? 'mon compte' : 'connexion'}
              </span>
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className="burger-menu__nav-list__item">
              <NavLink
                to="/authentification/logout"
                className="no-active"
                onClick={closeMenu}
              >
                <CgLogOut
                  aria-label="Se déconnecter"
                  size={32}
                  color="#FF6A00"
                />
                <span className="burger-menu__nav-list__item-span">
                  Se déconnecter
                </span>
              </NavLink>
            </li>
          )}
        </ul>

        <div className="burger-menu__footer" aria-label="Informations légales">
          <h3 className="burger-menu__footer__title">à propos</h3>
          <ul className="burger-menu__footer__list">
            <li className="burger-menu__footer__list__item">
              <Link to="/" aria-label="contact" onClick={closeMenu}>
                <span className="burger-menu__footer__list__item-span">
                  infos et contacts
                </span>
              </Link>
            </li>
            <li className="burger-menu__footer__list__item">
              <Link
                to="/"
                aria-label="politique de confidentialité"
                onClick={closeMenu}
              >
                <span className="burger-menu__footer__list__item-span">
                  politique de cookies
                </span>
              </Link>
            </li>
          </ul>
          <h3 className="burger-menu__footer__title">informations légales</h3>
          <ul className="burger-menu__footer__list">
            <li className="burger-menu__footer__list__item">
              <Link to="/" aria-label="Mentions légales" onClick={closeMenu}>
                <span className="burger-menu__footer__list__item-span">
                  Mentions légales
                </span>
              </Link>
            </li>

            <li className="burger-menu__footer__list__item">
              <Link
                to="/"
                aria-label="conditions générales d'utilisation"
                onClick={closeMenu}
              >
                <span className="burger-menu__footer__list__item-span">
                  Conditions Générales
                </span>
              </Link>
            </li>
            <li className="burger-menu__footer__list__item">
              <Link
                to="/"
                aria-label="règlement général de protection des données"
                onClick={closeMenu}
              >
                <span className="burger-menu__footer__list__item-span">
                  RGPD
                </span>
              </Link>
            </li>
            <li className="burger-menu__footer__list__item">
              <Link
                to="/"
                aria-label="Déclaration d'accessibilité : non conforme"
                onClick={closeMenu}
              >
                <span className="burger-menu__footer__list__item-span">
                  Accessibilité: non conforme
                </span>
              </Link>
            </li>
          </ul>
          <div className="burger-menu__footer__social-media">
            <FaFacebookF
              size={28}
              color="#00CFFF"
              aria-label="Accéder à la page Facebook"
              onClick={closeMenu}
            />
            <FaInstagram
              size={32}
              color="#3A91FF"
              aria-label="Accéder à la page Instagram"
              onClick={closeMenu}
            />
            <FaYoutube
              size={32}
              color="#FF2DCB"
              aria-label="Accéder à la page Youtube"
              onClick={closeMenu}
            />
            <BiLogoTwitch
              size={32}
              color="#8A00FF"
              aria-label="Accéder à la page Twitch"
              onClick={closeMenu}
            />
          </div>
          <p className="burger-menu__footer__copyright">
            © {year} Gamer Challenges
          </p>
        </div>
      </nav>
    </>
  );
}

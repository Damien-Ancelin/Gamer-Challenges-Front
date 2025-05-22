import logo from '@/assets/svg/logo.svg';
import { GoHome, GoTrophy } from 'react-icons/go';
import { LuCircleUser, LuJoystick } from 'react-icons/lu';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function HeaderDesktop() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isHomePage = location.pathname === '/';

  return (
    <header className="header-desktop">
      <NavLink to="/" className="header-desktop__logo-container">
        <img src={logo} alt="Trophé avec dégradé de couleurs" />
        {isHomePage ? (
          <h1 className="header-desktop__title">gamer challenges</h1>
        ) : (
          <h2 className="header-desktop__title">gamer challenges</h2>
        )}
      </NavLink>
      <nav className="header-desktop__nav" aria-label="Navigation ordinateur">
        <ul className="header-desktop__nav-list">
          <li className="header-desktop__nav-list__item">
            <NavLink to="/">
              <GoHome
                aria-label="Retour à l'accueil"
                size={32}
                color="#00CFFF"
              />
              <span className="header-desktop__nav-list__item-span">
                accueil
              </span>
            </NavLink>
          </li>

          <li className="header-desktop__nav-list__item">
            <NavLink to="/challenges">
              <GoTrophy
                aria-label="Accéder à la page des défis"
                size={32}
                color="#3A91FF"
              />
              <span className="header-desktop__nav-list__item-span">
                challenges
              </span>
            </NavLink>
          </li>

          <li className="header-desktop__nav-list__item">
            <NavLink to="/leaderboard">
              <MdOutlineLeaderboard
                aria-label="Accéder à la page des classements"
                size={32}
                color="#8A00FF"
              />
              <span className="header-desktop__nav-list__item-span">
                leaderboard
              </span>
            </NavLink>
          </li>

          <li className="header-desktop__nav-list__item">
            <NavLink to="/jeux">
              <LuJoystick
                aria-label="Accéder à la page des jeux"
                size={32}
                color="#FF2DCB"
              />

              <span className="header-desktop__nav-list__item-span">jeux</span>
            </NavLink>
          </li>

          <li className="header-desktop__nav-list__item">
            <NavLink to="/compte" className="no-active">
              <LuCircleUser
                aria-label="Aller à la page de connexion ou au compte utilisateur"
                size={32}
                color="#DDAD33"
              />

              <span className="header-desktop__nav-list__item-span">
                {isAuthenticated ? 'mon compte' : 'connexion'}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

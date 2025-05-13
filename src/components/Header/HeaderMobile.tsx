import logo from '@/assets/svg/logo.svg';
import { AiOutlineMenu } from 'react-icons/ai';
import { LuCircleUser } from 'react-icons/lu';
import { NavLink } from 'react-router';

export default function HeaderMobile() {
  return (
    <header className="header-mobile">
      <nav className="header-mobile__nav" aria-label="Navigation mobile">
        <button
          type="button"
          className="burger-menu"
          aria-label="Ouvrir le menu de navigation"
        >
          <AiOutlineMenu
            className="burger-menu__icon"
            size={32}
            color="#00CFFF"
          />
        </button>
        <NavLink to="/" className="header-mobile__logo">
          <img src={logo} alt="Trophé avec dégradé de couleurs" />
        </NavLink>
        <NavLink to="/compte">
          <LuCircleUser
            aria-label="Aller à la page de connexion ou au compte utilisateur"
            size={32}
            color="#DDAD33"
          />
        </NavLink>
      </nav>
    </header>
  );
}

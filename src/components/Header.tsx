import { AiOutlineMenu } from 'react-icons/ai';
import { LuCircleUser } from 'react-icons/lu';
import { NavLink } from 'react-router';
import logo from '../assets/svg/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <AiOutlineMenu
          className="burger-menu"
          aria-label="Icône pour afficher le menu"
          size={32}
          color="#00CFFF"
        />
        <NavLink to="/" className="header__nav__logo">
          <img src={logo} alt="Trophé avec dégradé de couleurs" />
        </NavLink>
        <NavLink to="/compte">
          <LuCircleUser
            aria-label="Icône pour se connecter"
            size={32}
            color="#DDAD33"
          />
        </NavLink>
      </nav>
    </header>
  );
}

import logo from '@/assets/svg/logo.svg';
import { AiOutlineMenu } from 'react-icons/ai';
import { LuCircleUser } from 'react-icons/lu';
import { RiMenuFoldLine } from 'react-icons/ri';
import { NavLink } from 'react-router';
import { useBurgerMenu } from '../../contexts/BurgerMenuContext';
import BurgerMenu from './BurgerMenu';

export default function HeaderMobile() {
  const { isOpen, setIsOpen } = useBurgerMenu();
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <>
      <header className="header-mobile">
        <nav className="header-mobile__nav" aria-label="Navigation mobile">
          {!isOpen ? (
            <button
              type="button"
              className="burger-menu__button"
              aria-label="Ouvrir le menu de navigation"
              onClick={() => {
                setIsOpen(true);
              }}
              aria-expanded={isOpen}
              aria-controls="burger-menu"
              aria-haspopup="true"
              aria-pressed={isOpen}
            >
              <AiOutlineMenu
                className="burger-menu__icon"
                size={32}
                color="#00CFFF"
              />
            </button>
          ) : (
            <button
              type="button"
              className="burger-menu__button-close"
              aria-label="Fermer le menu de navigation"
              onClick={() => {
                setIsOpen(false);
              }}
              aria-expanded={isOpen}
              aria-controls="burger-menu"
              aria-haspopup="true"
              aria-pressed={isOpen}
            >
              <RiMenuFoldLine
                className="burger-menu__icon-close"
                size={32}
                color="#00CFFF"
              />
            </button>
          )}

          <NavLink to="/" className="header-mobile__logo" onClick={closeMenu}>
            <img src={logo} alt="Trophé avec dégradé de couleurs" />
          </NavLink>
          <NavLink to="/compte" onClick={closeMenu}>
            <LuCircleUser
              aria-label="Aller à la page de connexion ou au compte utilisateur"
              size={32}
              color="#DDAD33"
            />
          </NavLink>
        </nav>
        {isOpen && <BurgerMenu closeMenu={closeMenu} />}
      </header>
    </>
  );
}

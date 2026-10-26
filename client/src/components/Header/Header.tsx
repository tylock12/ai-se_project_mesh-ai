import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import menuIcon from "../../assets/Menu.svg";

type Props = {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  isMobileMenuOpen: boolean;
};

export default function Header({
  onMenuOpen,
  onMenuClose,
  isMobileMenuOpen,
}: Props) {
  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive
      ? "header__nav-link header__nav-link--active"
      : "header__nav-link";
  }

  return (
    <header className="header">
      <button
        type="button"
        className="header__menu-btn"
        aria-label="Open menu"
        onClick={() => {
  if (isMobileMenuOpen) {
    onMenuClose();
  } else {
    onMenuOpen();
  }
}}
      >
      <img src={menuIcon} alt="" />
      </button>
      <img className="header__logo" src={logo} alt="Mesh AI logo" />
      <nav className={isMobileMenuOpen ? 'header__nav header__nav_mobile' : 'header__nav'}>
        <NavLink to="/knowledge" className={getNavLinkClass}
        onClick={onMenuClose}>
          Knowledge Base
        </NavLink>
        <NavLink to="/chat" className={getNavLinkClass}
        onClick={onMenuClose}>
          Chat
        </NavLink>
      </nav>
    </header>
  );
}

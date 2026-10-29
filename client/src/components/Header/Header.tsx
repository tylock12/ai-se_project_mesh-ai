import "./Header.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import menuIcon from "../../assets/Menu.svg";
import { useAuth } from "../../contexts/AuthContext";

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
  const { isLoggedIn, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive
      ? "header__nav-link header__nav-link--active"
      : "header__nav-link";
  }

  const handleLogout = () => {
    logout();
    setIsAccountMenuOpen(false);
    onMenuClose();
    navigate("/login");
  };

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
        <img src={menuIcon} alt="Menu icon" />
      </button>
      <img className="header__logo" src={logo} alt="Mesh AI logo" />
      <nav
        className={
          isMobileMenuOpen ? "header__nav header__nav_mobile" : "header__nav"
        }
      >
        {isLoggedIn && (
          <>
            <NavLink
              to="/knowledge"
              className={getNavLinkClass}
              onClick={onMenuClose}
            >
              Knowledge Base
            </NavLink>
            <NavLink
              to="/chat"
              className={getNavLinkClass}
              onClick={onMenuClose}
            >
              Chat
            </NavLink>
            <div className="header__account">
              <button
                type="button"
                className="header__dropdown-btn"
                aria-haspopup="menu"
                aria-expanded={isAccountMenuOpen}
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              >
                {currentUser?.name}'s Account
              </button>
              {isAccountMenuOpen && (
                <ul className="header__menu" role="menu">
                  <li role="none">
                    <button
                      type="button"
                      role="menuitem"
                      className="header__menu-item"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

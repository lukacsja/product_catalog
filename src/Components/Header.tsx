import cn from 'classnames';
import React, { useState } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { navItems } from '../NavItems';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <NavLink
          className={({ isActive }) => cn(
            'navbar__logo',
            { 'is-active': isActive },
          )}
          to="/home"
        />
        <ul className="navbar__links">
          {navItems.map(item => (
            <li key={item}>
              <NavLink
                className={({ isActive }) => cn(
                  'navbar__link',
                  { 'is-active': isActive },
                )}
                to={`/${item}`}
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navbar__icons">
          {isMobileMenuOpen
            ? (
              <div className="navbar__icon navbar__icon--close">
                <NavLink
                  className="navbar__icon--close-svg"
                  to="/home"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>

            )
            : (
              <div className="navbar__icon navbar__icon--hamburger">
                <NavLink
                  className="navbar__icon--hamburger-svg"
                  to="/mobile-menu"
                  onClick={() => setIsMobileMenuOpen(true)}
                />
              </div>
            )}

          <div className="navbar__icon navbar__icon--favourites">
            <NavLink
              className="navbar__icon--favourites-svg"
              to="/mobile-icon"
            />
          </div>
          <div className="navbar__icon navbar__icon--cart">
            <NavLink
              className="navbar__icon--cart-svg"
              to="/mobile-icon"
            />
          </div>
        </div>
      </div>
      <MobileMenu
        isMenuActive={isMobileMenuOpen}
        setIsMenuActive={setIsMobileMenuOpen}
      />
    </>
  );
};

export default Header;

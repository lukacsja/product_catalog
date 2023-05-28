/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../utils/_variables';

type Props = {
  isMobileMenuOpen: boolean,
  toggleMobileMenu: () => void,
};

export const Header: React.FC<Props> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}) => {
  return (
    <div className="header">
      <div className="navbar">
        <NavLink
          className={({ isActive }) => cn(
            'navbar__logo',
            { 'is-active': isActive },
          )}
          to="/"
          onClick={() => {
            if (isMobileMenuOpen) {
              toggleMobileMenu();
            }
          }}
        />
        <ul className="navbar__links">
          {navItems.map(item => (
            <li key={item.name}>
              <NavLink
                className={({ isActive }) => cn(
                  'navbar__link',
                  { 'is-active': isActive },
                )}
                to={item.path}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navbar__icons">
          <div className="navbar__icon navbar__icon--hide">
            <button
              type="button"
              className={`navbar__icon--${isMobileMenuOpen
                ? 'close'
                : 'hamburger'}-svg`}
              onClick={toggleMobileMenu}
            />
          </div>

          <div className="navbar__icon navbar__icon--favourites">
            <NavLink
              className="navbar__icon--favourites-svg"
              to="/mobile-icon"
            />
          </div>
          <div className="navbar__icon navbar__icon--cart">
            <NavLink
              className="navbar__icon--cart-svg"
              to="/shoppingcart"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

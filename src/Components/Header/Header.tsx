/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../utils/_variables';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useFavorites } from '../../context/FavoritesContext';

type Props = {
  isMobileMenuOpen: boolean,
  toggleMobileMenu: () => void,
};

export const Header: React.FC<Props> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}) => {
  const { cartItems } = useShoppingCart();
  const { favorites } = useFavorites();

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
          <button
            className="navbar__icon navbar__icon--mobile"
            type="button"
            onClick={toggleMobileMenu}
          >
            <div
              className={`navbar__icon--${isMobileMenuOpen
                ? 'close'
                : 'hamburger'}-svg`}
            />
          </button>

          <NavLink
            className={({ isActive }) => cn(
              'navbar__icon navbar__icon--favourites',
              { 'is-active': isActive },
            )}
            to="/favorites"
          >
            <div className="navbar__icon--favourites-svg">
              <div className="navbar__icon--counter">
                {favorites.length}
              </div>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => cn(
              'navbar__icon navbar__icon--cart',
              { 'is-active': isActive },
            )}
            to="/shoppingcart"
          >
            <div className="navbar__icon--cart-svg">
              <div className="navbar__icon--counter">
                {cartItems.length}
              </div>
            </div>

          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;

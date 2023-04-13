import cn from 'classnames';
import React from 'react';
import './Header.scss';
import { NavLink, Route, Routes } from 'react-router-dom';

const Header: React.FC = () => {
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
        <div className="navbar__links">
          {['home', 'phones', 'tablets', 'accessories'].map(item => (
            <NavLink
              className={({ isActive }) => cn(
                'navbar__link',
                { 'is-active': isActive },
              )}
              to={`/${item}`}
              key={item}
            >
              {item}
            </NavLink>
          ))}
        </div>
        <div className="navbar__icons">
          <div className="navbar__icon navbar__icon--hamburger">
            <NavLink
              className="navbar__icon--hamburger-svg"
              to="/mobile-icon"
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
              to="/mobile-icon"
            />
          </div>
        </div>
      </div>

      <Routes>
        <Route />
        <Route />
        <Route />
      </Routes>
    </>
  );
};

export default Header;

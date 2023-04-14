import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { navItems } from '../NavItems';
import './MobileMenu.scss';

type Props = {
  isMenuActive: boolean,
  setIsMenuActive: (arg: boolean) => void,
};

const MobileMenu: React.FC<Props> = ({ isMenuActive, setIsMenuActive }) => {
  return (
    <div className={cn(
      'menu',
      { 'menu-isactive': isMenuActive },
    )}
    >
      <ul className="menu__links">
        {navItems.map(item => (
          <li key={item}>
            <NavLink
              className="menu__link"
              to={`/${item}`}
              onClick={() => setIsMenuActive(false)}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="menu__icons">
        <div className="menu__icon menu__icon--favourites">
          <NavLink
            className="menu__icon--favourites-svg"
            to="/mobile-icon"
          />
        </div>
        <div className="menu__icon menu__icon--cart">
          <NavLink
            className="menu__icon--cart-svg"
            to="/mobile-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

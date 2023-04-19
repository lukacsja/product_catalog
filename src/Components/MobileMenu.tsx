import cn from 'classnames';
import { Link } from 'react-router-dom';
import { navItems } from '../utils/_variables';
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
          <li key={item.name}>
            <Link
              className="menu__link"
              to={item.path}
              onClick={() => setIsMenuActive(false)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="menu__icons">
        <div className="menu__icon menu__icon--favourites">
          <Link
            className="menu__icon--favourites-svg"
            to="/mobile-icon"
          />
        </div>
        <div className="menu__icon menu__icon--cart">
          <Link
            className="menu__icon--cart-svg"
            to="/mobile-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

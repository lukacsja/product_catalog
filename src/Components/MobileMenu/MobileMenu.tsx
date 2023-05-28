import cn from 'classnames';
import { Link } from 'react-router-dom';
import { navItems } from '../../utils/_variables';
import './MobileMenu.scss';

type Props = {
  isMobileMenuOpen: boolean,
  toggleMobileMenu: () => void,
};

export const MobileMenu: React.FC<Props> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}) => {
  return (
    <div className={cn(
      'menu',
      { 'menu-isactive': isMobileMenuOpen },
    )}
    >
      <ul className="menu__links">
        {navItems.map(item => (
          <li key={item.name}>
            <Link
              className="menu__link"
              to={item.path}
              onClick={toggleMobileMenu}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="menu__icons">
        <Link
          className="menu__icon menu__icon--favourites"
          to="/favorites"
          onClick={toggleMobileMenu}
        >
          <div className="menu__icon--favourites-svg" />
        </Link>
        <Link
          className="menu__icon menu__icon--cart"
          to="/shoppingcart"
          onClick={toggleMobileMenu}
        >
          <div className="menu__icon--cart-svg" />
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;

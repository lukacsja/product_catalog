/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <div className="footer__logo" />
      <ul className="footer__links">
        <Link to="http://github.com/lukacsja" target="blank">
          <li className="footer__link">github</li>
        </Link>
        <Link to="http://github.com/lukacsja" target="blank">
          <li className="footer__link">contacts</li>
        </Link>
        <Link to="http://github.com/lukacsja" target="blank">
          <li className="footer__link">rights</li>
        </Link>
      </ul>
      <div className="footer__backtotop">
        <div className="footer__backtotop--title">
          Back to top
        </div>
        <button
          type="button"
          className="footer__backtotop--button"
          onClick={scrollToTop}
        />
      </div>
    </div>
  );
};

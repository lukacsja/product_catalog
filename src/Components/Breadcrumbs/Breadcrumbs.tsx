import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;

      return (
        <div className="crumb" key={crumb}>
          <Link className="crumb-link" to={currentLink}>{crumb}</Link>
        </div>
      );
    });

  return (
    <div className="test">
      <div className="breadcrumbs">
        <Link to="/">
          <div className="breadcrumbs__home" />
        </Link>
        <div className="breadcrumbs">{crumbs}</div>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';
import './Categories.scss';

export const Categories = () => {
  return (
    <div className="categories__container">
      <div className="categories">
        <h2 className="categories__title">
          Shop by category
        </h2>
        <div className="categories__groups">
          <div className="categories__group categories__group--phones">
            <Link to="/phones" className="test">
              <div
                className="categories__group--image
              categories__group--image-phones"
              />
            </Link>
            <Link to="/phones">
              <div className="categories__group--title">
                Mobile Phones
              </div>
            </Link>
            <div className="categories__group--description">
              95 models
            </div>
          </div>
          <div className="categories__group categories__group--tablets">
            <Link to="/tablets">
              <div
                className="categories__group--image
              categories__group--image-tablets"
              />
            </Link>
            <Link to="tablets">
              <div className="categories__group--title">
                Tablets
              </div>
            </Link>
            <div className="categories__group--description">
              24 models
            </div>
          </div>
          <div className="categories__group categories__group--accessories">
            <Link to="accessories">
              <div
                className="categories__group--image
              categories__group--image-accessories"
              />
            </Link>
            <Link to="accessories">
              <div className="categories__group--title">
                Accessories
              </div>
            </Link>
            <div className="categories__group--description">
              100 models
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

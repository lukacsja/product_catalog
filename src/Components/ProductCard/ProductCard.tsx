/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { Phone } from '../../Types/Phone';
import './ProductCard.scss';

type Props = {
  product: Phone,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="productcard__container">
      <div className="productcard">
        <div className="productcard__image--container">
          <Link className="productcard__image--link" to="/">
            <img
              className="productcard__image"
              // eslint-disable-next-line global-require
              src={require('../../img/phones/apple-iphone-11/black/00.jpg')}
              alt={product.name}
            />
          </Link>
        </div>
        <Link
          to="/"
          className="productcard__title"
        >
          {product.name}
        </Link>
        <div className="productcard__prices">
          <div className="productcard__price productcard__price--full">
            {`$${product.price}`}
          </div>
          <div className="productcard__price productcard__price--discounted">
            {`$${product.fullPrice}`}
          </div>
        </div>
        <div className="productcard__details">
          <div className="productcard__details--line">
            <span className="productcard__details--title">
              Screen
            </span>
            <span className="productcard__details--value">
              {product.screen}
            </span>
          </div>
          <div className="productcard__details--line">
            <span className="productcard__details--title">
              Capacity
            </span>
            <span className="productcard__details--value">
              {product.capacity}
            </span>
          </div>
          <div className="productcard__details--line">
            <span className="productcard__details--title">
              RAM
            </span>
            <span className="productcard__details--value">
              {product.ram}
            </span>
          </div>
        </div>
        <div className="productcard__buttons">
          <button
            type="button"
            className="productcard__button productcard__button--addtocart"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="productcard__button productcard__button--addtofavs"
          />
        </div>
      </div>
    </div>
  );
};

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Link } from 'react-router-dom';
import { Phone } from '../../Types/Phone';
import './ProductCard.scss';
import { useShoppingCart } from '../../context/ShoppingCartContext';

type Props = {
  product: Phone,
  isDiscounted: boolean,
};

export const ProductCard: React.FC<Props> = ({ product, isDiscounted }) => {
  const { addToCart } = useShoppingCart();

  return (
    <div className="productcard__container">
      <div className="productcard">
        <div className="productcard__image--container">
          <Link
            className="productcard__image--link"
            to={`/phones/${product.itemId}`}
          >
            <img
              className="productcard__image"
              src={require(`../../${product.image}`)}
              alt={product.name}
            />
          </Link>
        </div>
        <Link
          to={`/phones/${product.itemId}`}
          className="productcard__title"
        >
          {product.name}
        </Link>
        <div className="productcard__prices">
          {isDiscounted
            ? (
              <>
                <div className="productcard__price productcard__price--full">
                  {`$${product.price}`}
                </div>
                <div
                  className="productcard__price productcard__price--discounted"
                >
                  {`$${product.fullPrice}`}
                </div>
              </>
            )
            : (
              <div className="productcard__price productcard__price--full">
                {`$${product.fullPrice}`}
              </div>
            )}

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
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="productcard__button productcard__button--addtofavs"
            aria-label="add to favourites"
          />
        </div>
      </div>
    </div>
  );
};

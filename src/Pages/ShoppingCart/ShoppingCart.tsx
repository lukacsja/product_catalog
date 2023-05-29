/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import './ShoppingCart.scss';

export const ShoppingCart = () => {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    getItemQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();

  const totalPrice = cartItems.reduce((sum, item) => (
    sum + item.price * item.cartQuantity
  ), 0);

  return (
    <div className="shoppingcart">
      <div className="shoppingcart__goback">
        <Link className="shoppingcart__goback--link" to="/phones">
          Back
        </Link>
      </div>
      {cartItems.length
        ? (
          <>
            <h1 className="shoppingcart__title">Cart</h1>
            <div className="shoppingcart__panels">
              <div className="shoppingcart__items">
                {cartItems.map(item => (
                  <div className="shoppingcart__item">
                    <div className="shoppingcart__item--first-row">
                      <button
                        type="button"
                        className="shoppingcart__item--remove"
                        aria-label="remove item(s)"
                        onClick={() => removeFromCart(item)}
                      />
                      <div className="shoppingcart__item--container">
                        <img
                          className="shoppingcart__item--img"
                          alt={item.name}
                          src={require(`../../${item.image}`)}
                        />
                      </div>
                      <div className="shoppingcart__item--title">
                        {item.name}
                      </div>
                    </div>
                    <div className="shoppingcart__item--second-row">
                      <div className="shoppingcart__item--manage-quantities">
                        <button
                          type="button"
                          className="shoppingcart__item--minus"
                          aria-label="remove item"
                          onClick={() => decreaseCartQuantity(item)}
                        />
                        <span className="shoppingcart__item--quantity">
                          {`${getItemQuantity(item)}`}
                        </span>
                        <button
                          type="button"
                          className="shoppingcart__item--plus"
                          aria-label="add item"
                          onClick={() => addToCart(item)}
                        />
                      </div>
                      <span className="shoppingcart__item--price">{`$${item.price * item.cartQuantity}`}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="shoppingcart__total">
                <span className="shoppingcart__total--price">{`$${totalPrice}`}</span>
                <span className="shoppingcart__total--info">
                  {`Total for ${cartItems.length} items`}
                </span>
                <button
                  type="button"
                  className="shoppingcart__total--checkout"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>

        )
        : (
          <h1 className="shoppingcart__title">Your cart is empty</h1>
        )}
    </div>
  );
};

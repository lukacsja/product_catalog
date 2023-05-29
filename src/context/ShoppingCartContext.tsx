import {
  useContext, createContext, ReactNode, useState, useEffect,
} from 'react';
import { Phone } from '../Types/Phone';

type ShoppingCartProviderProps = {
  children: ReactNode,
};

type ShoppingCartContextType = {
  addToCart: (product: Phone) => void,
  getItemQuantity: (product: Phone) => void,
  decreaseCartQuantity: (product: Phone) => void,
  removeFromCart: (product: Phone) => void,
  cartItems: Phone[],
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = (
  { children },
) => {
  const [cartItems, setCartItems] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = (product: Phone) => {
    if (product) {
      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItems = cartItems.map((item) => (
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        ));

        setCartItems(updatedItems);
      } else {
        setCartItems([...cartItems, { ...product, cartQuantity: 1 }]);
      }
    }
  };

  const getItemQuantity = (product: Phone) => {
    return cartItems.find((item) => item.id === product.id)?.cartQuantity || 0;
  };

  const removeFromCart = (product: Phone) => {
    if (product) {
      setCartItems(cartItems.filter(item => item.id !== product.id));
    }
  };

  const decreaseCartQuantity = (product: Phone) => {
    const item = cartItems.find((i) => i.id === product.id);

    if (item && item.cartQuantity > 1) {
      const updatedItems = cartItems.map((i) => (
        i.id === product.id
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : i
      ));

      setCartItems(updatedItems);
    } else {
      removeFromCart(product);
    }
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  return (
    <ShoppingCartContext.Provider value={{
      addToCart,
      getItemQuantity,
      decreaseCartQuantity,
      removeFromCart,
      cartItems,
    }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

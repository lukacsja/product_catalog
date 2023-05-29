import {
  useContext, createContext, ReactNode, useState, useEffect,
} from 'react';
import { Phone } from '../Types/Phone';

type FavoritesProviderProps = {
  children: ReactNode,
};

type FavoritesContextTypes = {
  addToFavs: (product: Phone) => void,
  removeFromFavs: (product: Phone) => void,
  favorites: Phone[],
};

const FavoritesContext = createContext({} as FavoritesContextTypes);

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = (
  { children },
) => {
  const [favorites, setFavorites] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToFavs = (product: Phone) => {
    setFavorites([...favorites, product]);
  };

  const removeFromFavs = (product: Phone) => {
    if (product) {
      setFavorites(favorites.filter(item => item.id !== product.id));
    }
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  return (
    <FavoritesContext.Provider value={{
      addToFavs,
      removeFromFavs,
      favorites,
    }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

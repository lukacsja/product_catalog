import { Breadcrumbs } from '../../Components/Breadcrumbs';
import { ProductCard } from '../../Components/ProductCard';
import { useFavorites } from '../../context/FavoritesContext';
import './Favorites.scss';

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
      <Breadcrumbs />
      <h1 className="favorites__title">
        Favorites
      </h1>
      <span className="favorites__counter">
        {`${favorites.length} items`}
      </span>
      <div className="favorites__items">
        {favorites.map(item => (
          <ProductCard product={item} isDiscounted />
        ))}
      </div>
    </div>
  );
};

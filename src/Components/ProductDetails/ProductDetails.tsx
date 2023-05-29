/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PhoneDetails } from '../../Types/PhoneDetails';
import './ProductDetails.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';
import { getProductColors } from '../../utils/_variables';
import { Phone } from '../../Types/Phone';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useFavorites } from '../../context/FavoritesContext';

type Props = {
  phones: Phone[],
};

export const ProductDetails: React.FC<Props> = ({ phones }) => {
  const [details, setDetails] = useState<PhoneDetails | null>(null);
  const [images, setImages] = useState(details?.images);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhone, setCurrentPhone] = useState<Phone | null>(null);
  const { phoneId } = useParams();
  const { addToCart } = useShoppingCart();
  const { favorites, addToFavs, removeFromFavs } = useFavorites();

  const getPhoneById = (id: string): Phone | null => {
    const phone = phones.find(item => item.phoneId === id);

    return phone || null;
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(`./api/phones/${phoneId}.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      });

    if (phoneId) {
      setCurrentPhone(getPhoneById(phoneId));
    }
  }, [phoneId]);

  useEffect(() => {
    setImages(details?.images);

    if (images) {
      setCurrentImage(images[0]);
    }
  }, [details, images]);

  const updateUrlByCapacity = (capacity: string) => {
    const splittedId = phoneId?.split('-');

    if (!splittedId) {
      return phoneId;
    }

    const updatedId = splittedId.map((part) => {
      if (part.includes('gb')) {
        return capacity.toLowerCase();
      }

      return part;
    });

    return updatedId.join('-');
  };

  const updateUrlByColor = (color: string) => {
    const splittedId = phoneId?.split('-');

    if (!splittedId) {
      return phoneId;
    }

    splittedId[splittedId.length - 1] = color;

    return splittedId.join('-');
  };

  return (
    <div className="details">
      <Breadcrumbs />
      <div className="details__goback">
        <Link className="details__goback--link" to="/phones">Back</Link>
      </div>
      {isLoading
        ? <Loader />
        : (
          <>
            <h2 className="details__title">
              {details?.name}
            </h2>

            <div className="details__mediagroup--1">
              <div className="details__images">
                <div className="details__images--main">
                  <img
                    className="details__images--main-img"
                    src={require(`../../${currentImage}`)}
                    alt="Apple iPhone"
                  />
                </div>
                <div className="details__images--list">
                  {images?.map(img => (
                    <button
                      type="button"
                      key={img}
                      className={cn(
                        'details__images--list-item',
                        { active: img === currentImage },
                      )}
                      onClick={() => setCurrentImage(img)}
                    >
                      <img
                        className="details__images--list-img"
                        src={require(`../../${img}`)}
                        alt="Apple iPhone"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="details__mediagroup--1b">
                <div className="details__colors">
                  <div className="details__colors--title">Available colors</div>
                  <div className="details__colors--palette">
                    {details?.colorsAvailable.map(color => (
                      <Link
                        to={`/phones/${updateUrlByColor(color)}`}
                        key={color}
                        className={cn(
                          'details__colors--palette-item',
                          { active: color === details.color },
                        )}
                        style={{ backgroundColor: getProductColors(color) }}
                      />
                    ))}
                  </div>
                </div>
                <div className="details__separator" />
                <div className="details__capacities">
                  <div className="details__capacities--title">
                    Select capacity
                  </div>
                  <div className="details__capacities--palette">
                    {details?.capacityAvailable.map(capacity => (
                      <Link
                        to={`/phones/${updateUrlByCapacity(capacity)}`}
                        key={capacity}
                        className={cn(
                          'details__capacities--palette-item',
                          { active: capacity === details.capacity },
                        )}
                      >
                        {capacity}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="details__separator" />
                <div className="details__prices">
                  <span className="details__prices-discount">
                    {`$${details?.priceDiscount}`}
                  </span>
                  <span className="details__prices-full">
                    {`$${details?.priceRegular}`}
                  </span>
                </div>
                <div className="details__buttons">
                  <button
                    type="button"
                    className="details__button details__button--addtocart"
                    onClick={() => currentPhone && addToCart(currentPhone)}
                  >
                    Add to cart
                  </button>
                  {currentPhone && favorites.includes(currentPhone)
                    ? (
                      <button
                        type="button"
                        className="details__button
                        details__button--removefromfavs"
                        aria-label="remove from favrites"
                        onClick={() => currentPhone
                          && removeFromFavs(currentPhone)}
                      />
                    )
                    : (
                      <button
                        type="button"
                        className="details__button
                        details__button--addtofavs"
                        aria-label="add to favorites"
                        onClick={() => currentPhone
                          && addToFavs(currentPhone)}
                      />
                    )}
                </div>
                <div className="details__info">
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Screen
                    </span>
                    <span className="details__info--value">
                      {details?.screen}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Resolution
                    </span>
                    <span className="details__info--value">
                      {details?.resolution}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Processor
                    </span>
                    <span className="details__info--value">
                      {details?.processor}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      RAM
                    </span>
                    <span className="details__info--value">
                      {details?.ram}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="details__mediagroup--2">
              <div className="details__about">
                <h3 className="details__about--title">About</h3>
                <div className="details__about--separator" />
                {details?.description.map(desc => (
                  <div
                    className="details__about--block"
                    key={desc.title}
                  >
                    <h4 className="details__about--block-title">
                      {desc.title}
                    </h4>
                    <ul>
                      {desc.text.map((text) => (
                        <li
                          className="details__about--block-text"
                          key={text}
                        >
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="details__specs">
                <h3 className="details__specs--title">
                  Tech Specs
                </h3>
                <div className="details__about--separator" />
                <div className="details__info">
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Screen
                    </span>
                    <span className="details__info--value">
                      {details?.screen}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Resolution
                    </span>
                    <span className="details__info--value">
                      {details?.resolution}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Processor
                    </span>
                    <span className="details__info--value">
                      {details?.processor}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      RAM
                    </span>
                    <span className="details__info--value">
                      {details?.ram}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Built in memory
                    </span>
                    <span className="details__info--value">
                      {details?.capacity}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Camera
                    </span>
                    <span className="details__info--value">
                      {details?.camera}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Zoom
                    </span>
                    <span className="details__info--value">
                      {details?.zoom}
                    </span>
                  </div>
                  <div className="details__info--line">
                    <span className="details__info--title">
                      Cell
                    </span>
                    <span className="details__info--value">
                      {details?.cell.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <ProductCarousel products={}/> */}
          </>
        )}
    </div>
  );
};

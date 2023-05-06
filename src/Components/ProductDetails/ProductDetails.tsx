/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PhoneDetails } from '../../Types/PhoneDetails';
import './ProductDetails.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';

export const ProductDetails: React.FC = () => {
  const [details, setDetails] = useState<PhoneDetails | null>(null);
  const [images, setImages] = useState(details?.images);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { phoneId } = useParams();

  const getProductColors = (color: string) => {
    const customColors = [
      { customColor: 'gold', cssColor: '#F9E5C9' },
      { customColor: 'spacegray', cssColor: '#535150' },
      { customColor: 'silver', cssColor: '#EBEBE3' },
      { customColor: 'black', cssColor: '#1F2020' },
      { customColor: 'rosegold', cssColor: '#FAD7BD' },
      { customColor: 'white', cssColor: '#FFFFFF' },
      { customColor: 'red', cssColor: '#BA0C2E' },
      { customColor: 'yellow', cssColor: '#FFE681' },
      { customColor: 'green', cssColor: '#AEE1CD' },
      { customColor: 'purple', cssColor: '#B8AFE6' },
      { customColor: 'midnightgreen', cssColor: '#4E5851' },
      { customColor: 'coral', cssColor: '#EE7762' },
    ];

    const foundColor = customColors.find((item) => item.customColor === color);

    return foundColor?.cssColor;
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
        setIsLoading(false);
      });
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

            <div className="media-flex-1">
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
              <div className="media-flex-2">
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
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="details__button details__button--addtofavs"
                  />
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

            <div className="media-flex-3">
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

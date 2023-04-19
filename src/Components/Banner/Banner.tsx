/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useState } from 'react';
import './Banner.scss';
import { Link } from 'react-router-dom';
import {
  bannerImagesMobile,
  bannerImagesTabletPlus,
} from '../../utils/_variables';

const delay = 3000;

const mobileImages = bannerImagesMobile;

const desktopImages = bannerImagesTabletPlus;

export const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(true);

  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth < 640);
      setIndex(0);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const images = isMobileView ? mobileImages : desktopImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === (images.length - 1)
        ? 0
        : prevIndex + 1));
    }, delay);

    return () => clearInterval(interval);
  }, [index, isMobileView]);

  return (
    <div className="banner__container">
      <div className="banner">
        <div
          className="banner__item"
          style={{ transform: `translateX(${-index * 100}%` }}
        >
          {images.map((image) => (
            <Link
              to={image.path}
              key={image.name}
              className="banner__image-link"
            >
              <div
                className="banner__image"
                style={{ backgroundImage: `url(${image.name})` }}
              />
            </Link>
          ))}
        </div>
        <div className="banner__buttons">
          {images.map((image, imageIndex) => (
            <button
              type="button"
              key={image.name}
              className={cn(
                'banner__button',
                { 'banner__button--active': index === imageIndex },
              )}
              onClick={() => {
                setIndex(imageIndex);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

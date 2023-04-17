/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useState } from 'react';
import './Banner.scss';
import { Link } from 'react-router-dom';
import { bannerImagesMobile, bannerImagesTabletPlus } from '../../Helper';

const delay = 2000;

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === (
        isMobileView ? mobileImages.length - 1 : desktopImages.length - 1)
        ? 0
        : prevIndex + 1));
    }, delay);

    return () => clearInterval(interval);
  }, [index, isMobileView]);

  const images = isMobileView ? mobileImages : desktopImages;

  return (
    <div className="banner__container">
      <div className="banner">
        <div
          className="banner__item"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
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

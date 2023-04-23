/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useRef, useState } from 'react';
import { Phone } from '../../Types/Phone';
import { ProductCard } from '../ProductCard';
import './ProductCarousel.scss';

type Props = {
  products: Phone[],
  title: string,
};

const gapSize = 16;
const mobileWidth = 212;
const tabletWidth = 237;
const desktopWidth = 272;

export const ProductCarousel: React.FC<Props> = ({ products, title }) => {
  const [position, setPosition] = useState(0);
  const [cardWidth, setCardWidth] = useState(212);

  const productCardsRef = useRef<HTMLDivElement>(null);

  const maxPosition = ((7 * cardWidth) + (7 * gapSize));

  const handleSlideLeft = () => {
    setPosition(position - cardWidth - gapSize);
  };

  const handleSlideRight = () => {
    setPosition(position + cardWidth + gapSize);
  };

  useEffect(() => {
    if (productCardsRef.current) {
      productCardsRef.current.style.transform = `translateX(-${position}px)`;
    }
  }, [position]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setCardWidth(desktopWidth);
      }

      if (window.innerWidth < 1200) {
        setCardWidth(tabletWidth);
      }

      if (window.innerWidth < 640) {
        setCardWidth(mobileWidth);
      }

      setPosition(0);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  // // eslint-disable-next-line no-console
  // console.log(position);
  // // eslint-disable-next-line no-console
  // console.log(maxPosition);
  // // eslint-disable-next-line no-console
  // console.log(cardWidth);

  return (
    <div className="carousel__container">
      <div className="carousel">
        <div className="carousel__title">
          <h2 className="carousel__title--text">{title}</h2>
          <div className="carousel__title--buttons">
            <button
              type="button"
              className="carousel__title--button carousel__title--button-left"
              onClick={handleSlideLeft}
              disabled={position === 0}
            />
            <button
              type="button"
              className="carousel__title--button carousel__title--button-right"
              onClick={handleSlideRight}
              disabled={position === maxPosition}
            />
          </div>
        </div>
        <div className="carousel__productcards" ref={productCardsRef}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

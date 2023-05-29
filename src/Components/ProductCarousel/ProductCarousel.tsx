import { useEffect, useRef, useState } from 'react';
import { Phone } from '../../Types/Phone';
import { ProductCard } from '../ProductCard';
import './ProductCarousel.scss';

type Props = {
  products: Phone[],
  title: string,
  isDiscounted: boolean,
};

export const ProductCarousel: React.FC<Props> = ({
  products,
  title,
  isDiscounted,
}) => {
  const [position, setPosition] = useState(0);
  const [step, setStep] = useState(1);

  const productCardsRef = useRef<HTMLDivElement>(null);
  const productCardRef = useRef<HTMLDivElement>(null);

  const containerWidth = productCardsRef.current?.clientWidth ?? 0;
  const cardWidth = productCardRef.current?.clientWidth ?? 0;

  const gapSize = 16;

  const productsWidth = (products.length * cardWidth)
    + ((products.length - 1) * gapSize);

  const maxPosition = productsWidth - containerWidth;

  const handleSlideLeft = () => {
    setPosition(
      Math.max(position - step * (cardWidth + gapSize), 0),
    );
  };

  const handleSlideRight = () => {
    setPosition(
      Math.min(position + step * (cardWidth + gapSize), maxPosition),
    );
  };

  useEffect(() => {
    if (productCardsRef.current) {
      productCardsRef.current.style.transform = `translateX(-${position}px)`;
    }
  }, [position]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setStep(4);
      }

      if (window.innerWidth < 1200) {
        setStep(2);
      }

      if (window.innerWidth < 640) {
        setStep(1);
      }

      setPosition(0);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

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
              aria-label="scroll forward"
            />
            <button
              type="button"
              className="carousel__title--button carousel__title--button-right"
              onClick={handleSlideRight}
              disabled={position === maxPosition}
              aria-label="scroll back"
            />
          </div>
        </div>
        <div className="carousel__productcards" ref={productCardsRef}>
          {products.map(product => (
            <div
              className="carousel__productcard--container"
              ref={productCardRef}
            >
              <ProductCard
                key={product.id}
                product={product}
                isDiscounted={isDiscounted}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

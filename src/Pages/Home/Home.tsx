import { Banner } from '../../Components/Banner';
import { ProductCarousel } from '../../Components/ProductCarousel';
import { Categories } from '../../Components/Categories';
import { Phone } from '../../Types/Phone';
import './Home.scss';

type Props = {
  brandNews: Phone[] | null,
  hotPrices: Phone[] | null,
};

export const Home: React.FC<Props> = ({ brandNews, hotPrices }) => (
  <div className="home">
    <div className="home__title--container">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
    </div>
    <Banner />
    {brandNews && (
      <ProductCarousel
        products={brandNews}
        title="Brand new models"
        isDiscounted={false}
      />
    )}
    <Categories />
    {hotPrices && (
      <ProductCarousel
        products={hotPrices}
        title="Hot prices"
        isDiscounted
      />
    )}
  </div>
);

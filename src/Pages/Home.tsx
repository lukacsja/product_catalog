import { Banner } from '../Components/Banner';
import { BrandNewModels } from '../Components/BrandNewModels';
import { Categories } from '../Components/Categories';
import { Phone } from '../Types/Phone';
import './Home.scss';

type Props = {
  products: Phone[]
};

export const Home: React.FC<Props> = ({ products }) => (
  <div className="home">
    <div className="home__title--container">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
    </div>
    <Banner />
    <BrandNewModels products={products} />
    <Categories />
  </div>
);

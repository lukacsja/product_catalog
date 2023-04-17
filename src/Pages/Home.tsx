import { Banner } from '../Components/Banner';
import './Home.scss';

export const Home = () => (
  <div className="home">
    <div className="home__title--container">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
    </div>
    <Banner />
  </div>
);

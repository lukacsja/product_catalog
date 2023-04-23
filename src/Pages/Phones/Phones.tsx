import { Breadcrumbs } from '../../Components/Breadcrumbs';
import { Phone } from '../../Types/Phone';
import './Phones.scss';

type Props = {
  products: Phone[],
};

export const Phones: React.FC<Props> = ({ products }) => {
  return (
    <div className="phones">
      <Breadcrumbs />
      <h1 className="phones__title">Mobile phones</h1>
      <span className="phones__counter">{`${products.length} models`}</span>
    </div>
  );
};

import { Breadcrumbs } from '../../Components/Breadcrumbs';
import { ProductCard } from '../../Components/ProductCard';
import { Phone } from '../../Types/Phone';
import './Phones.scss';

type Props = {
  products: Phone[],
};

export const Phones: React.FC<Props> = ({ products }) => {
  // eslint-disable-next-line no-console
  console.log(products.length);

  return (
    <div className="phones">
      <Breadcrumbs />
      <h1 className="phones__title">Mobile phones</h1>
      <div className="phones__counter">{`${products.length} models`}</div>
      <div className="phones__dropdowns">
        <div className="phones__dropdown">
          <label
            htmlFor="sortby"
            className="phones__dropdown--title"
          >
            Sort by
          </label>
          <select
            className="phones__dropdown--select"
            name="sort-by"
          >
            <option
              className="phones__dropdown--select-option"
              value="newest"
            >
              Newest
            </option>
            <option
              className="phones__dropdown--select-option"
              value="alphabet"
            >
              Alphabetically
            </option>
            <option
              className="phones__dropdown--select-option"
              value="cheapest"
            >
              Cheapest
            </option>
          </select>
        </div>
        <div className="phones__dropdown">
          <label
            htmlFor="items"
            className="phones__dropdown--title"
          >
            Items on page
          </label>
          <select
            className="phones__dropdown--select"
            name="sort-by"
          >
            <option
              className="phones__dropdown--select-option"
              value="4"
            >
              4
            </option>
            <option
              className="phones__dropdown--select-option"
              value="8"
            >
              8
            </option>
            <option
              className="phones__dropdown--select-option"
              value="16"
            >
              16
            </option>
            <option
              className="phones__dropdown--select-option"
              value="all"
            >
              All
            </option>
          </select>
        </div>
      </div>
      <div className="phones__list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

import { useState } from 'react';
import { Breadcrumbs } from '../../Components/Breadcrumbs';
import { ProductCard } from '../../Components/ProductCard';
import { Phone } from '../../Types/Phone';
import './Phones.scss';
import { Sortby } from '../../Types/Sortby';
import { ItemsPerPage } from '../../Types/ItemsOnPage';

type Props = {
  products: Phone[] | null,
};

export const Phones: React.FC<Props> = ({ products }) => {
  // eslint-disable-next-line max-len
  // const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(ItemsPerPage.Four);
  const [sortby, setSortby] = useState<Sortby>(Sortby.Newest);
  const [phones, setPhones] = useState<Phone[] | null>(products);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as Sortby;

    switch (selectedSort) {
      case Sortby.Cheapest:
        setPhones(phones?.sort((a, b) => a.price - b.price) ?? null);
        break;
      case Sortby.Newest:
        setPhones(phones?.sort((a, b) => b.year - a.year) ?? null);
        break;
      case Sortby.Alphabet:
        setPhones(phones?.sort((a, b) => a.name.localeCompare(b.name)) ?? null);
        break;
      default:
        break;
    }

    setSortby(selectedSort);
  };

  return (
    <div className="phones">
      <Breadcrumbs />
      <h1 className="phones__title">Mobile phones</h1>
      <div className="phones__counter">{`${products?.length} models`}</div>
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
            value={sortby}
            onChange={handleSortChange}
          >
            <option
              className="phones__dropdown--select-option"
              value={Sortby.Newest}
            >
              {Sortby.Newest}
            </option>
            <option
              className="phones__dropdown--select-option"
              value={Sortby.Alphabet}
            >
              {Sortby.Alphabet}
            </option>
            <option
              className="phones__dropdown--select-option"
              value={Sortby.Cheapest}
            >
              {Sortby.Cheapest}
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
              value={ItemsPerPage.Four}
            >
              {ItemsPerPage.Four}
            </option>
            <option
              className="phones__dropdown--select-option"
              value={ItemsPerPage.Eight}
            >
              {ItemsPerPage.Eight}
            </option>
            <option
              className="phones__dropdown--select-option"
              value={ItemsPerPage.Sixteen}
            >
              {ItemsPerPage.Sixteen}
            </option>
            <option
              className="phones__dropdown--select-option"
              value={ItemsPerPage.All}
            >
              {ItemsPerPage.All}
            </option>
          </select>
        </div>
      </div>
      <div className="phones__list">
        {phones?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

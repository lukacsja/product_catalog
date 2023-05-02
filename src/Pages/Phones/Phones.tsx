import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../Components/Breadcrumbs';
import { ProductCard } from '../../Components/ProductCard';
import { Phone } from '../../Types/Phone';
import './Phones.scss';
import { Sortby } from '../../Types/Sortby';
import { Pagination } from '../../Components/Pagination';

type Props = {
  products: Phone[],
};

export const Phones: React.FC<Props> = ({ products }) => {
  const [perPage, setPerPage] = useState<number>(4);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortUrls = searchParams.get('sort') || Sortby.NEWEST;
  const [sortby, setSortby] = useState<Sortby>(sortUrls as Sortby);
  const [phones, setPhones] = useState<Phone[]>(products);

  const currentPage = Number(searchParams.get('page'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentPage) {
      searchParams.set('page', '1');
    }

    searchParams.set('sort', sortby);
    navigate(`?${searchParams.toString()}`);
  }, [sortby]);

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return phones.slice(startIndex, endIndex);
  };

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [currentPage]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as Sortby;

    switch (selectedSort) {
      case Sortby.CHEAPEST:
        setPhones(phones.sort((a, b) => a.price - b.price));
        break;
      case Sortby.NEWEST:
        setPhones(phones.sort((a, b) => b.year - a.year));
        break;
      case Sortby.ALPHABET:
        setPhones(phones.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      default:
        break;
    }

    setSortby(selectedSort);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'All') {
      setPerPage(phones.length);
    } else {
      setPerPage(Number(selectedValue));
    }
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
              value={Sortby.NEWEST}
            >
              {Sortby.NEWEST}
            </option>
            <option
              className="phones__dropdown--select-option"
              value={Sortby.ALPHABET}
            >
              {Sortby.ALPHABET}
            </option>
            <option
              className="phones__dropdown--select-option"
              value={Sortby.CHEAPEST}
            >
              {Sortby.CHEAPEST}
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
            onChange={handlePerPageChange}
          >
            <option
              className="phones__dropdown--select-option"
              value={4}
            >
              4
            </option>
            <option
              className="phones__dropdown--select-option"
              value={8}
            >
              8
            </option>
            <option
              className="phones__dropdown--select-option"
              value={16}
            >
              16
            </option>
            <option
              className="phones__dropdown--select-option"
              value="All"
            >
              All
            </option>
          </select>
        </div>
      </div>
      <div className="phones__list">
        {getCurrentItems().map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {getCurrentItems().length && (
        <Pagination
          totalItems={products.length}
          itemsPerPage={perPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

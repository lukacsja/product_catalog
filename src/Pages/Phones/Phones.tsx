import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../Components/Breadcrumbs';
import { ProductCard } from '../../Components/ProductCard';
import { Phone } from '../../Types/Phone';
import './Phones.scss';
import { Sortby } from '../../Types/Sortby';
import { Pagination } from '../../Components/Pagination';
import { PerPage } from '../../Types/PerPage';

type Props = {
  products: Phone[],
};

export const Phones: React.FC<Props> = ({ products }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortUrls = searchParams.get('sort') || Sortby.NEWEST;
  const perPageUrls = searchParams.get('perpage') || 'All';

  const [phones, setPhones] = useState<Phone[]>(products);
  const [sortby, setSortby] = useState<Sortby>(sortUrls as Sortby);
  const [perPage, setPerPage] = useState<PerPage>(perPageUrls as PerPage);

  // eslint-disable-next-line no-console
  console.log(perPage);

  const currentPage = Number(searchParams.get('page'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentPage) {
      searchParams.set('page', '1');
    }

    searchParams.set('sort', sortby);

    searchParams.set('perpage', String(perPage));

    navigate(`?${searchParams.toString()}`);
  }, [sortby, perPage]);

  const getCurrentItems = () => {
    let startIndex;
    let endIndex;

    if (perPage === 'All') {
      startIndex = (currentPage - 1) * phones.length;
      endIndex = startIndex + phones.length;
    } else {
      startIndex = (currentPage - 1) * perPage;
      endIndex = startIndex + perPage;
    }

    return phones.slice(startIndex, endIndex);
  };

  // isPaginationVisibe =

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

    setPerPage(Number(selectedValue) || 'All');
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
            value={perPage}
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

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
  products: Phone[] | null,
};

export const Phones: React.FC<Props> = ({ products }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortUrls = searchParams.get('sort') || Sortby.NEWEST;
  const perPageUrls = searchParams.get('perpage') || 'All';

  const [phones, setPhones] = useState<Phone[] | null>(products);
  const [sortby, setSortby] = useState<Sortby>(sortUrls as Sortby);
  const [perPage, setPerPage] = useState<PerPage>(perPageUrls as PerPage);

  const currentPage = Number(searchParams.get('page'));
  const navigate = useNavigate();

  useEffect(() => {
    searchParams.set('page', '1');
    searchParams.set('perpage', String(perPage));
    searchParams.set('sort', sortby);

    navigate(`?${searchParams.toString()}`);
  }, [sortby, perPage]);

  const getCurrentItems = () => {
    let startIndex;
    let endIndex;

    if (perPage === 'All') {
      startIndex = 0;
      endIndex = phones?.length;
    } else {
      startIndex = (currentPage - 1) * perPage;
      endIndex = startIndex + Number(perPage);
    }

    return phones?.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);

    const initialSortBy = urlSearchParams.get('sort') as Sortby
      || Sortby.NEWEST;

    setSortby(initialSortBy);

    const initialPerPage = urlSearchParams.get('perpage') as PerPage || 'All';

    setPerPage(initialPerPage);

    switch (initialSortBy) {
      case Sortby.CHEAPEST:
        setPhones(products?.sort((a, b) => a.price - b.price) ?? null);
        break;
      case Sortby.NEWEST:
        setPhones(products?.sort((a, b) => b.year - a.year) ?? null);
        break;
      case Sortby.ALPHABET:
        setPhones(products?.sort(
          (a, b) => a.name.localeCompare(b.name),
        ) ?? null);
        break;
      default:
        break;
    }
  }, [location.search]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as Sortby;

    switch (selectedSort) {
      case Sortby.CHEAPEST:
        setPhones(products?.sort((a, b) => a.price - b.price) ?? null);
        break;
      case Sortby.NEWEST:
        setPhones(products?.sort((a, b) => b.year - a.year) ?? null);
        break;
      case Sortby.ALPHABET:
        setPhones(products?.sort(
          (a, b) => a.name.localeCompare(b.name),
        ) ?? null);
        break;
      default:
        break;
    }

    setSortby(selectedSort);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setPerPage(selectedValue as PerPage);
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
        {getCurrentItems()?.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isDiscounted
          />
        ))}
      </div>
      {products?.length && (
        <Pagination
          totalItems={products?.length}
          itemsPerPage={perPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

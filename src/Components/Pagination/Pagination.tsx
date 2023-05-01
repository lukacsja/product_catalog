import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  totalItems: number,
  itemsPerPage: number,
  urlPrefix: string,
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  urlPrefix,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`/${urlPrefix}/${pageNumber}`);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const pageNumber = parseInt(location.pathname.split('/').pop() || '1', 10);

    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  }, [location, currentPage]);

  const getPageButtons = () => {
    const pageButtons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, currentPage
      - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // eslint-disable-next-line no-plusplus
    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <li key={page}>
          <button
            type="button"
            title="button"
            onClick={() => handleClick(page)}
            className={cn('pagination__item', {
              'pagination__item--isActive': currentPage === page,
            })}
          >
            {page}
          </button>
        </li>,
      );
    }

    return pageButtons;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__arrow">
          <button
            aria-label="prev page"
            type="button"
            onClick={() => handleClick(currentPage - 1)}
            className="pagination__item pagination__item--prev"
            disabled={currentPage === 1}
          />
        </li>
        {getPageButtons()}
        <li className="pagination__arrow">
          <button
            aria-label="next page"
            type="button"
            onClick={() => handleClick(currentPage + 1)}
            className="pagination__item pagination__item--next"
            disabled={currentPage === totalPages}
          />
        </li>
      </ul>
    </div>
  );
};

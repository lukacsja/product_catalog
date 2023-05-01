import cn from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handlePrevLink = () => {
    if (currentPage > 1) {
      searchParams.set('page', String(currentPage - 1));

      return `?${searchParams.toString()}`;
    }

    return '';
  };

  const handleNextLink = () => {
    if (currentPage < totalPages) {
      searchParams.set('page', String(currentPage + 1));

      return `?${searchParams.toString()}`;
    }

    return '';
  };

  const getPageLinks = () => {
    const pageLinks = [];
    const maxVisibleLinks = 5;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { pathname } = useLocation();

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleLinks / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleLinks - 1);

    if (endPage - startPage + 1 < maxVisibleLinks) {
      startPage = Math.max(1, endPage - maxVisibleLinks + 1);
    }

    for (let page = startPage; page <= endPage; page += 1) {
      searchParams.set('page', String(page));
      const pageLink = `?${searchParams.toString()}`;

      pageLinks.push(
        <li key={page}>
          <Link
            to={pageLink}
            className={cn('pagination__item', {
              'pagination__item--isActive': currentPage === page,
            })}
          >
            {page}
          </Link>
        </li>,
      );
    }

    return pageLinks;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__arrow">
          <Link
            to={handlePrevLink()}
            className={cn(
              'pagination__item pagination__item--prev',
              { 'pagination__item--prev-disabled': currentPage === 1 },
            )}
          />
        </li>
        {getPageLinks()}
        <li className="pagination__arrow">
          <Link
            to={handleNextLink()}
            className={cn(
              'pagination__item pagination__item--next',
              { 'pagination__item--next-disabled': currentPage === totalPages },
            )}
          />
        </li>
      </ul>
    </div>
  );
};

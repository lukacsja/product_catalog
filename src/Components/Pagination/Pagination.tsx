import cn from 'classnames';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  totalItems: number,
  itemsPerPage: number,
  urlPrefix: string,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  urlPrefix,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevLink = () => {
    if (currentPage > 1) {
      return `/${urlPrefix}/${currentPage - 1}`;
    }

    return '';
  };

  const handleNextLink = () => {
    if (currentPage < totalPages) {
      return `/${urlPrefix}/${currentPage + 1}`;
    }

    return '';
  };

  const getPageLinks = () => {
    const pageLinks = [];
    const maxVisibleLinks = 5;

    let startPage = Math.max(1, currentPage
      - Math.floor(maxVisibleLinks / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleLinks - 1);

    if (endPage - startPage + 1 < maxVisibleLinks) {
      startPage = Math.max(1, endPage - maxVisibleLinks + 1);
    }

    for (let page = startPage; page <= endPage; page += 1) {
      pageLinks.push(
        <li key={page}>
          <NavLink
            to={`/${urlPrefix}/${page}`}
            className={cn('pagination__item', {
              'pagination__item--isActive': currentPage === page,
            })}
          >
            {page}
          </NavLink>
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

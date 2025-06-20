import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../hooks/usePagination";

import "./../../styles/Paginator.css";

interface IPaginatorProps {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  className?: string;
}

const Paginator = (props: IPaginatorProps) => {
  const {
    onPageChange,
    totalCount,
    currentPage,
    pageSize,
    siblingCount = 1,
    className = null,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as [];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", {
        ...(className && { [className]: true }),
      })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        const key = `paginator-pill-${index}`;

        if (pageNumber === DOTS) {
          return (
            <li key={key} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={key}
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Paginator;

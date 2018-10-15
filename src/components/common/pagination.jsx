import React from 'react';
import _ from 'lodash';

const Pagination = ({ pagesTotal, currentPage, onPageChange }) => {
  const pages = _.range(1, pagesTotal + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* {[...Array(pagesTotal)].map((elem, ind) => (
        <li key={ind} className={`page-item text-dark ${currentPage === ind ? 'active' : ''}`}>
          <button onClick={() => onPageChange(ind)} className="page-link">
            {ind + 1}
          </button>
        </li>
      ))} */}
        {/* {_.times(pagesTotal, ind => (
          <li key={ind} className={`page-item text-dark ${currentPage === ind ? 'active' : ''}`}>
            <button onClick={() => onPageChange(ind)} className="page-link">
              {ind + 1}
            </button>
          </li>
        ))} */}
        {pages.map(page => (
          <li key={page} className={`page-item text-dark ${currentPage === page ? 'active' : ''}`}>
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

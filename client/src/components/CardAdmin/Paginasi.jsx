import React, { useState } from 'react';
import "./pagin.css"

const Pagin = ({ itemsPerPage, totalItems, paginate }) => {
  const totalPage = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    totalPage.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {totalPage.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagin;

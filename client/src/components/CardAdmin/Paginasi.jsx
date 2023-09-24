import React, { useState } from "react";
import "./card.css";

const Paginasi = ({ itemsPerPage, totalItems, paginate }) => {
  const totalPage = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    totalPage.push(i);
  }

  return (
    <div className="join flex gap-10 justify-center">
        {totalPage.map(number => (
            <button onClick={() => paginate(number)} className="p-3 text-lg font-bold join-item btn page-link">{number}</button>
        ))}
    </div>
    // <nav>
    //   <ul className="pagination">
    //     {totalPage.map(number => (
    //       <li key={number} className="page-item">
    //         <button onClick={() => paginate(number)} className="page-link">
    //           {number}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
  );
};

export default Paginasi;
import React, { useState } from "react";
import Pagination from "./Pagin";

const ItemList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Data daftar item Anda
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 23" },
    { id: 4, name: "Item 24" },
    { id: 5, name: "Item 25" },
    { id: 6, name: "Item 2" },
    { id: 7, name: "Item 2" },
    { id: 8, name: "Item 2" },
    { id: 9, name: "Item 2" },
    { id: 10, name: "Item 2" },
    { id: 11, name: "Item 2" },
    { id: 12, name: "Item 2" },
    { id: 13, name: "Item 2" },
    { id: 14, name: "Item 2" },
    { id: 15, name: "Item 2" },
    { id: 16, name: "Item 2" },
    { id: 17, name: "Item 2" },
    { id: 18, name: "Item 2" },
    { id: 19, name: "Item 2" },
    { id: 20, name: "Item 2" },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (totalPage) => setCurrentPage(totalPage);

  return (
    <div>
      <div className="h-60">
        {/* item yang ditampilin*/}
        {currentItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>

      {/* paginasinya */}
      <div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ItemList;

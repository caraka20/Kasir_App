import React from "react";

const NavDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-2 ml-[250px]">
        <button className="rounded-xl text-white bg-customPrimary w-[35%] my-[50px] px-[10px] py-[8px]">
          ProdukList
        </button>
        <button className="rounded-xl text-white bg-customPrimary w-[35%] my-[50px] px-[10px] py-[8px]">
          Cashier
        </button>
      </div>
    </div>
  );
};

export default NavDashboard;

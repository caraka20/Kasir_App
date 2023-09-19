import React from "react";
import Input from "../Input/Input";

//icons

import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";

const OrderSummaryCard = (props) => {
  return (
    <div className={`border-b-2 pb-[20px] ${props.className}`}>
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-lg font-medium">Nasi Goreng</h1>
          <h1 className="text-gray-500 text-sm">Extra Cheese</h1>
          <Input />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-xl ">$25</h1>
          <h1 className="ml-[20px] text-gray-400">x1</h1>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;

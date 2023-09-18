import React from "react";
import Input from "../Input/Input";

//icons

import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";

const OrderSummaryCard = () => {
  return (
    <div className="border-b-2 pb-[20px] ">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Nasi Goreng</h1>
        <h1 className="font-bold">$25</h1>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-gray-500 text-sm">Extra Cheese</h1>
          <Input />
        </div>
        <div className="flex gap-4 items-center">
          <HiMinus className="cursor-pointer border-[1px] border-gray-400 text-customPrimary bg-white rounded-full text-xl"  />
          <h1 className="font-medium text-xl">2</h1>
          <HiPlus className="cursor-pointer bg-customPrimary text-white text-xl rounded-full"  />
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;

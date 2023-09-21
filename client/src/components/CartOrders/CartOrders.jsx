import React from "react";
import Input from "../Input/Input";

//icons

import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";

const CartOrders = (props) => {
  const { datas } = props;

  return (
    <div className="border-b-2 pb-[20px] ">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">{datas.produk.nama_produk}</h1>
        <h1 className="font-bold">{`Rp.${datas.produk.harga}`}</h1>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Input />
        </div>
        <div className="flex gap-4 items-center">
          <HiMinus className="cursor-pointer border-[1px] border-gray-400 text-customPrimary bg-white rounded-full text-xl" />
          <h1 className="font-medium text-xl">{datas.quantity}</h1>
          <HiPlus className="cursor-pointer bg-customPrimary text-white text-xl rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CartOrders;

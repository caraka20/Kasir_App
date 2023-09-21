import React from "react";
import Input from "../Input/Input";

//icons

import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";

const OrderSummaryCard = (props) => {
  const { datas } = props;

  console.log(datas);

  if(!datas) return <div>SABAR BOS</div>;
  return (
    <>
      {datas.map((value) => {
        return (
          <div className={`border-b-2 pb-[20px] ${props.className}`}>
            <div className="flex items-center justify-between ">
              <div>
                <h1 className="text-lg font-medium">{value.product_name}</h1>
                <h1 className="text-gray-500 text-sm">notes</h1>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="font-bold text-xl ">{`Rp.${value.product_price}`}</h1>
                <h1 className="ml-[20px] text-gray-400">{`x${value.quantity}`}</h1>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderSummaryCard;

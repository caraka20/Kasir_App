import React, { useEffect, useState } from "react";
import Input from "../Input/Input";

//icons

import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import axios from "axios";
import { Instance } from "../../api/instance";

const OrderSummaryCard = (props) => {
  const { datas, transaction_uid } = props;

  const [transactionDatas, setDatasTransaction] = useState([])

  const getApi = async () => {
    try {
      const res = await Instance().post(
        "transaction/transactionUID",
        { transaction_uid: transaction_uid }
      );

      setDatasTransaction(res.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi()
  }, [transactionDatas]);



  if (transactionDatas.length === 0) return <div>SABAR BOS</div>;
  return (
    <>
      {transactionDatas.map((value) => {
        const price = value.product_price * value.quantity
        return (
          <div className={`border-b-2 pb-[20px] ${props.className}`}>
            <div className="flex items-center justify-between ">
              <div>
                <h1 className="text-lg font-medium">{value.product_name}</h1>
                <h1 className="text-gray-500 text-sm">notes</h1>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="font-bold text-xl ">{`Rp.${price}`}</h1>
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
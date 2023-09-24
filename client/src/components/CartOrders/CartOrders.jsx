import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { useRef } from "react";

//icons
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";

import axios from "axios";

const CartOrders = (props) => {
  const { datas , increment, decrement} = props;

  const [qty, setQty] = useState(0);

  useEffect(() => {}, [datas]);

  const onMinus = (id) => {
    console.log(id);
  };

  // const onPlus = async (id) => {
  //   try {
  //     const add = await axios.put(
  //       "http://localhost:3001/transaction/quantity",
  //       { idProduct: id }
  //     );

  //     const updatedDatas = datas.map((item) =>
  //       id === item.id ? { ...item, quantity: item.quantity + 1 } : item
  //     );

  //     // updateDatas(updatedDatas);
  //     test(updatedDatas)


  //     // setCart(add.data.cart);
  //     // setCart((cart) =>
  //     //   cart.map((item) =>
  //     //     id === item.id ? { ...item, quantity: item.quantity + 1 } : item
  //     //   )
  //     // );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {datas.map((value, index) => {
        return (
          <div className="border-b-2 pb-[20px] ">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-medium">
                {value.produk.nama_produk}
              </h1>
              <h1 className="font-bold">{`Rp.${value.produk.harga}`}</h1>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <Input desk={value.produk.deskripsi} />
              </div>
              <div className="flex gap-4 items-center">
                <HiMinus
                  onClick={() => decrement(value.id)}
                  className="cursor-pointer border-[1px] border-gray-400 text-customPrimary bg-white rounded-full text-xl"
                />
                <h1 className="font-medium border-none    text-xl">
                  {value.quantity}
                </h1>

                <HiPlus
                  onClick={() => increment(value.id)}
                  className="cursor-pointer bg-customPrimary text-white text-xl rounded-full"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartOrders;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import { Instance } from "../../api/instance";
const moment = require("moment");
const ModalReceipt = (props) => {
  const [receiptDatas, setReceiptDatas] = useState(null);
  const [transactionDatas, setTransactionDatas] = useState([]);
  const location = useLocation().search;
  const transaction_uid = new URLSearchParams(location).get("transaction_uid");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "1000px",
      height: "auto",
      borderRadius: "30px",
      position: "relative",
    },
  };

  const getApi1 = async () => {
    try {
      const getDatasByTransactionId = await Instance().post(
        "transaction/receipt",
        { transaction_id: transaction_uid }
      );

      setReceiptDatas(getDatasByTransactionId.data.receiptByIdTransaction);
      setTransactionDatas(
        getDatasByTransactionId.data?.transactionByIdTransaction
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi1();
  }, []);

  useEffect(() => {
    console.log(receiptDatas?.transaction_uid);
  }, [receiptDatas]);

  const createdAtTimestamp = receiptDatas?.createdAt;
  const formattedCreatedAt = moment(createdAtTimestamp).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  const vat = Math.floor(receiptDatas?.total_price * 0.1);
  const total = receiptDatas?.total_price + vat;
  const changes = receiptDatas?.customer_money - total;

  return (
    // <Modal style={customStyles} isOpen={true}>
    <div className="flex">
      <LeftSideBar />
      <div className="px-[200px] mt-[100px] w-full ">
        <div className="px-[20px] border-2  rounded-3xl py-[100px]">
          <div className="">
            <h1 className="text-center mb-[20px] text-4xl">RECEIPT</h1>
            <h1 className="text-center text-3xl">{`Thanks ${receiptDatas?.customer_name}`}</h1>
          </div>
          <h1 className="text-3xl text-customPrimary mb-[20px]">
            Order Summary
          </h1>
          <div className="flex text-xl justify-between">
            <h1 className="">ID TRANSACTION</h1>
            <h1 className="text-customPrimary">
              {receiptDatas?.transaction_uid}
            </h1>
          </div>
          <div className="flex text-xl justify-between">
            <h1 className="">Transaction Date</h1>
            <h1 className="">{formattedCreatedAt}</h1>
          </div>
          <div className=" mb-[20px] mt-[20px] bg-customPrimary h-[10px] w-full "></div>
          <div>
            <div>
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-24 py-3">
                        Product
                      </th>
                      <th scope="col" class="px-24 py-3">
                        Qty
                      </th>
                      <th scope="col" class="px-24 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionDatas.map((value) => {
                      const price = value.product_price * value.quantity;
                      return (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="px-24 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {value.product_name}
                          </th>
                          <td class="px-24 py-3">{`x${value.quantity}`}</td>
                          <td class="px-24 py-3">{`Rp. ${price} `}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* <table className="w-full">
                <thead>
                  <tr>Product</tr>
                  <tr>Qty</tr>
                  <tr>Price</tr>
                </thead>
                {transactionDatas.map((value) => {
                  const price = value.product_price * value.quantity;
                  return (
                    <>
                      {/* <div className="flex justify-between items-center ">
                      <h1 className="">{value.product_name}</h1>
                      <span className="ml-[20px]">{`x${value.quantity}`}</span>
                      <h1>{`Rp. ${price} `}</h1>
                    </div> */}

              {/* <tbody>
                        <td>{value.product_name}</td>
                        <td>{`x${value.quantity}`}</td>
                        <td>{`Rp. ${price} `}</td>
                      </tbody> */}
              {/* </> */}
              {/* );
                })}
              </table> */}
              <div className="  mt-[20px] bg-customPrimary h-[10px] w-full mb-[20px] "></div>
            </div>
            {receiptDatas?.metode_pembayaran_id === 1 ? (
              <div className="">
                <div className="flex justify-between items-center text-lg ">
                  <h1>Sub Total :</h1>
                  <h1>{`Rp. ${receiptDatas?.total_price} `}</h1>
                </div>
                <div className="flex justify-between items-center text-lg ">
                  <h1>VAT(10%) :</h1>
                  <h1>{`Rp. ${vat} `}</h1>
                </div>
                {/* <div className=" mb-[20px] mt-[20px] bg-customPrimary h-[10px] w-full "></div> */}
                <div className="wrap mt-[20px] ">
                  <div className="flex justify-between font-semibold text-2xl items-center  ">
                    <h1>Customer Money :</h1>
                    <h1>{`Rp. ${receiptDatas.customer_money}`}</h1>
                  </div>
                  <div className="flex justify-between font-semibold items-center text-2xl ">
                    <h1>TOTAL :</h1>
                    <h1>{`- Rp. ${total}`}</h1>
                  </div>
                  <div className="flex justify-between font-semibold items-center text-2xl ">
                    <h1>Changes :</h1>
                    <h1>{`Rp. ${changes}`}</h1>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="flex justify-between items-center text-lg ">
                  <h1>Sub Total :</h1>
                  <h1>{`Rp. ${receiptDatas?.total_price} `}</h1>
                </div>
                <div className="flex justify-between items-center text-lg ">
                  <h1>VAT(10%) :</h1>
                  <h1>{`Rp. ${vat}`}</h1>
                </div>
                {/* <div className=" mb-[20px] mt-[20px] bg-customPrimary h-[10px] w-full "></div> */}
                <div className="wrap mt-[20px] ">
                  <div className="flex justify-between font-semibold items-center text-2xl ">
                    <h1>TOTAL :</h1>
                    <h1>{`Rp. ${total} `}</h1>
                  </div>
                  <div className="flex justify-between font-semibold items-center text-2xl ">
                    <h1>Status :</h1>
                    <h1>PAID</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // </Modal>
  );
};

export default ModalReceipt;
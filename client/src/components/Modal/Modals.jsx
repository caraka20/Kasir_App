import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import OrderSummaryCard from "../OrderSummaryCard/OrderSummaryCard";
import InputName from "../../components/InputName/InputName";
import Button from "../Button/Button";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ModalReceipt from "../ModalReceipt/ModalReceipt";
import { useNavigate, Link } from "react-router-dom";
const Modals = (props) => {
  const { datas, transaction_uid, modal } = props;
  // hooks
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectPayment, setSelectPayment] = useState(1);
  const [subTotal, setSubTotal] = useState([]);
  const [subTotal1, setSubTotal1] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [qty, setQty] = useState(0);

  const refCustomerName = useRef();
  const refCustomerMoney = useRef();
  const refCustomerName2 = useRef();

  // api
  const getApi = async () => {
    try {
      const total = await axios.post(
        "http://localhost:3001/transaction/total-price",
        { transaction_uid: transaction_uid }
      );

      setSubTotal(total.data?.data);
      setSubTotal1(total.data?.data[0]?.total_price);
      console.log(total);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(subTotal);
  useEffect(() => {
    getApi();
  }, [transaction_uid, selectPayment]);

  const customStyle = {
    content: {
      width: "1000px",
      height: "600px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
    },
  };

  const handleSelectPayment = (event) => {
    const newSelectedOption = event.target.value;
    setSelectPayment(newSelectedOption);
  };

  const vat = subTotal1 * 0.1;
  const total = Number(subTotal1) + Number(vat);

  const handleConfirmOrder = async () => {
    try {
      if (selectPayment == 1) {
        const changes = refCustomerMoney.current.value - total;

        if (!refCustomerName.current.value || !refCustomerMoney.current.value) {
          toast.error("Customer Name or Customer Money Can Not Empty");
        } else {
          setDisabled(true);
          const onCreateReceipt = await axios.post(
            "http://localhost:3001/transaction/confirm-order",
            {
              total_price: total,
              customer_name: refCustomerName.current.value,
              customer_changes: changes,
              customer_money: refCustomerMoney.current.value,
              transaction_uid: transaction_uid,
              metode_pembayaran_id: selectPayment,
            }
          );

          getApi();
          setModalIsOpen(true);
          toast.success(onCreateReceipt.data.message);

          if (onCreateReceipt.data.isError === false) {
            const deleteCart = await axios.post(
              "http://localhost:3001/transaction/delete-cart",
              {
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NTM3MzMyLCJleHAiOjE2OTU2MjM3MzJ9.9GITtZ1LFy8FWVdJTM8r2qUKxfR3OPJNxGcU9Y09T0Y",
              }
            );
            console.log(deleteCart);
          }
          setTimeout(() => {
            navigate(`/receipt?transaction_uid=${transaction_uid}`);
          }, 3000);
        }
      } else {
        if (!refCustomerName.current.value) {
          return toast.error("Customer Name Can Not Empty");
        }
        setDisabled(true);
        const onCreateReceipt = await axios.post(
          "http://localhost:3001/transaction/confirm-order",
          {
            total_price: total,
            customer_name: refCustomerName.current?.value,
            customer_changes: null,
            customer_money: null,
            transaction_uid: transaction_uid,
            metode_pembayaran_id: selectPayment,
          }
        );

        toast.success(onCreateReceipt.data.message);

        if (onCreateReceipt.data.isError === false) {
          const deleteCart = await axios.post(
            "http://localhost:3001/transaction/delete-cart",
            {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NTM3MzMyLCJleHAiOjE2OTU2MjM3MzJ9.9GITtZ1LFy8FWVdJTM8r2qUKxfR3OPJNxGcU9Y09T0Y",
            }
          );
          console.log(deleteCart);
        }

        setTimeout(() => {
          navigate(`/receipt?transaction_uid=${transaction_uid}`);
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setDisabled(false);
    }
  };

  

  return (
    <Modal style={customStyle} isOpen={props.isOpen}>
      <div className="h-full flex ">
        <div className="left-side h-full overflow-scroll w-[60%] px-[20px]">
          <div className="flex justify-between items-center">
            <div className="text-4xl">Transaction UID</div>
            <h1 className="text-2xl">{transaction_uid}</h1>
          </div>
          <div className="h-full w-full   mt-[50px]">
            {/* {datas.map((value) => {
              console.log(value); */}
            <OrderSummaryCard
              datas={datas}
              className=""
              transaction_uid={transaction_uid}
            />
            {/* })} */}
          </div>
        </div>
        <div className="right-side px-[20px]  w-[40%] ">
          <h1 className="text-4xl">Total Price</h1>
          <div className="text-lg border-b-2 h-[100px]">
            <div className="flex items-center justify-between mt-[50px] ">
              <h1>Sub Total : </h1>
              {subTotal.map((value) => {
                return <h1>{`Rp. ${value.total_price}`}</h1>;
              })}
            </div>
            <div className="flex items-center justify-between mt-[10px] ">
              <h1>VAT (10%) : </h1>
              <h1>{vat}</h1>
            </div>
          </div>
          <div className="flex justify-between items-center mt-[20px] text-2xl">
            <h1>TOTAL : </h1>
            <h1>{`Rp. ${total}`}</h1>
          </div>
          {selectPayment == 1 ? (
            <div className="w-full">
              <select
                value={selectPayment}
                onChange={handleSelectPayment}
                className="select   w-full  focus:border-customPrimary border-customPrimary text-customPrimary  mt-[20px] selected:border-1 rounded-xl"
              >
                <option disabled selected>
                  Choose your payment :
                </option>
                <option value={1}>Cash</option>
                <option value={2}>Bank Mandiri</option>
                <option value={3}>Bank BCA</option>
                <option value={4}>GOPAY</option>
                <option value={5}>DANA</option>
              </select>
              <InputName
                name="Input Customer Name"
                type="text"
                ref={refCustomerName}
                className=""
              />
              <InputName
                ref={refCustomerMoney}
                type="number"
                name="Input Customer Money"
                className=""
              />

              <h1 onClick={modal} className="text-xl text-center mt-[20px] text-customPrimary cursor-pointer">
                CANCEL ORDER
              </h1>
            </div>
          ) : (
            <div className="w-full">
              <select
                value={selectPayment}
                onChange={handleSelectPayment}
                className="select   w-full  focus:border-customPrimary border-customPrimary text-customPrimary  mt-[20px] selected:border-1 rounded-xl"
              >
                <option disabled selected>
                  Choose your payment :
                </option>
                <option value={1}>Cash</option>
                <option value={2}>Bank Mandiri</option>
                <option value={3}>Bank BCA</option>
                <option value={4}>GOPAY</option>
                <option value={5}>DANA</option>
              </select>
              <InputName
                name="Input Customer Name"
                type="text"
                ref={refCustomerName}
                className=""
              />
              <h1 className="text-xl text-center mt-[20px] text-customPrimary cursor-pointer">
                CANCEL ORDER
              </h1>
            </div>
          )}

          <Button
            onClick={handleConfirmOrder}
            btnCSS="mt-[40px] disabled:bg-black"
            btnName="Confirm Order"
            disabled={disabled}
          />
        </div>
        {/* <ModalReceipt isOpen={modalIsOpen} datas={transaction_uid} /> */}
      </div>
      <Toaster />
    </Modal>
  );
};

export default Modals;

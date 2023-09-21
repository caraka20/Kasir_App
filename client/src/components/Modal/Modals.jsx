import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import OrderSummaryCard from "../OrderSummaryCard/OrderSummaryCard";
import InputName from "../../components/InputName/InputName";
import Button from "../Button/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Modals = (props) => {
  const { datas, transaction_uid } = props;


  // hooks
  const [selectPayment, setSelectPayment] = useState(1);
  const [subTotal, setSubTotal] = useState([]);
  
  const refCustomerName = useRef();
  const refCustomerMoney = useRef();
  
  // api
  const getApi = async () => {
    try {
      const total = await axios.post(
        "http://localhost:3001/transaction/total-price",
        { transaction_uid: transaction_uid }
      );
      
      setSubTotal(total.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getApi();
  }, [transaction_uid, selectPayment]);
  

  // if(!datas ) return console.log("raka");
  //     if(!transaction_uid) return console.log("kebon");


  // if (subTotal.length === 0) return console.log("raka");;
  // if (refCustomerMoney.current.value === undefined) {
  //   return console.log("test");
  // }
  
  

  const vat = subTotal.map((value) => value.total_price * 0.1);
  const [total] = subTotal.map((value) => value.total_price - vat);
  
  const changes = refCustomerMoney.current ? refCustomerMoney.current.value - total : 0;
  
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
    },
  };



  
  const handleSelectPayment = (event) => {
    const newSelectedOption = event.target.value;
    setSelectPayment(newSelectedOption);
  };
  console.log(selectPayment);


  


  const handleConfirmOrder = async () => {
    try {
  
  
  
      console.log(refCustomerMoney.current.value);
      if (selectPayment == 1) {
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
          console.log(onCreateReceipt);
          toast.success(onCreateReceipt.data.message)
        } else {
          const onCreateReceipt = await axios.post(
            "http://localhost:3001/transaction/confirm-order",
            {
              total_price: total,
              customer_name: refCustomerName.current.value,
              customer_changes: null,
              customer_money: null,
              transaction_uid: transaction_uid,
              metode_pembayaran_id: selectPayment,
            }
            );
            
            // toast.success(onCreateReceipt.data.message)
            console.log(onCreateReceipt);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message)
        }
      };
      
      // useEffect(() => {console.log(dataTransactions);}, [dataTransactions])
      
      
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
            <OrderSummaryCard datas={datas} className="" />
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
              <h1 className="text-xl text-center mt-[20px] text-customPrimary cursor-pointer">
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
            btnCSS="mt-[40px]"
            btnName="Confirm Order"
          />
        </div>
      </div>
      <Toaster />
    </Modal>
  );
};

export default Modals;

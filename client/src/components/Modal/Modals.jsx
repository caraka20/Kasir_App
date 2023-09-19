import React from "react";
import Modal from "react-modal";
import "./modal.css";
import OrderSummaryCard from "../OrderSummaryCard/OrderSummaryCard";
import InputName from "../../components/InputName/InputName";
import Button from "../Button/Button";




const Modals = (props) => {
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

  return (
    <Modal style={customStyle} isOpen={props.isOpen}>
      <div className="h-full flex ">
        <div className="left-side h-full overflow-scroll w-[60%] px-[20px]">
          <div className="text-4xl">Order Summary</div>
          <div className="h-full w-full   mt-[50px]">
            <OrderSummaryCard className="" />
            <OrderSummaryCard className="" />
            <OrderSummaryCard className="" />
            <OrderSummaryCard className="" />
            <OrderSummaryCard className="" />
            <OrderSummaryCard className="" />
            <OrderSummaryCard className="" />
          </div>
        </div>
        <div className="right-side px-[20px]  w-[40%] ">
          <h1 className="text-4xl">Total Price</h1>
          <div className="text-lg border-b-2 h-[100px]">
            <div className="flex items-center justify-between mt-[50px] ">
              <h1>Sub Total : </h1>
              <h1>$111</h1>
            </div>
            <div className="flex items-center justify-between mt-[10px] ">
              <h1>VAT (10%) : </h1>
              <h1>$11.1</h1>
            </div>
          </div>
          <div className="flex justify-between items-center mt-[20px] text-2xl">
            <h1>TOTAL : </h1>
            <h1>$122.1 </h1>
          </div>
          <div className="w-full">
            <InputName className="" />
            <select className="select   w-full  focus:border-customPrimary border-customPrimary text-customPrimary  mt-[20px] selected:border-1 rounded-xl">
              <option disabled selected>
                Choose your payment :
              </option>
              <option>Tunai</option>
              <option>Gopay</option>
              <option>QRIS</option>
              <option>BNI</option>
            </select>
            <h1 className="text-xl text-center mt-[20px] text-customPrimary">EDIT ORDER</h1>
          </div>
          <Button btnCSS="mt-[40px]" btnName="Confirm Order"/>
        </div>
      </div>
    </Modal>
  );
};

export default Modals;

import React from "react";
import Modal from "react-modal";
const ModalReceipt = (props) => {
    const {datas} = props


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "1000px",
      height: "800px",
      borderRadius: "30px",
      position: "relative",
    },
  };

  return (
    <Modal style={customStyles} isOpen={props.isOpen}>
      <div className="">
        <div className="">
          <h1 className="text-center mb-[20px] text-4xl">Receipt</h1>
          <h1 className="text-center text-3xl">Thanks Name</h1>
        </div>
        <h1 className="text-3xl text-customPrimary mb-[20px]">Order Summary</h1>
        <div className="flex text-xl justify-between">
          <h1 className="">ID TRANSACTION</h1>
          <h1 className="text-customPrimary">09012311</h1>
        </div>
        <div className="flex text-xl justify-between">
          <h1 className="">Transaction Date</h1>
          <h1 className="">July 30, 2022</h1>
        </div>
        <div className=" mb-[20px] mt-[20px] bg-customPrimary h-[10px] w-full "></div>
        <div>
          <div>
            <div className="flex justify-between items-center ">
              <h1 className="">
                Nasi Goreng <span className="ml-[20px]">x1</span>
              </h1>
              <h1>Rp. 10000</h1>
            </div>
            <div className="flex justify-between items-center ">
              <h1 className="">
                Nasi Goreng <span className="ml-[20px]">x1</span>
              </h1>
              <h1>Rp. 10000</h1>
            </div>
            <div className="  mt-[20px] bg-customPrimary h-[10px] w-full mb-[200px] "></div>
          </div>
          <div className="absolute bottom-4 w-full pr-[50px]">
            <div className="flex justify-between items-center text-lg ">
              <h1>Sub Total :</h1>
              <h1>Rp. 20000</h1>
            </div>
            <div className="flex justify-between items-center text-lg ">
              <h1>VAT(10%) :</h1>
              <h1>Rp. 2000</h1>
            </div>
            <div className=" mb-[20px] mt-[20px] bg-customPrimary h-[10px] w-full "></div>
            <div className="wrap mt-[20px] ">
              <div className="flex justify-between font-semibold text-2xl items-center  ">
                <h1>Customer Money :</h1>
                <h1>Rp. 100000</h1>
              </div>
              <div className="flex justify-between font-semibold items-center text-2xl ">
                <h1>TOTAL :</h1>
                <h1>- Rp. 22000</h1>
              </div>
              <div className="flex justify-between font-semibold items-center text-2xl ">
                <h1>Changes :</h1>
                <h1>Rp. 78000</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReceipt;

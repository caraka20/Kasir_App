import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import InputName from "../../components/InputName/InputName";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeftSideBarAdmin from "../../components/LeftSideBarAdmin/LeftSideBarAdmin";

const DetailTransaksi = () => {
  const { awal, akhir } = useParams();
  const [datas, setDatas] = useState(null);
  const [dataTransaksi, setDataTransaksi] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = async (e) => {
    try {
      // console.log(e + "lala");
      const res = await axios.get(`http://localhost:3001/report/${e}`);
      setDataTransaksi(res.data);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataTransaksi);
  const onClose = () => [setIsOpen(false)];

  const getdata = async () => {
    try {
      // console.log("test");
      const res = await axios.get(
        `http://localhost:3001/report/tanggal?awal=${awal}&akhir=${akhir}`
      );
      // console.log(res);
      setDatas(res.data.dataFix.jumlahSemuaTransaksi);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  //   console.log(datas);
  return (
    <div className='grid h-full w-auto bg-customBackground'>
    <div className='flex gap-3 '>
    <LeftSideBarAdmin />
    <div className=' h-full px-12 py-10 border-l-4 border-customPrimary'>
      <div className=" grid justify-center items-center align-middle ">
        <div className="p-5 h-full border shadow-xl grid gap-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr className="border-b-2 border-customPrimary">
                <th scope="col" className="px-10 py-5">
                  No
                </th>
                <th scope="col" className="px-10 py-5">
                  Transaction_UID
                </th>
                <th scope="col" className="px-10 py-5">
                  Action
                </th>
              </tr>
            </thead>
            {!datas ? (
              <span>Tidak Ada Transaksi</span>
            ) : (
              datas.map((item, index) => {
                return (
                <tbody>
                <tr onClick={() => onOpen(item.transaction_uid)} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="text-base font-semibold px-10 pt-5 border-b-2 border-customPrimary cursor-pointer text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-10 text-base font-semibold pt-5 border-b-2 cursor-pointer border-customPrimary">{item.transaction_uid}</td>
                  <td className="px-10 text-base font-semibold pt-5 border-b-2 cursor-pointer border-customPrimary">Cek Transaksi</td>
                </tr>
              </tbody>
                );
              })
            )}
          </table>
        </div>
      </div>

      <Modal isOpen={isOpen}>
        <div className="relative mx-40 overflow-x-auto mt-10 border-customPrimary border">
          <div className="p-5">
            {!dataTransaksi ? (
              <span>Tidak Ada Transaksi</span>
            ) : (
              <div className="grid grid-cols-2 justify-between py-5 ">
                <span>Tanggal : {dataTransaksi[0].createdAt}</span>
                <span>nama_kasir : {dataTransaksi[0].nama_kasir} </span>
                <span>
                  Transaction_UID : {dataTransaksi[0].transaction_uid}{" "}
                </span>
                <span>Customer_Name : {dataTransaksi[0].customer_name} </span>
                <span>
                  status_transaksi : {dataTransaksi[0].status_transaksi}{" "}
                </span>
                <span>
                  {dataTransaksi[0].pembayaran} :{" "}
                  {dataTransaksi[0].tujuan_pembayaran}
                </span>
              </div>
            )}

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs border-black text-gray-900 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="">
                    Product_Name
                  </th>
                  <th scope="col" className="">
                    QTY
                  </th>
                  <th scope="col" className="">
                    Total_Price
                  </th>
                  <th scope="col" className="">
                    product_kategori
                  </th>
                </tr>
              </thead>
              {!dataTransaksi ? (
                <span>Tidak Ada Transaksi</span>
              ) : (
                dataTransaksi.map((item) => {
                  return (
                    <tbody>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className=" font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.product_name}
                        </th>
                        <td className="">{item.quantity}</td>
                        <td className="">{item.product_price}</td>
                        <td className=""> {item.product_kategori} </td>
                      </tr>
                    </tbody>
                  );
                })
              )}
            </table>
          </div>
        </div>
        <div className="cursor-pointer flex justify-end" onClick={onClose}><span className="rounded-xl inline mt-5 m-auto text-white bg-customPrimary px-[10px] py-[8px]">Tutup</span></div>
      </Modal>
    </div>
    </div>
    </div>
  );
};

export default DetailTransaksi;
import React, { useEffect, useState } from "react";
import LeftSideBarAdmin from "../../components/LeftSideBarAdmin/LeftSideBarAdmin";
import { useParams } from "react-router-dom";
import axios from "axios";
const RecordTransaction = () => {
  const { awal, akhir } = useParams();
  const [datas, setDatas] = useState(null);

  const getData = async () => {
    try {
      // console.log("test");
      const res = await axios.get(
        `http://localhost:3001/report/tanggal?awal=${awal}&akhir=${akhir}`
      );
      // console.log(res);
      setDatas(res.data.dataFix.dataAll);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
console.log("lala");
  console.log(datas);
  if (!datas) {
    console.log("tunggu");
  }

  return (
    <div className="grid h-full w-auto bg-customBackground">
      <div className="flex gap-3 ">
        <LeftSideBarAdmin />
        <div className=" h-full w-full px-12 py-10 border-l-4 border-customPrimary">
          <div className="grid bg-slate-400 border-b-4 border-customPrimary">
            <div className="">Nama Laporan : Transaksi Penjualan</div>
            <div className="">Periode : Sun Sep 17 2023 To Sun Sep 18 2023</div>
          </div>

        {
            !datas ? <span>Tidak Ada Transaksi</span> : (
                datas.map((item) => {
                    return (
                        <div className="relative overflow-x-auto mt-10 border-customPrimary border">
                            <div className="p-5">
                        <div className="grid grid-cols-2 justify-between py-5 ">
                          <span>Tanggal : {item.createdAt}</span>
                          <span>nama_kasir : {item.nama_kasir} </span>
                          <span>Transaction_UID : {item.transaction_uid} </span>
                          <span>Customer_Name : {item.customer_name} </span>
                          <span>status_transaksi : {item.status_transaksi} </span>
                          <span> {item.pembayaran} : {item.tujuan_pembayaran} </span>
                        </div>
            
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
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
                        </table>
                        </div>
                      </div>
                    )
                })
            )
        }

        </div>
      </div>
    </div>
  );
};

export default RecordTransaction;
import React from "react";
import LeftSideBarAdmin from "../../components/LeftSideBarAdmin/LeftSideBarAdmin";
// import { useState } from "react";
// Icons from React-icons
import { PiForkKnifeBold } from "react-icons/pi";
import { RiBillFill } from "react-icons/ri";
import { PiBowlFood } from "react-icons/pi";
import { GiFrenchFries } from "react-icons/gi";
import { PiCoffeeFill } from "react-icons/pi";
import { BiDrink } from "react-icons/bi";
import { LuCakeSlice } from "react-icons/lu";
import { BiSolidReport } from "react-icons/bi";

// Components
import Search from "../../components/Search/Search";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import CardAdmin from "../../components/CardAdmin/CardAdmin";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [datas, setDatas] = useState(null);
  const [kategori, setKategori] = useState(null);

  const getData = async () => {
    try {
      const fetchData = await axios.get("http://localhost:3001/product");
      // console.log(fetchData.data.data);
      setDatas(fetchData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKategori = async () => {
    try {
      const res = await axios.get("http://localhost:3001/category");
      // console.log(res.data.data);
      const hasil = res.data.data.filter((item) => {
        return item.status === "active"
      })
      console.log(hasil);
      setKategori(hasil);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getKategori();
  }, []);

  return (
    <div className="screen h-screen flex ">
      <LeftSideBarAdmin />
      <div className="middle w-screen h-full md:px-[50px]  2xl:px-[100px] lg:px-[20px]  overflow-scroll  bg-customBackground">
        <div className="grid grid-cols-2 ml-[250px]">
          <Link to={"/home/admin"}>
            <div className="text-center rounded-xl text-white bg-customPrimary w-[35%] my-[50px] px-[10px] py-[8px]">
              ProdukList
            </div>
          </Link>
          <Link to={"/admin/ListKasir"}>
            <div className="text-center rounded-xl text-white bg-customPrimary w-[35%] my-[50px] px-[10px] py-[8px]">
              Cashier
            </div>
          </Link>
        </div>
        <Search className="" />
        <h1 className="font-bold my-[20px] text-2xl">Category Menu</h1>
        <div className="flex gap-10 w-full overflow-scroll">
          {!kategori ? (
            <span>-</span>
          ) : (
            kategori.map((item) => {
              return (
                <div className="w-[100px] h-[50px] p-5 rounded-2xl bg-white flex flex-col justify-center items-center cursor-pointer ">
                  <div value={item.id} className={`font-normal`}>
                    {item.nama_kategori}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <CardAdmin />
        <div className="Pagination  mt-[100px] flex justify-between mb-[20px]">
          <Button
            btnCSS="test1  text-black w-[200px] bg-white  border-2 border-orange-500 "
            btnName="Previously"
          />
          <Button btnCSS="test2 w-[200px] text-white" btnName="Next" />
        </div>
      </div>
    </div>
  );
};

export default Admin;

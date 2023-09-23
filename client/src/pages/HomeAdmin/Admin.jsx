import React from 'react'
import LeftSideBarAdmin from '../../components/LeftSideBarAdmin/LeftSideBarAdmin'
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
import CardAdmin from '../../components/CardAdmin/CardAdmin';
import Button from "../../components/Button/Button";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Admin = () => {

  const [datas, setDatas] = useState(null)

  const getData = async () => {
    try {
      const fetchData = await axios.get("http://localhost:3001/product")
      console.log(fetchData.data.data);
      setDatas(fetchData.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    getData()
  }, [])

  return (  
  <div className="screen w-screen h-screen flex ">
    <LeftSideBarAdmin />
    <div className="middle w-screen h-full md:px-[50px]  2xl:px-[100px] lg:px-[20px]  overflow-scroll  bg-customBackground">
      <div className='grid grid-cols-2 ml-[250px]'>
      <button className='rounded-xl text-white bg-customPrimary w-[35%] my-[50px] px-[10px] py-[8px]'>
        ProdukList
      </button>
      <button className='rounded-xl text-white bg-customPrimary w-[35%] my-[50px] px-[10px] py-[8px]'>
        Cashier
      </button>
      </div>
      <Search className="mt-[50px]" />
      <h1 className="font-bold my-[20px] text-2xl">Category Menu</h1>
      <div className="flex gap-10 w-full overflow-scroll">
        <CategoryCard
          icons={<PiBowlFood />}
          categoryName="Foods"
          iconsCSS=""
          categoryCSS=""
        />
        <CategoryCard
          icons={<PiBowlFood />}
          categoryName="Foods"
          iconsCSS=""
          categoryCSS=""
        />
        <CategoryCard
          icons={<PiBowlFood />}
          categoryName="Foods"
          iconsCSS=""
          categoryCSS=""
        />
        <CategoryCard
          icons={<PiBowlFood />}
          categoryName="Foods"
          iconsCSS=""
          categoryCSS=""
        />
      </div>
      <div className="flex justify-between items-center mt-[20px]">
        <h1 className=" text-2xl">Foods</h1>
        <div className="flex items-center ">
          <h1>Sort by:</h1>
          <select className="filter select select-ghost text-customPrimary  focus:ring-customPrimary  border-none text-xl bg-customBackground">
            <option className="" disabled selected>
              Select
            </option>
            <option>Foods</option>
            <option>A/Z</option>
            <option>Z/A</option>
            <option>Highest</option>
            <option>Lowest</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-[20px]">
        <CardAdmin />
      </div>

      <div className="Pagination  mt-[100px] flex justify-between mb-[20px]">
        <Button
          btnCSS="test1  text-black w-[200px] bg-white  border-2 border-orange-500 "
          btnName="Previously"
        />
        <Button btnCSS="test2 w-[200px] text-white" btnName="Next" />
      </div>


    </div>
    </div>
  )
}

export default Admin

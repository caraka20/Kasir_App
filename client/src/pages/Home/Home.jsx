import React from "react";

// Icons from React-icons
import { PiForkKnifeBold } from "react-icons/pi";
import { RiBillFill } from "react-icons/ri";
import { PiBowlFood } from "react-icons/pi";
import { GiFrenchFries } from "react-icons/gi";
import { PiCoffeeFill } from "react-icons/pi";
import { BiDrink } from "react-icons/bi";
import { LuCakeSlice } from "react-icons/lu";

// Components
import Search from "../../components/Search/Search";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

const Home = () => {
  return (
    <div className="screen h-screen w-full flex ">
      <div className="left-side w-1/12 h-full bg-white">
        <div className="Logo mt-[50px] cursor-pointer w-full flex justify-center text-customPrimary font-bold text-5xl">
          <PiCoffeeFill />
        </div>
        <div className="Menu w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[50px] border-l-8  border-l-customPrimary rounded">
          <PiForkKnifeBold className="text-4xl text-customPrimary " />
          <h1 className="text-customPrimary">Menu</h1>
        </div>
        <div className="Bills w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded">
          <RiBillFill className="text-4xl text-gray-500 " />
          <h1 className="text-gray-500">Reports</h1>
        </div>
      </div>
      <div className="middle w-8/12 h-full px-[100px]  bg-customBackground">
        <Search className="mt-[50px]" />
        <h1 className="font-bold my-[20px] text-2xl">Category Menu</h1>
        <div className="flex gap-10">
          <CategoryCard
            icons={<PiBowlFood />}
            categoryName="Foods"
            iconsCSS=""
            categoryCSS=""
          />
        </div>
        <div>
          <h1>Foods</h1>
          <div>
            <h1>Sort by:</h1>

          </div>
        </div>
      </div>
      <div className="right-side h-full w-3/12 bg-white"></div>
    </div>
  );
};

export default Home;

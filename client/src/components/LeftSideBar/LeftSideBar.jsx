import React from "react";

import { PiForkKnifeBold } from "react-icons/pi";
import { RiBillFill } from "react-icons/ri";
import { PiCoffeeFill } from "react-icons/pi";
import { BiSolidReport } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="left-side  w-1/12 h-full bg-white">
      <div className="Logo mt-[50px] cursor-pointer w-full flex justify-center text-customPrimary font-bold text-5xl">
        <PiCoffeeFill />
      </div>
      <div className="Menu w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[50px] border-l-8  border-l-customPrimary rounded">
        <PiForkKnifeBold className="text-4xl text-customPrimary " />
        <h1 className="text-customPrimary">Menu</h1>
      </div>
      <Link to="/cashier/profile">
        <div className="Bills w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded">
          <BsFillPersonFill className="text-4xl text-gray-500 " />
          <h1 className="text-gray-500">Profile</h1>
        </div>
      </Link>
    </div>
  );
};

export default LeftSideBar;

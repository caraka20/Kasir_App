import React, { useState } from "react";

import { PiForkKnifeBold } from "react-icons/pi";
import { RiBillFill } from "react-icons/ri";
import { PiCoffeeFill } from "react-icons/pi";
import { BiSolidReport } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillDoorOpenFill } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  const [state, setState] = useState(localStorage.getItem("userId"));
  const [onPage, setOnPage] = useState(2);

  console.log(state);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("userId");

    navigate("/");
  };

  return (
    <div className="left-side  w-1/12 h-full bg-white">
      <Link to={"/cashier"}>
        <div
          className={`Logo mt-[50px] cursor-pointer w-full flex justify-center text-customPrimary font-bold text-5xl`}
        >
          <PiCoffeeFill />
        </div>
      </Link>
      <Link to={"/cashier"}><div
        onClick={() => setOnPage(2)}
        className={`Menu w-full cursor-pointer h-[75px] flex flex-col  justify-center items-center mt-[50px] border-l-8   rounded ${
          onPage === 2 ? " border-l-customPrimary" : "border-l-gray-500"
        }`}
      >
        <PiForkKnifeBold
          className={`text-4xl   ${
            onPage === 2 ? " text-customPrimary" : "text-gray-500"
          }`}
        />
        
        <h1
          className={`  ${
            onPage === 2 ? " text-customPrimary" : "text-gray-500"
          }`}
        >
          Menu
        </h1>
      </div></Link>
      <Link to={`/cashier/profile/${state}`}>
        <div
          onClick={() => setOnPage(3)}
          className={`Menu w-full cursor-pointer h-[75px] flex flex-col  justify-center items-center mt-[50px] border-l-8   rounded ${
            onPage === 3 ? " border-l-customPrimary" : "border-l-gray-500"
          }`}
        >
          <BsFillPersonFill
            className={`text-4xl   ${
              onPage === 3 ? " text-customPrimary" : "text-gray-500"
            }`}
          />
          <h1
            className={`  ${
              onPage === 3 ? " text-customPrimary" : "text-gray-500"
            }`}
          >
            Profile
          </h1>
        </div>
      </Link>

      <div
        onClick={onLogout}
        className="Bills w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded"
      >
        <BsFillDoorOpenFill className="text-4xl text-gray-500 " />
        <h1 className="text-gray-500">Log Out</h1>
      </div>
    </div>
  );
};

export default LeftSideBar;

import React from 'react'
import {PiCoffeeFill} from 'react-icons/pi'
import cashier from '../../assets/image/cashier.png'
import dashboardAdmin from '../../assets/image/dashboardAdmin.png'
import imageLaporan from '../../assets/image/imageLaporan.png'
// import product from '../../assets/image/product.png'
import {BsClipboardPlus} from 'react-icons/bs'
import {TbCategory} from 'react-icons/tb'
import 'boxicons'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import { PiAddressBookBold } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { ImFileText2 } from "react-icons/im";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";


const LeftSideBarAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initial state, the sidebar is open by default
  const nav = useNavigate()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };
  const logOut = async () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    toast.success("Logout Berhasil")
    setTimeout(() => {
      nav("/")
    }, 2000);
    }
  return (
    <div className={`left-side ${isSidebarOpen ? 'w-[15%]' : 'w-[5%]'} border-r-4 border-customPrimary h-screen rounded-md transition-all duration-300 ease-in-out`}>
      {/* <div className='flex justify-center align-middle items-center'>
      <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-full bg-blue-700 hover:bg-blue-800 focus:outline-none"
        >
          {isSidebarOpen ? 'Close' : 'Open'}
        </button>
      </div> */}
       <Toaster />
      <div className='grid overflow-hidden '>
    <div className="Logo cursor-pointer w-full flex justify-center text-customPrimary font-bold text-5xl">
      <PiCoffeeFill  className=' mt-[30px]'/>
    </div>

    <div className={`h-[600px] ${isSidebarOpen ? 'block' : 'hidden'}`}>
      <div className='grid gap-5'>


    <div className="Menu w-full px-5 cursor-pointer h-[75px] flex flex-col mt-[50px] border-l-8  border-l-customPrimary rounded">
      <Link to={"/admin/kasir"}>
      <PiAddressBookBold className="text-4xl text-customPrimary"/>
      <h1 className="text-customPrimary">Create Cashier</h1>
      </Link>
    </div>

    {/* <div className="Menu w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[50px] border-l-8  border-l-customPrimary rounded">
        <PiForkKnifeBold className="text-4xl text-customPrimary " />
        <h1 className="text-customPrimary">Menu</h1>
      </div> */}

<div className="Menu px-5  w-full cursor-pointer h-[75px] flex flex-col  border-l-8  border-l-customPrimary rounded">
      <Link to="/home/admin">
      <LuLayoutDashboard className='text-4xl text-customPrimary'/>
      <h1 className="text-customPrimary">Dashboard</h1>
      </Link>
    </div>
    
    <div className="Menu px-5  w-full cursor-pointer h-[75px] flex flex-col border-l-8  border-l-customPrimary rounded">
      <Link to={"/admin/report"} >
      <ImFileText2 className='text-4xl text-customPrimary'/>
      <h1 className="text-customPrimary">Reports</h1>
      </Link>
    </div>

    <div className="Menu px-5  w-full cursor-pointer h-[75px] flex flex-col border-l-8  border-l-customPrimary rounded">
    <Link to="/produk">

        <BsClipboardPlus className='text-4xl text-customPrimary'/>
      <h1 className='  text-customPrimary'>Create Produk</h1>
    </Link>
    </div>
    
    <div className="Menu px-5  w-full cursor-pointer h-[75px] flex flex-col] border-l-8  border-l-customPrimary rounded">
      <Link to="/Category">
      <TbCategory className='text-4xl text-customPrimary'/>
      <h1 className="text-customPrimary">Create Category</h1>
    </Link>
    </div>

    <div onClick={logOut} className=" px-5 Menu w-full cursor-pointer h-[75px] flex flex-col border-l-8  border-l-customPrimary rounded">
      <TbLogout2 className='text-4xl text-customPrimary'/>
      <h1 className="text-customPrimary">Log Out</h1>
    </div>

    </div>
    </div>
    </div>


  </div>
  )
}

export default LeftSideBarAdmin

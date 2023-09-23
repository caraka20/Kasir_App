import React from 'react'
import {PiCoffeeFill} from 'react-icons/pi'
import cashier from '../../assets/image/cashier.png'
import dashboardAdmin from '../../assets/image/dashboardAdmin.png'
import imageLaporan from '../../assets/image/imageLaporan.png'
// import product from '../../assets/image/product.png'
import {BsClipboardPlus} from 'react-icons/bs'
import {TbCategory} from 'react-icons/tb'
import 'boxicons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// import { Link } from 'react-router-dom'


const LeftSideBarAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initial state, the sidebar is open by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };
  return (
    <div className={`left-side ${isSidebarOpen ? 'w-[10%]' : 'w-[5%]'} h-screen rounded-md transition-all duration-300 ease-in-out`}>
      <div className='flex justify-center'>
      <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-full bg-blue-700 hover:bg-blue-800 focus:outline-none"
        >
          {isSidebarOpen ? 'Close' : 'Open'}
        </button>
      </div>
       
      
    <div className="Logo cursor-pointer w-full flex justify-center text-customPrimary font-bold text-5xl">
      <PiCoffeeFill  className=' mt-[50px]'/>
    </div>

    <div className={`h-[600px] ${isSidebarOpen ? 'block' : 'hidden'}`}>
      <div className='grid gap-5'>
    <div className="Menu w-full cursor-pointer h-[80px] flex flex-col justify-center items-center mt-[50px]">
      <Link to={"/admin/kasir"}>
      <p className="text-4xl text-gray-500" />
      <img className='w-[50px] h-[55px]' src={cashier} alt="" />
      <span className="text-gray-500">Create Cashier</span></Link>
    </div>
    <div className="Dashboard w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded">
      <Link to="/home/admin">
      <p className="text-4xl text-gray-500 " />
      <div className=''>
      <img className='w-[35px] h-[34px]' src={dashboardAdmin} alt="" />
      </div>
      <h1 className="mt-[13px] text-gray-500">Dashboard</h1>
      </Link>
    </div>
    
    <div className="Report w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded">
      <Link to={"/admin/report"} ><p className="text-4xl text-gray-500" />
      <div className=''>
      <img className='w-[35px] h-[34px]' src={imageLaporan} alt="" />
      </div>
      <h1 className="text-gray-500 mt-[13px]">Reports</h1></Link>
    </div>

    <div className='Produk w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] border-l-8  border-l-customPrimary rounded'>
    <Link to="/produk">
      <p className='text-4xl'/>
        <BsClipboardPlus className='w-[35px] h-[34px]'/>
      <h1 className=' text-customPrimary mt-[13px]'>Create Produk</h1>
    </Link>
    </div>
    
    <div className="Category w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded">
    <p className="text-4xl text-gray-500" />
      <Link to="/Category">
      <TbCategory className='w-[35px] h-[34px]'/>
      <h1 className="text-gray-500 mt-[13px]">Create Category</h1>
    </Link>
    </div>

    <div className="Report w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[75px] rounded">
      <p className="text-4xl text-gray-500" />
          <box-icon class="w-[35px] h-[34px] mr-3" name='log-out'></box-icon>
      <h1 className="text-gray-500 ">Log Out</h1>
    </div>

    </div>
    </div>


  </div>
  )
}

export default LeftSideBarAdmin

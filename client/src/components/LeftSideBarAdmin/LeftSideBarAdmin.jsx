import React from 'react'
import {PiCoffeeFill} from 'react-icons/pi'
import cashier from '../../assets/image/cashier.png'
import dashboardAdmin from '../../assets/image/dashboardAdmin.png'
import imageLaporan from '../../assets/image/imageLaporan.png'
// import product from '../../assets/image/product.png'
import {BsClipboardPlus} from 'react-icons/bs'
import {TbCategory} from 'react-icons/tb'
import 'boxicons'

const LeftSideBarAdmin = () => {
  return (
    <div className="left-side w-[10%] h-screen rounded-md">
      
    <div className="Logo cursor-pointer w-full flex justify-center text-customPrimary font-bold text-5xl">
      <PiCoffeeFill  className=' mt-[50px]'/>
    </div>
    <div className='h-[500px]'>
      <div className='grid gap-5'>
    <div className="Menu w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[50px]">
      <p className="text-4xl text-gray-500" />
      <img className='w-[50px] h-[55px]' src={cashier} alt="" />
      <span className="text-gray-500">Create Cashier</span>
    </div>
    <div className="Dashboard w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded">
      <p className="text-4xl text-gray-500 " />
      <div className=''>
      <img className='w-[35px] h-[34px]' src={dashboardAdmin} alt="" />
      </div>
      <h1 className="mt-[13px] text-gray-500">Dashboard</h1>
    </div>
    
    <div className="Report w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded">
      <p className="text-4xl text-gray-500" />
      <div className=''>
      <img className='w-[35px] h-[34px]' src={imageLaporan} alt="" />
      </div>
      <h1 className="text-gray-500 mt-[13px]">Reports</h1>
    </div>

    <div className='Produk w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] border-l-8  border-l-customPrimary rounded'>
      <p className='text-4xl'/>
        <BsClipboardPlus className='w-[35px] h-[34px]'/>
      <h1 className=' text-customPrimary mt-[13px]'>Create Produk</h1>
    </div>

    <div className="Category w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[10px] rounded">
      <p className="text-4xl text-gray-500" />
      <TbCategory className='w-[35px] h-[34px]'/>
      <h1 className="text-gray-500 mt-[13px]">Create Category</h1>
    </div>

    <div className="Report w-full cursor-pointer h-[75px] flex flex-col justify-center items-center mt-[75px] rounded">
      <p className="text-4xl text-gray-500" />
          <box-icon class="w-[35px] h-[34px] mr-3" name='log-out'></box-icon>
      <h1 className="text-gray-500 mt-[13px]">Log Out</h1>
    </div>

    </div>
    </div>
  </div>
  )
}

export default LeftSideBarAdmin

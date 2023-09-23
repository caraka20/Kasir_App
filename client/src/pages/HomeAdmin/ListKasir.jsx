import React from 'react'
import LeftSideBarAdmin from '../../components/LeftSideBarAdmin/LeftSideBarAdmin'
// import { useState } from "react";

import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListKasir = () => {

  const [datas, setDatas] = useState(null)

  const getData = async () => {
    try {
      const fetchData = await axios.get("http://localhost:3001/kasir")
      console.log(fetchData.data.data);
      setDatas(fetchData.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const editStatus = async(e) => {
    try {
      const res = await axios.put(`http://localhost:3001/kasir/${e}`)
      console.log(res.data.message);
      getData()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])
console.log(datas);
  return (  
  <div className="screen w-screen h-screen flex ">
    <LeftSideBarAdmin />
    <div className="middle w-screen h-full md:px-[50px]  2xl:px-[100px] lg:px-[20px]  overflow-scroll  bg-customBackground">
    <div className='grid grid-cols-2 ml-[250px]'>
      <Link to={"/home/admin"}><div className='rounded-xl text-white text-center bg-customPrimary w-[35%] my-[50px] px-[10px] py-[8px]'>
        ProdukList
      </div></Link>
      <Link to={"/admin/ListKasir"}><div className='rounded-xl text-center text-white bg-customPrimary w-[35%] my-[50px] px-[10px] py-[8px]'>
        Cashier
      </div></Link>
      </div>
    <div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          No
        </th>
        <th scope="col" className="px-6 py-3">
          Username
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="w-52 px-6 py-3">
          Status
        </th>
        <th scope="col" className="w-52 px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {
        !datas ? 
        (
        <tr className="bg-white dark:bg-gray-800">
        <th
          scope="row"
          className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
        >
          -
        </th>
        <td className="px-6 py-4">-</td>
        <td className="px-6 py-4">-</td>
        <td className="px-6 py-4">-</td>      </tr>
        ) : 
        datas.map((item, index) => {
          return (
        <tr className={item.status_user === "active" ? "bg-white dark:bg-gray-800" : "bg-white dark:bg-gray-800 opacity-70"}>
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{item.username}</td>
        <td className="px-6 py-4">{item.email}</td>
        <td className="px-6 py-4">{item.status_user}</td>
        <td className="px-6 py-4">
          <div onClick={()=>editStatus(item.id)} className='rounded-xl text-white bg-customPrimary w-28 text-center inline-block px-[10px] py-[8px]'>{item.status_user === "active" ? <span >Non-Active</span> : <span>Active</span>}</div>
        </td>
      </tr>            
          )
        })

      }

    </tbody>
  </table>
</div>



    </div>
    </div>
  )
}

export default ListKasir

import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import { useParams } from 'react-router-dom'



const Profile = () => {
  const [userData, setUserData] = useState({});
  const {id} = useParams()
  const [data, setData] = useState({})
  // console.log(id);

  const getData = async () => {
    try {
      const res = await axios.post("http://localhost:3001/user/map", {token : id})
      // console.log(res.data.data);
      setData(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(data);
  useEffect(() => {
    getData()
  },[])
      return (
        <div className='grid h-full w-auto bg-customBackground'>
          <div className='flex gap-3'>
          <LeftSideBar/>
          <div className='flex justify-center items-center bg-slate-400 h-screen w-full'>
          <Toaster/>
          <div className='rounded-xl w-1/2 bg-blue-200'>
            <div className='flex justify-center mt-10'>
              <label className='font-bold'>User Profile</label>
            </div>
            <div className='m-20 mb-10'>
            <img src='https://img.inews.co.id/media/600/files/inews_new/2022/01/22/yolla_yuliana_2.jpg' className='flex justify-center w-[250px] h-[250px] rounded-full 'alt='user profile'></img>
          <div className="mb-10">
              <h1 className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>ID: {data.id}</h1>
              <h1 className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Nama Lengkap: {data.nama_lengkap}</h1>
              <h1 className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Status: {data.status_user}</h1>
              <h1 className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email: {data.email}</h1>
            </div>
          </div>
          </div>
        </div>
          </div>
        </div>
        
      )
    }
    
    export default Profile
    

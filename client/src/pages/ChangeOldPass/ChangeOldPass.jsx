import React, { useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast'

const ChangeOldPass = () => {
    const [state, setState] = useState({
      oldPassword:"",
      newPassword:""
    })
    // const {password} = useParams()
    // console.log(password)
    const {id} = useParams()
    const nav = useNavigate()
console.log(id);
    const handleChange = (e) => {
      const newState = {...state}
      newState[e.target.name] = e.target.value
      setState(newState)
    }
    const passwordUpdate = async (e) => {
      e.preventDefault()
      try {
        const data = await axios.put(`http://localhost:3001/auth/resetpassword`, {...state, token: id})
        console.log(data)
        toast.success(data.data.message)
        setTimeout(() =>{nav('/')},3000)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
      
    }
    console.log(state);
      return (
        <div className='flex justify-center items-center bg-slate-500 h-screen'>
          <Toaster/>
          <div className='rounded-xl bg-blue-200 w-1/2'>
          <div className='flex justify-center mt-10'>
              <h1 className='text font-bold font-sans'>RESET PASSWORD</h1>
            </div>
          <form className=' m-20 mt-10'>
            <div className='mb-10'>
              <h1>Please insert your old password first, then continue by inserting your new password of choosing</h1>
            </div>
            <div className="mb-6">
              <label htmlFor="oldPassword" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
              <input name="oldPassword" value={state.oldPassword} onChange={handleChange}  type="password" id="oldpassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Input Old Password" required />
            </div>
            <div className="mb-6">
              <label htmlFor="newPassword" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input name="newPassword" value={state.newPassword} onChange={handleChange}  type="password" id="newpassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Input New Password" required />
            </div>
            <div className="flex items-start ">
            </div>
            <button onClick={passwordUpdate} type="submit"className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</button>
          </form>
          </div>
        </div>
      )
    }
    
    export default ChangeOldPass
    
    
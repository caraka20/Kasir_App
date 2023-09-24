import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [state, setState] = useState({
      username:"",
      password:""
    })
    const nav = useNavigate()
    const handleChange = (e) => {
      const newState = {...state}
      newState[e.target.name] = e.target.value
      setState(newState)
    }
    const loginMasuk = async (e) => {
      e.preventDefault()
      if (!state.username) {
        return toast.error('Username required')
      }
      if(!state.password) {
        return toast.error('Password required')
      }
      try {
        const {username, password} = state;
        const data = await axios.get(`http://localhost:3001/user/login?username=${username}&password=${password}`)
        // console.log(data.data.role)
        localStorage.setItem("userId",data.data.data) //encryption masuk ke localstorage
        localStorage.setItem("role",data.data.role) // role
        toast.success(data.data.message)

        if (data.data.role === "admin") {
          setTimeout(() => {nav("/home/admin")}, 2000);
        } else {
          setTimeout(() =>{nav('/cashier')},3000)
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        
      }
      
    }
    // console.log(state);
    // console.log(state)
    console.log(state)
      return (
        <div className='flex justify-center items-center bg-slate-400 h-screen'>
          <Toaster/>
          <div className='rounded-xl w-1/2 bg-blue-200'>
            <div className='flex justify-center mt-10'>
              <label className='font-bold'>Login</label>
            </div>
          <form className=' m-20 mb-10'>
          <div className="mb-10">
              <label htmlFor="username" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input name="username" value={state.username} onChange={handleChange}  type="text" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your username here" required />
            </div>
            <div className="mb-10">
              <label htmlFor="password" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input name="password" value={state.password} onChange={handleChange}  type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your password here" required />
            </div>
            <button onClick={loginMasuk} type="submit" className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          </form>
          </div>
        </div>
      )
    }
    
    export default Login
    

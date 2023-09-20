import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast'

const Login = () => {
    const [state, setState] = useState({
      username:"",
      password:""
    })
    
    const handleChange = (e) => {
      const newState = {...state}
      newState[e.target.name] = e.target.value
      setState(newState)
    }
    const passwordForget = async (e) => {
      e.preventDefault()
      try {
        const data = await axios.get(`http://localhost:3001/auth/forgetpassword?email=${state.email}`)
        console.log(data)
        toast.success(data.data.message)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
      
    }
    console.log(state);
      return (
        <div className='flex justify-center items-center bg-slate-400 h-screen'>
          <Toaster/>
          <div className='rounded-xl bg-blue-200'>
            <div className='flex justify-center mt-10'>
              <label className='font-bold'>It seems you forgot your password ... Lets fix that</label>
            </div>
          <form className=' m-20 mb-10'>
            <div className="mb-10">
              <label htmlFor="email" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input name="email" value={state.email} onChange={handleChange}  type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your email here" required />
            </div>
            <div>
              <label>An email with the link for password recovery will be sent to your mailbox</label>
            </div>
            <button onClick={passwordForget} type="submit" className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          </form>
          </div>
        </div>
      )
    }
    
    export default Login
    

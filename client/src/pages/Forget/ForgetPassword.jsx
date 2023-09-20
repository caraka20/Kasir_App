import React, { useEffect, useState } from 'react'
import axios from "axios"

const ForgetPassword = () => {
    const [state, setState] = useState({
      email:""
    })
    
    const handleChange = (e) => {
      // console.log(e.target.name)
      const newState = {...state}
      newState[e.target.name] = e.target.value
      setState(newState)
    }
    const passwordForget = async (e) => {
      e.preventDefault()
      try {
        const data = await axios.get(`http://localhost:3001/auth/forgetpassword?email=${state.email}`)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      
    }
    console.log(state);
      return (
        <div className='flex justify-center items-center bg-slate-400 h-screen'>
          <div className='rounded-xl bg-blue-200'>
          <form className=' m-20'>
            <div className="mb-6">
              <label htmlFor="email" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input name="email" value={state.email} onChange={handleChange}  type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your email here" required />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input id="terms" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            <button onClick={passwordForget} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          </form>
          </div>
        </div>
      )
    }
    
    export default ForgetPassword
    

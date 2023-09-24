import LeftSideBarAdmin from "../../components/LeftSideBarAdmin/LeftSideBarAdmin";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreateKasir = () => {
  const [state, setState] = useState({
    username: "",
    email : "",
    nama_lengkap : "",
    password: "",
  });
  const [images, setImages] = useState([])

  const handleChange = (e) => {
    const newState = { ...state };
    newState[e.target.name] = e.target.value;
    setState(newState);
  };

  const onSelectImages = (event) => {
    try {
        const files = [...event.target.files]
        files.forEach(value => {
            if(value.size > 1000000 || value.type.split('/')[0] !== 'image') throw {message: `${value.name} Size Too Large / File Must be Image`}
        })

        setImages(files)
    } catch (error) {
        alert(error.message)
    }
}
const onSubmit = async(e) => {
  try {
    e.preventDefault()
      const fd = new FormData()
      fd.append('data', JSON.stringify(state))
      images.forEach(value => {
          fd.append('images', value)
      })
      console.log(fd);
      if(state.nama_lengkap === "" || state.username === "" || state.email === "" || state.password === "" || images.length === 0) {
        return toast.error("Form Harus Dilengkapi")
    }
      await axios.post('http://localhost:3001/kasir', fd)

      toast.success('Data Created!')
  } catch (error) {
      toast.error(error.response.data.message);
  }
}
// console.log(state);
  return (
    <div className="grid h-full w-auto bg-customBackground">
      <div className="flex gap-3 ">
        <LeftSideBarAdmin />
        <div className=" h-full w-full px-12 border-l-4 border-customPrimary">
          <div className="flex justify-center items-center bg-slate-400 h-full">
            <Toaster />
            <div className="rounded-xl mx-10 my-10 w-full md:w-3/4 lg:w-1/2 bg-blue-200">
              <div className="flex justify-center mt-10">
                <label className="font-bold">Register Cashier</label>
              </div>
              <form className="m-5 mb-10">
                <div className="mb-10">
                  <label
                    htmlFor="username"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    name="nama_lengkap"
                    value={state.nama_lengkap}
                    onChange={handleChange}
                    type="text"
                    id="nama_lengkap"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Your username here"
                    required
                  />
                </div>
                <div className="mb-10">
                  <label
                    htmlFor="username"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    type="text"
                    id="username"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Your username here"
                    required
                  />
                </div>
                <div className="mb-10">
                  <label
                    htmlFor="username"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    type="text"
                    id="username"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Your username here"
                    required
                  />
                </div>
                <div className="mb-10">
                  <label
                    htmlFor="username"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    password
                  </label>
                  <input
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Your Password here"
                    required
                  />
                </div>
                <div className="mb-10">
                <label
                    htmlFor="username"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Profile Image
                  </label>
                  <input
type='file' multiple='multiple' onChange={(e) => onSelectImages(e)}
                    id="images"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Your password here"
                    required
                  />
                </div>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateKasir;
import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import { useParams } from 'react-router-dom'
import Modal from "react-modal";
import Button from '../../components/Button/Button'



const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem("userId"))
  const {id} = useParams()
  const [data, setData] = useState(null)
  const [modalImage, setModalImage] = useState(false);
  const [idProduk, setIdProduk] = useState(0);
  const [input, setInput] = useState([])
  const [images, setImages] = useState([]);

  const nav = useNavigate()
  // console.log(id);

  const getData = async () => {
    try {
      const res = await axios.post("http://localhost:3001/user/map", {token : id})
      console.log(res.data.data);
      setData(res.data.data)
      // setTimeout(() =>{nav('')})
    } catch (error) {
      console.log(error);
    }
  }

  const logOut = async () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  toast.success("Logging you out... See you later :V")
  setTimeout(() => {
    nav("/")
  }, 2000);
  }

  const customStyless = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "300px",
    },
  };

  const modalOpenImage = async (e) => {
    try {
      // console.log("llll");
      setIdProduk(e);
      setModalImage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const tutupModelImage = async () => {
    try {
      setModalImage(false);
    } catch (error) {}
  };

  const updateImage = async (e) => {
    try {
      const fd = new FormData();
      // console.log(fd);
      fd.append("data", JSON.stringify(input));
      images.forEach((value) => {
        fd.append("images", value);
      });
      // console.log("blablabla");
      if (images.length === 0) {
        return toast.error("Form Harus Dilengkapi");
      }
      const create = await axios.put(
        `http://localhost:3001/kasir/imageKasir/${e}`,
        fd
      );
      // console.log(create.data.message);
      toast.success(create.data.message);
      setTimeout(() => {
        setModalImage(false);
        getData();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const onSelectImages = (event) => {
    try {
      const files = [...event.target.files];
      files.forEach((value) => {
        if (value.size > 10000000 || value.type.split("/")[0] !== "image")
          throw {
            message: `${value.name} Size Too Large / File Must be Image`,
          };
      });
      setImages(files);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

console.log(data);

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
            {
              !data ? <span>Not Found</span> :
              data.map((item) => {
                return (
            <div className='m-20 mb-10'>
                                          <Modal style={customStyless} isOpen={modalImage}>
                    <button
                      onClick={tutupModelImage}
                      className="rounded-full relative   text-white bg-customPrimary  px-[15px] py-[8px]"
                    >
                      X
                    </button>

                    <div className="grid justify-center item-center mt-[30px]">
                      <label htmlFor="" className="font-serif">
                        Gambar Product
                      </label>
                      <br />
                      <input
                        onChange={(e) => onSelectImages(e)}
                        type="file"
                        multiple="multiple"
                        className="mt-2 mb-5 file-input file-input-bordered w-full max-w-xs bg-white"
                      />
                    </div>
                    <Button
                      onClick={() => updateImage(item.id)}
                      btnName="Edit"
                      btnCSS="my-[10px] w-[150px] text-sm"
                    />
                  </Modal>
            <img onClick={() => modalOpenImage(item.id)}  src={`http://localhost:3001/${item.image_user.substring(7)}`} className='flex justify-center w-[250px] h-[250px] rounded-full 'alt='kebon kebon kebon'></img>
          <div className="mb-10">
              <h1 className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>ID: {item.id}</h1>
              <h1 className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Nama Lengkap: {item.nama_lengkap}</h1>
              <h1 className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Status: {item.status_user}</h1>
              <h1 className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email: {item.email}</h1>
            </div>
            <div>
            <Link to={`/changeoldpass/${userId}`}><p className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</p></Link> 
            <button onClick={logOut} type="OnClick" className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log Out</button>
            </div>
          </div>                  
                )
              })
            }

          </div>
        </div>
          </div>
        </div>
        
      )
    }
    
    export default Profile
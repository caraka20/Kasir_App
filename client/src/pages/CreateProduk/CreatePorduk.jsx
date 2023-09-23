import React, { useEffect, useState } from 'react'
import LeftSideBarAdmin from '../../components/LeftSideBarAdmin/LeftSideBarAdmin'
// import Sidebar from '../../components/LeftSideBarAdmin/Sidebar'
import Button from '../../components/Button/Button'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
// import Sidebar from '../../components/LeftSideBarAdmin/Sidebar'


    const CreatePorduk = () => {
    const [input, setInput] = useState({
        nama_produk:"",
        deskripsi:"",
        stock:"",
        harga:"",
        kategori_produk_id:""
    })

    const [datas, setDatas] = useState(null)
    const [images, setImages] = useState([])

    const getData = async () => {
        try {
            const getData = await axios.get("http://localhost:3001/product")
                setDatas(getData)
                console.log(getData.data.data);
        } catch (error) {
            toast.error(error)
        }
    }
    console.log(datas);
    const onSelectImages = (event) => {
        try {
            const files = [...event.target.files]
            files.forEach(value => {
                if(value.size > 10000000 || value.type.split('/')[0] !== 'image') throw {message: `${value.name} Size Too Large / File Must be Image`}
            })

            setImages(files)
        } catch (error) {
            alert(error.message)
        }
    }
    const createProduk = async () => {
        try {
            const fd = new FormData()
            console.log(fd);
            fd.append('data', JSON.stringify(input))
            images.forEach(value => {
                fd.append('images', value)
            })

            if(input.nama_produk === "" || input.deskripsi === "" || input.harga === "" || input.stock === "" || input.kategori_produk_id === "" || images.length === 0) {
                return toast.error("Form Harus Dilengkapi")
            }

            if(input.harga < 5000) {
                return alert("harga tidak boleh kurang dari 5000")
            }

            if(input.stock < 1) {
                return alert('stock tidak boleh 0 atau minus')
            }

                const findProduk = datas.data.data.find((value) => {
                    return value.nama_produk === input.nama_produk
                })
                console.log(findProduk);
                if(findProduk) {
                    toast.error("Produk Already Exist")
                } 
                const create = await axios.post("http://localhost:3001/product", fd)
                console.log(create.data);
                // toast.success(create)
        } catch (error) {
            console.log(error.message);
            // toast.error(error)
        }
    }
    const handleChange = (e) =>{
        const nama_produk = e.target.name
        const value = e.target.value
        const newData = {
            ...input
        }
        newData[nama_produk] = value
        setInput(newData)
    }
    // console.log(input);

    useEffect(() => {
        getData()
    }, [])

    // console.log();


  return (
    <div className='grid h-screen'>
        <Toaster />
        <div className='flex gap-3'>
            <LeftSideBarAdmin />

            <div className='w-full md:w-[90%] border h-full bg-blue-100'>
                <div className='lg:p-10'>

                    <div className='flex justify-center text-5xl items-center font-semibold border-b-[5px] border-black py-5 mb-10'>


            <div className='w-full md:w-[90%] border h-full bg-blue-100'>
                <div className='lg:p-10'>

                    <div className=' flex justify-center text-5xl items-center font-semibold border-b-[5px] border-black py-5 mb-10'>

                       <div>
                        Create Product
                       </div>
                    </div>

                    {/* Form Input Create Product */}
                        <div className='bg-base-200 shadow-xl rounded-md'>

                            <div className='grid grid-col-2  align-middle'>
                                <div className='grid w-[90%] justify-center mr-10 lg:grid-cols-2 mx-auto mt-5 p-4 pl-8'>

                            <div className='grid align-middle'>
                                <div className='flex justify-between lg:grid-cols-2 mx-auto mt-5 p-4 pl-8'>

                                    
                                    <div>
                                        <label htmlFor="" className='font-serif'>Nama Produk</label><br />
                                        <input name='nama_produk' value={input.nama_produk} onChange={handleChange} type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs'/>
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-serif'>Pilih Kategori</label><br />
                                        <select name='kategori_produk_id' onChange={handleChange} className='select w-full max-w-xs mt-2 mb-5' style={{ width: '100%' }}>
                                            <option disabled selected>Kategori Produk</option>
                                            <option value={1}>Snack</option>
                                            <option value={2}>Main Course</option>
                                            <option value={3}>Coffee</option>
                                            <option value={4}>Non-Coffee</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-serif'>Stock</label><br />
                                        <input name='stock' value={input.stock} onChange={handleChange} type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs'/>
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-serif'>Price</label><br />

                                        <input name='harga' value={input.harga} onChange={handleChange} type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs'/>

                                        <input type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs'/>

                                    </div>

                                        <div className=''>
                                            <label htmlFor="" className='font-serif'>Deskripsi Produk</label><br />
                                            <textarea name='deskripsi' value={input.deskripsi} onChange={handleChange} type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs h-[100px]'/>
                                        </div>

                                        <div className='mt-[30px]'>
                                            <label htmlFor="" className="font-serif">Gambar Hotel</label><br />

                                            <input type='file' multiple='multiple' onChange={(e) => onSelectImages(e)} className="mt-2 mb-5 file-input file-input-bordered w-full max-w-xs bg-white" />
                                        </div>     
                                        
                                        <div></div>
                                        <div className='flex justify-start w-[75%]'>
                                            <Button onClick={createProduk} btnName="Submit" btnCSS="md:w-[50%] md:ml-[120px]"/> 

                                            <input type="file" className="mt-2 mb-5 file-input file-input-bordered w-full max-w-xs bg-white" />
                                        </div>     
                                        
                                        <div></div>
                                        <div className='flex justify-start'>
                                            <Button btnName="Submit" btnCSS="w-[35%] ml-0 md:ml-[120px]"/> 

                                        </div>                            
                                    </div>
                                         
                                        
                                        
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
  )
}

export default CreatePorduk
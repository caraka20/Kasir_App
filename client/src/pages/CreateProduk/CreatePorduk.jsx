import React, { useState } from 'react'
import LeftSideBarAdmin from '../../components/LeftSideBarAdmin/LeftSideBarAdmin'
import Button from '../../components/Button/Button'


    const CreatePorduk = () => {
    const [input, setInput] = useState({
        nama_produk:"",
        deskripsi:"",
        stock:"",
        harga:"",
        kategori_produk_id:""
    })
    

  return (
    <div className='grid h-screen'>
        <div className='flex gap-3'>
        <LeftSideBarAdmin />

            <div className='w-[90%] border h-screen bg-blue-100'>
                <div className='p-10'>

                    <div className=' flex justify-center text-5xl items-center -semibold border-b-[5px] border-black py-5 mb-10'>
                       <div>
                        Create Product
                       </div>
                    </div>

                    {/* Form Input Create Product */}
                        <div className='bg-base-200 shadow-xl rounded-md'>
                            <div className='grid'>
                                <div className='grid grid-cols-2 ml-5 mt-5 p-4 pl-8'>
                                    
                                    <div>
                                        <label htmlFor="" className='font-serif'>Nama Produk</label><br />
                                        <input type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs'/>
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-serif'>Pilih Kategori</label><br />
                                        <select className='select w-full max-w-xs mt-2 mb-5'>
                                            <option disabled selected>Kategori Produk</option>
                                            <option>Snack</option>
                                            <option>Main Course</option>
                                            <option>Coffee</option>
                                            <option>Non-Coffee</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-serif'>Stock</label><br />
                                        <input type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs'/>
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-serif'>Price</label><br />
                                        <input type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs'/>
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-serif'>Pilih Status</label><br />
                                        <select className='select w-full max-w-xs mt-2 mb-5'>
                                            <option disabled selected>Status</option>
                                            <option>Active</option>
                                            {/* <option>Non-Active</option> */}
                                        </select>
                                    </div>

                                        <div className=''>
                                            <label htmlFor="" className='font-serif'>Deskripsi Produk</label><br />
                                            <textarea type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs h-[100px]'/>
                                        </div>

                                        <div className='grid relative bottom-[60px]'>
                                            <label htmlFor="" className="font-serif">Gambar Hotel</label>
                                            <input type="file" className="mt-2 mb-5 file-input file-input-bordered w-full max-w-xs bg-white" />
                                        </div>     
                                        
                                        <div className=''>
                                            <Button btnName="Submit" btnCSS="w-[30%] ml-[150px]"/> 
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

import React from 'react'
import Modal from 'react-modal'
import Button from '../Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';

const ModalEdit = (props) => {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: "1000px",
      height: "600px",
        },
      };

      const [input, setInput] = useState({
        nama_produk:"",
        deskripsi:"",
        stock:"",
        harga:"",
        kategori_produk_id:""
    })

    const [closeModel, setCloseModel] = useState(false)
    
    const tutupModel = async () => {
        try {
            setCloseModel(false)
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(closeModel);
    const handleChange = (e) =>{
        const nama_produk = e.target.name
        const value = e.target.value
        const newData = {
            ...input
        }
        newData[nama_produk] = value
        setInput(newData)
    }

    // const klik = () => {
    //     setCloseModel(true)
    // }
    // useEffect (()=> {

    // }, [closeModel, setCloseModel])

  return (
      <Modal style={customStyles} isOpen={closeModel} onClick={() => props.isOpen(()=>{setCloseModel(true)})} >
        <div className='grid gap-5'>
            <button onClick={tutupModel} className='rounded-full  text-white bg-customPrimary w-[50px] px-[10px] py-[10px]'>
                 X
                </button>

                    <div className='flex justify-center text-5xl items-center font-semibold border-b-[5px] border-black py-5 mb-10'>
                       <div>
                        Edit Product
                       </div>
                    </div>

                    {/* Form Input Create Product */}
                        <div className='bg-base-200 shadow-xl rounded-md'>
                            <div className='grid grid-col-2  align-middle'>
                                <div className='grid w-[90%] justify-center mr-10 lg:grid-cols-2 mx-auto mt-5 p-4 pl-8'>
                                    
                                    <div>
                                        <label htmlFor="" className='font-serif'>Nama Produk</label><br />
                                        <input name='nama_produk' value={input.nama_produk} onChange={handleChange} type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs'/>
                                    </div>

                                    <div>
                                        <label htmlFor="" className='font-serif'>Pilih Kategori</label><br />
                                        <select name='kategori_produk_id' onChange={handleChange} className='select w-full max-w-xs mt-2 mb-5 ' style={{ width: '100%' }}>
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
                                    </div>

                                        <div className=''>
                                            <label htmlFor="" className='font-serif'>Deskripsi Produk</label><br />
                                            <textarea name='deskripsi' value={input.deskripsi} onChange={handleChange} type="text" placeholder='Type here' className='mt-2 mb-5 input input-bordered w-full max-w-xs h-[100px]'/>
                                        </div>  
                                        
                                        <div></div>
                                        <div className='flex justify-start w-[75%]'>
                                            <Button btnName="Edit" btnCSS="md:w-[50%] md:ml-[120px]"/> 
                                        </div>                            
                                    </div>
                                         
                                        
                                        
                                </div>
                            </div>
                        </div>
      </Modal>
  )
}

export default ModalEdit

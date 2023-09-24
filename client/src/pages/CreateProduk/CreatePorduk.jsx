import React from 'react'
import LeftSideBarAdmin from '../../components/LeftSideBarAdmin/LeftSideBarAdmin'
// import Button from '../../components/Button/Button'
import { useState } from 'react';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { useEffect } from 'react';

const CreateCategory = () => {
// const [state, setState] = useState(null)
    const [category, setCategory] = useState({nama_kategori:""});
    const [allCategory, setAllCategory] = useState(null)
    const [idUpdate, setIdUpdate] = useState(0)
    // const [idStatus, setIdStatus] = useState(0)

    const getDataAll = async () => {
       try {
        const findDataCategory = await axios.get("http://localhost:3001/category")
        // console.log(findDataCategory.data.data);
        setAllCategory(findDataCategory.data.data)
       } catch (error) {
          console.log(error.message);
       }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(idUpdate !== 0) {
        if(category.nama_kategori === "") {
          alert("Silahkan isi form")
        }
        const editCategory = await axios.patch(`http://localhost:3001/category/${idUpdate}`, category)
        console.log(editCategory);
        setCategory({nama_kategori:""})
        setIdUpdate(0)
        getDataAll()
      }
      else {
        if(category.nama_kategori === "") {
          alert("Silahkan isi form")
        }
  
        const CreateCategori = await axios.post("http://localhost:3001/category", category)
        console.log(CreateCategori);
        getDataAll()
        setCategory({
          nama_kategori : ""
        })
      }
      
      
    } catch (error) {
      console.log(error);
    }
    // You can add your logic here to handle the form submission
    // console.log('Product Name:', category);
  };

  // ini edit produk dengan menggunakan 2 req dari backend dengan req.body dan req,params
  const edit = async (e) => {
    try {
      console.log(e);
      const data = allCategory.find((value) => {
        return value.id === e
      })
      setIdUpdate(e)
      console.log(data);
      setCategory({nama_kategori: data.nama_kategori})
    } catch (error) {
      console.log(error);
    }
  } 
console.log(allCategory);

  //ini untuk edit status dimana hanya menggunakan 1 req dari backend dengan req.params
  const editStatus = async (id) => {
    try {
      console.log(id);
      const res = await axios.patch(`http://localhost:3001/category/img/${id}`)
      console.log(res);
      getDataAll()
    } catch (error) {
      console.log(error);
    }
  }

console.log(allCategory);
  const handleChange = (e) =>{
    const nama_kategori = e.target.name
    const value = e.target.value
    const newData = {
        ...category
    }
    newData[nama_kategori] = value
    setCategory(newData)
}
console.log(category);

  useEffect (() => {
    getDataAll()
  }, [])

  if(allCategory === null) {
    return <h1>...Loading</h1>
  }
  return (
    <div className="grid h-screen">
    <div className="flex gap-2">
      <LeftSideBarAdmin />
      <div className="w-full md:w-[90%] border h-full bg-blue-100">
        <div className="lg:p-10">
          <div className="flex justify-center text-5xl items-center font-semibold border-b-[5px] border-black py-5 mb-10">
            <div>Create Category</div>
          </div>

          {/* Form Input Create Product */}
          <div className="grid bg-base-200 justify-center shadow-xl rounded-md">
            <div className="align-middle">
              <form onSubmit={handleSubmit}>
                <div className="grid w-[70%] justify-center mr-10 lg:grid-cols-2 mx-auto mt-5 p-4 pl-8">
                  <div>
                    <label htmlFor="productName" className="font-serif">
                      Category Name
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="Type here"
                      className="mt-2 mb-5 w-[500px] input input-bordered max-w-xs"
                      name='nama_kategori'
                      value={category.nama_kategori}
                      onChange={handleChange}

                    />
                  </div>

                  <div></div>
                  <div className="flex justify-start w-[75%]">
                    <button
                      type="submit"
                      className="md:w-[50%] md:ml-[120px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='px-10'>
        <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Category Name
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {
          !allCategory ? <span>...Loading lagi muter</span> : allCategory.map((value, index) => {
            return (
              <tr className={value.status === "active" ? "" : "opacity-70"}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">{index + 1}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">{value.nama_kategori}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm w-10 leading-5 text-gray-900">{value.status}</div>
            </td>
            <td className="px-6 py-4  whitespace-no-wrap border-b border-gray-200">
              <div className="grid text-sm gap-5 leading-5 text-gray-900">
                <Button onClick={() => edit(value.id)} btnName="Edit" btnCSS="w-[35%]"/>
                <button onClick={() => editStatus(value.id)} className="rounded-xl text-white bg-customPrimary w-full px-[10px] py-[8px]">
                  {
                    value.status === "active" ? <span>Non-Active</span> : <span>Active</span>
                  }
                </button>
              </div>
            </td>
          </tr>
            )
          })
        }
          

      </tbody>
    </table>
</div>
      </div>
      
    </div>
    
  </div>
);
};

export default CreateCategory
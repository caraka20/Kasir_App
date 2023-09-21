import React from 'react'
import LeftSideBarAdmin from '../../components/LeftSideBarAdmin/LeftSideBarAdmin'
// import Button from '../../components/Button/Button'
import { useState } from 'react';
import Button from '../../components/Button/Button';
import axios from 'axios';

const CreateCategory = () => {
    const [state, setState] = useState(null)
    const [productName, setProductName] = useState('');

    const getDataAll = async () => {
       try {
        const findDataCategory = await axios.get("")
       } catch (error) {
        
       }
    }

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add your logic here to handle the form submission
    console.log('Product Name:', productName);
  };
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
                      name="productName"
                      id="productName"
                      type="text"
                      placeholder="Type here"
                      className="mt-2 mb-5 w-[500px] input input-bordered max-w-xs"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
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
  
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">1</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">minum</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">active</div>
            </td>
            <td className="px-6 py-4  whitespace-no-wrap border-b border-gray-200">
              <div className="grid text-sm gap-5 leading-5 text-gray-900">
                <Button btnName="Edit" btnCSS="w-[35%]"/>
                <Button btnName="Delete" btnCSS="w-[35%]"/>
              </div>
            </td>
          </tr>

      </tbody>
    </table>
</div>
      </div>
      
    </div>
    
  </div>
);
};

export default CreateCategory

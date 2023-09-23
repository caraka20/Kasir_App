import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
//sibling components
import Button from "../Button/Button";
import "./card.css"
const CardAdmin = () => {

  const [datas, setDatas] = useState(null)

  const getData = async () => {
    try {
      const fetchData = await axios.get("http://localhost:3001/product")
      console.log(fetchData.data.data);
      setDatas(fetchData.data.data)
    } catch (error) {
      console.log(error);
    }
  }
console.log(datas);

const editStatusProduk = async (idProduk) => {
  try {
    console.log(idProduk);
    const dataProduk = datas.find((value) => {
      return value.id === idProduk
     })
    console.log(dataProduk);
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    getData()
  }, [])
console.log(datas);
  return (
    <div>
      {
        !datas ? <span>...Loading</span> : datas.map((value, index) => {
          return (
            <div className="card shadow-xl bg-white rounded-2xl px-[10px]">
            <figure>
              <img
                src={`http://localhost:3001/${value.image_product.substring(6)}`}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title mt-[10px]">{value.nama_produk}</h2>
              <p className="mt-[10px] text-sm text-gray-400">{value.deskripsi}</p>
              <p className="mt-[10px] text-sm text-gray-400">Rp. {value.harga}</p>
              <div className="flex card-actions gap-3 justify-end ">
                <Button onClick={() => editStatusProduk(value.id)} btnName="Edit" btnCSS="my-[10px] w-[150px] text-sm"/>
                <Button btnName="Delete" btnCSS = "my-[10px] w-[150px] text-sm"/>
              </div>
            </div>
          </div>   
          )
        })
      }

    </div>
  );
};

export default CardAdmin;

import React from "react";
//sibling components
import Button from "../Button/Button";
import "./cardcss.css";
const Card = (props) => {
  const {datas} = props

  return (
    
    <div className="card  sm:w-38 lg:w-[180px] xl:w-[260px] shadow-xl bg-white rounded-2xl px-[10px]">
      <figure>
        <img
          src="https://cdn1-production-images-kly.akamaized.net/EjwV7j3Y4JrlqUFuavke4NtRWtM=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3108566/original/079979700_1587487794-Sajiku_1.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title mt-[10px]">{datas.nama_produk}</h2>
        <p className="mt-[10px] text-sm text-gray-400">{datas.deskripsi}</p>
        <p className="mt-[10px] text-sm text-gray-400 text-center">
          {datas.harga}
        </p>
        <div className=" card-actions justify-end ">
          <Button  onClick={() => props.handleAddToCart(props.id)} btnName=" Add To Cart" btnCSS="my-[10px] text-sm" />
        </div>
      </div>
    </div>
  );
};

export default Card;

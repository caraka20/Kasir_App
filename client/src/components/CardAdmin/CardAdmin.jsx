import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
//sibling components
import Button from "../Button/Button";
import "./card.css";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import Search from "../Search/Search";
const CardAdmin = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [datas, setDatas] = useState(null);
  const [modalImage, setModalImage] = useState(false);
  const [images, setImages] = useState([]);
  const [idProduk, setIdProduk] = useState(0);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState(null);
  // console.log(search);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "1000px",
      height: "600px",
    },
  };

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

  const [input, setInput] = useState({
    nama_produk: "",
    deskripsi: "",
    stock: "",
    harga: "",
    kategori_produk_id: "",
    id: "",
  });

  const getData = async () => {
    try {
      const fetchData = await axios.get("http://localhost:3001/product");
      // console.log(fetchData.data.data);
      setDatas(fetchData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editStatusProduk = async (idProduk) => {
    try {
      console.log(idProduk);
      const dataProduk = datas.find((value) => {
        return value.id === idProduk;
      });
      setModalOpen(true);
      console.log(dataProduk);
      setInput({
        nama_produk: dataProduk.nama_produk,
        deskripsi: dataProduk.deskripsi,
        stock: dataProduk.stock,
        harga: dataProduk.harga,
        kategori_produk_id: dataProduk.kategori_produk_id,
        id: dataProduk.id,
      });
      // console.log(dataProduk);
    } catch (error) {
      console.log(error);
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

  const submitEdit = async (e) => {
    try {
      // console.log(e);
      const res = await axios.put(`http://localhost:3001/product/${e}`, input);
      console.log(res);
      setModalOpen(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const nama_produk = e.target.name;
    const value = e.target.value;
    const newData = {
      ...input,
    };
    newData[nama_produk] = value;
    setInput(newData);
  };

  const tutupModel = async () => {
    try {
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
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
      const create = await axios.patch(
        `http://localhost:3001/product/img/${e}`,
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
      // toast.error(error)
    }
  };

  const handleFilter = async (e) => {
    try {
      console.log(e.target.value);
      const res = await axios.get(
        `http://localhost:3001/filter/${e.target.value}`
      );
      // console.log(res.data.data);
      setDatas(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const statusProduct = async (e) => {
    try {
      console.log(e);
      const res = await axios.patch(`http://localhost:3001/product/${e}`);
      console.log(res.data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const filterKategori = async (e) => {
    try {
      // console.log(e);
      const res = await axios.get(`http://localhost:3001/filter/${e}`);
      console.log(res.data.data);
      setDatas(res.data.data);
      // getData()
    } catch (error) {
      console.log(error);
    }
  };

  const getKategori = async () => {
    try {
      const res = await axios.get("http://localhost:3001/category");
      // console.log(res.data.data);
      const hasil = res.data.data.filter((item) => {
        return item.status === "active";
      });
      console.log(hasil);
      setKategori(hasil);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
console.log(datas);
  useEffect(() => {
    // getData();
    getKategori();
  }, []);
  // console.log(search);
  return (
    <div className="mt-5">
      {/* <Search className="" /> */}
      <h1 className="font-bold my-[20px] text-2xl">Category Menu</h1>
      <div className="flex gap-10 w-full overflow-scroll">
        {!kategori ? (
          <span>-</span>
        ) : (
          kategori.map((item) => {
            return (
              <div
                onClick={() => filterKategori(item.id)}
                className="w-[100px] h-[50px] p-5 rounded-2xl bg-white flex flex-col justify-center items-center cursor-pointer "
              >
                <div value={item.id} className={`font-normal`}>
                  {item.nama_kategori}
                </div>
              </div>
            );
          })
        )}
      </div>
      <Search
        className="mt-5"
        onChange={(e) => setSearch(e.target.value)}
        value={input}
      />
      <div className="flex justify-between items-center mt-[20px]">
        {/* <Search /> */}
        <h1 className=" text-2xl">Products</h1>
        <div className="flex items-center ">
          <h1>Sort by:</h1>
          <select
            onChange={handleFilter}
            className="filter select select-ghost text-customPrimary  focus:ring-customPrimary  border-none text-xl bg-customBackground"
          >
            <option className="" disabled selected>
              Select
            </option>
            <option value={"A-Z"}>A/Z</option>
            <option value={"Z-A"}>Z/A</option>
            <option value={"H-L"}>Highest</option>
            <option value={"L-H"}>Lowest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Toaster />
        {!datas ? (
          <span>...Loading</span>
        ) : (
          datas
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.nama_produk
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              ) {
                return value;
              }
            })
            .map((value, index) => {
              return (
                <div
                  className={
                    value.status_product === "Active"
                      ? "shadow-xl bg-white rounded-2xl p-2"
                      : "shadow-xl opacity-75 rounded-2xl p-2"
                  }
                >
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
                      onClick={() => updateImage(value.id)}
                      btnName="Edit"
                      btnCSS="my-[10px] w-[150px] text-sm"
                    />
                  </Modal>
                  <img
                    className="h-[150px] rounded-2xl"
                    onClick={() => modalOpenImage(value.id)}
                    src={`http://localhost:3001/${value.image_product.substring(
                      6
                    )}`}
                    alt="Shoes"
                  />
                  <div className="grid item-center">
                    <h2 className="card-title mt-[10px]">
                      {value.nama_produk}
                    </h2>
                    <div className="flex overflow-auto h-20">
                      <p className="mt-[10px] text-sm text-gray-400">
                        {value.deskripsi}
                      </p>
                    </div>

                    <p className="mt-[10px] text-sm text-gray-400">
                      Rp. {value.harga}
                    </p>
                    <div className="flex card-actions gap-3 justify-end ">
                      <Button
                        onClick={() => editStatusProduk(value.id)}
                        btnName="Edit"
                        btnCSS="my-[10px] w-[150px] text-sm"
                      />

                      <Modal style={customStyles} isOpen={modalOpen}>
                        <div className="grid gap-5">
                          <button
                            onClick={tutupModel}
                            className="rounded-full  text-white bg-customPrimary w-[50px] px-[10px] py-[10px]"
                          >
                            X
                          </button>

                          <div className="flex justify-center text-5xl items-center font-semibold border-b-[5px] border-black py-5 mb-10">
                            <div>Edit Product</div>
                          </div>

                          {/* Form Input Create Product */}
                          <div className="bg-base-200 shadow-xl rounded-md">
                            <div className="grid grid-col-2  align-middle">
                              <div className="grid w-[90%] justify-center mr-10 lg:grid-cols-2 mx-auto mt-5 p-4 pl-8">
                                <div>
                                  <label htmlFor="" className="font-serif">
                                    Nama Produk
                                  </label>
                                  <br />
                                  <input
                                    name="nama_produk"
                                    value={input.nama_produk}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Type here"
                                    className="mt-2 mb-5 input input-bordered w-full max-w-xs"
                                  />
                                </div>

                                <div>
                                  <label htmlFor="" className="font-serif">
                                    Pilih Kategori
                                  </label>
                                  <br />
                                  <select
                                    name="kategori_produk_id"
                                    onChange={handleChange}
                                    className="select w-full max-w-xs mt-2 mb-5 "
                                    style={{ width: "100%" }}
                                  >
                                    <option disabled selected>
                                      Kategori Produk
                                    </option>
                                    <option value={1}>Snack</option>
                                    <option value={2}>Main Course</option>
                                    <option value={3}>Coffee</option>
                                    <option value={4}>Non-Coffee</option>
                                  </select>
                                </div>

                                <div>
                                  <label htmlFor="" className="font-serif">
                                    Stock
                                  </label>
                                  <br />
                                  <input
                                    name="stock"
                                    value={input.stock}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Type here"
                                    className="mt-2 mb-5 input input-bordered w-full max-w-xs"
                                  />
                                </div>

                                <div>
                                  <label htmlFor="" className="font-serif">
                                    Price
                                  </label>
                                  <br />
                                  <input
                                    name="harga"
                                    value={input.harga}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Type here"
                                    className="mt-2 mb-5 input input-bordered w-full max-w-xs"
                                  />
                                </div>

                                <div className="">
                                  <label htmlFor="" className="font-serif">
                                    Deskripsi Produk
                                  </label>
                                  <br />
                                  <textarea
                                    name="deskripsi"
                                    value={input.deskripsi}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Type here"
                                    className="mt-2 mb-5 input input-bordered w-full max-w-xs h-[100px]"
                                  />
                                </div>

                                <div></div>
                                <div className="flex justify-start w-[75%]">
                                  <Button
                                    onClick={() => submitEdit(input.id)}
                                    btnName="Edit"
                                    btnCSS="md:w-[50%] md:ml-[120px]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>

                      <Button
                        onClick={() => statusProduct(value.id)}
                        btnName={
                          value.status_product === "Active"
                            ? "Non-Active"
                            : "Active"
                        }
                        btnCSS="my-[10px] w-[150px] h-[50px] text-sm"
                      />
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default CardAdmin;
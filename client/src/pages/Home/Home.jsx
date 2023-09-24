import React, { useEffect } from "react";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Icons from React-icons
import { PiForkKnifeBold } from "react-icons/pi";
import { RiBillFill } from "react-icons/ri";
import { PiBowlFood } from "react-icons/pi";
import { GiFrenchFries } from "react-icons/gi";
import { PiCoffeeFill } from "react-icons/pi";
import { BiDrink } from "react-icons/bi";
import { LuCakeSlice } from "react-icons/lu";
import { BiSolidReport } from "react-icons/bi";

// Components
import Search from "../../components/Search/Search";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import CartOrders from "../../components/CartOrders/CartOrders";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import Modals from "../../components/Modal/Modals";
// import css
import "./home.css";

const Home = () => {
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [idProduct, setIdProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [search, setSearch] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [cartToTransaction, setCartToTransaction] = useState(null);
  const [transactionUID, setTransactionUID] = useState(null);
  const [subTotal, setSubTotal] = useState(null);

  const getApi = async () => {
    const getProduct = await axios.get(
      "http://localhost:3001/transaction/products"
    );
    const getCart = await axios.get("http://localhost:3001/transaction/cart");
    const cartById = await axios.post(
      "http://localhost:3001/transaction/cartById",
      { idProduct: idProduct }
    );
    const total = await axios.get(
      "http://localhost:3001/transaction/total-price-cart"
    );

    setSubTotal(total.data[0].total_price);

    setProducts(getProduct.data.data);
    setCart(getCart.data.data);
  };

  //PAGINATION

  const cardsPerPage = 9; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    if (indexOfLastCard < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // increment
  const incrementQty = async (id) => {
    try {
      setIdProduct(id);
      const addQuantity = await axios.put(
        "http://localhost:3001/transaction/increase-quantity",
        { idProduct: id }
      );

      // Assuming your API returns the updated cart after adding quantity.
      // Update the cart state with the updated cart data.

      console.log(addQuantity);
      getApi();
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const decrementQty = async (id) => {
    try {
      const decrease = await axios.put(
        "http://localhost:3001/transaction/decrease-quantity",
        { idProduct: id }
      );

      getApi();

      if (decrease.data.data.quantity <= 0) {
        const deleteCart = await axios.post(
          "http://localhost:3001/transaction/cart",
          { idProduct: id }
        );
        console.log(deleteCart);
      }
      getApi();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (id) => {
    // console.log(id);
    try {
      const add = await axios.post(
        "http://localhost:3001/transaction/cashier",
        {
          idProduct: id,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NTM3MzMyLCJleHAiOjE2OTU2MjM3MzJ9.9GITtZ1LFy8FWVdJTM8r2qUKxfR3OPJNxGcU9Y09T0Y",
        }
      );
      getApi();

      toast.success(add.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const confirm = async () => {
    try {
      setDisabled(true);
      if (cart.length === 0) {
        return toast.error("Input Something On Cart");
      }

      function getRandomCode() {
        let result = "";
        for (let i = 0; i < 6; i++) {
          const randomDigit = Math.floor(Math.random() * 10);
          result += randomDigit;
        }
        return result;
      }

      const carts = await axios.post(
        "http://localhost:3001/transaction/transaction",
        { cartProduct: cart, uid: getRandomCode() }
      );
      console.log(carts.data.dataTransaction);
      setTransactionUID(carts.data?.transaction_uid);
      setCartToTransaction(carts.data.dataTransaction);
      const loading = toast.loading("loading...");

      setTimeout(() => {
        toast.dismiss(loading);
        setModelIsOpen(true);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const modal = () => {
    setModelIsOpen(false);
  };

  const handleFilter = async (e) => {
    try {
      console.log(e.target.value);
      const res = await axios.get(
        `http://localhost:3001/filter/${e.target.value}`
      );
      console.log(res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterKategori = async (e) => {
    try {
      // console.log(e);
      const res = await axios.get(`http://localhost:3001/filter/${e}`);
      console.log(res.data.data);
      setProducts(res.data.data);
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

      setKategori(hasil);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getData();
    getKategori();
  }, []);

  useEffect(() => {
    getApi();
  }, []);

  const vat = Math.floor(subTotal * 0.1);
  const total = Number(subTotal) + Number(vat);
console.log(search);
  return (
    <div className="screen  w-full h-screen flex ">
      <LeftSideBar />
      <div className="middle w-8/12 h-full md:px-[20px]  2xl:px-[100px] lg:px-[20px]  overflow-scroll  bg-customBackground">
        <Search
          onChange={(e) => setSearch(e.target.value)}
          className="mt-[50px]"
          value={search}
        />
        <h1 className="font-bold my-[20px] text-2xl">Category Menu</h1>
        <div className="flex gap-10 w-full overflow-scroll">
          {kategori.map((value) => {
            return (
              <CategoryCard
                icons={<PiBowlFood />}
                categoryName={value.nama_kategori}
                iconsCSS=""
                categoryCSS=""
                datas={value}
                onClick={() => filterKategori(value.id)}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-[20px]">
          <h1 className=" text-2xl">Foods</h1>
          <div className="flex items-center ">
            <h1>Sort by:</h1>
            <select
              onChange={handleFilter}
              className="filter select select-ghost text-customPrimary  focus:ring-customPrimary  border-none text-xl bg-customBackground"
            >
              <option className="" disabled selected>
                Select
              </option>
              {/* <option>Foods</option> */}
              <option value={"A-Z"}>A/Z</option>
              <option value={"Z-A"}>Z/A</option>
              <option value={"H-L"}>Highest</option>
              <option value={"L-H"}>Lowest</option>
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-5 mt-[20px]">
          {/* {products} */}
          {!products ? (
            <span>Loading....</span>
          ) : (
            currentCards
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
              .map((value) => {
                return (
                  <Card
                    handleAddToCart={addToCart}
                    id={value.id}
                    datas={value}
                  />
                );
              })
          )}
          {/* {products.map((value) => {
            return (
            );
          })} */}
        </div>

        <div className="Pagination  mt-[75px] flex justify-between mb-[20px]">
          <Button
            btnCSS="test1  text-black w-[200px] bg-white  border-2 border-orange-500 "
            btnName="Previously"
            onClick={previousPage}
          />
          <Button onClick={nextPage} btnCSS="test2 w-[200px] text-white" btnName="Next" />
        </div>
      </div>
      <div className="right-side h-full w-3/12 px-[20px] bg-white relative overflow-auto">
        <h1 className="mt-[50px] text-3xl mb-[20px]">Cart</h1>
        <div className="CartOrders h-[400px] overflow-scroll">
          {/* {cart.map((value) => { */}
          <CartOrders
            datas={cart}
            increment={incrementQty}
            decrement={decrementQty}
          />
          {/* })} */}
        </div>
        <div className="mt-[10px] border-t-2 border-b-2 py-[20px]">
          <div className="SubTotal flex justify-between items-center">
            <h1 className="text-lg">Sub Total</h1>
            <h1 className="text-xl  font-normal">{`Rp. ${
              subTotal ? subTotal : 0
            }`}</h1>
          </div>
          <div className="VAT flex justify-between items-center">
            <h1 className="text-lg">VAT (10%)</h1>
            <h1 className="text-xl font-normal">{`Rp. ${vat}`}</h1>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[10px]">
          <h1 className="font-semibold text-xl">TOTAL : </h1>
          <h1 className="font-semibold text-xl">{`Rp. ${total}`}</h1>
        </div>
        <div className="flex flex-col lg:mt-[10px]  mt-[10px] ">
          <Button
            onClick={confirm}
            btnCSS="btn-modal"
            btnName="Confirm"
            disabled={disabled}
          />
        </div>
        <Modals
          datas={cartToTransaction}
          transaction_uid={transactionUID}
          isOpen={modalIsOpen}
          modal={modal}
        />
        {modalIsOpen === true ? <div></div> : <Toaster />}
      </div>
    </div>
  );
};

export default Home;

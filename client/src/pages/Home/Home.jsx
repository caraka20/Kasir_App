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
  const [qty, setQty] = useState([]);

  const [cartToTransaction, setCartToTransaction] = useState(null);
  const [transactionUID, setTransactionUID] = useState(null);

  const getApi = async () => {
    const getProduct = await axios.get(
      "http://localhost:3001/transaction/products"
    );
    const getCart = await axios.get("http://localhost:3001/transaction/cart");
    const cartById = await axios.post(
      "http://localhost:3001/transaction/cartById",
      { idProduct: idProduct }
    );
    setQty(cartById.data.data?.quantity);

    setProducts(getProduct.data.data);
    setCart(getCart.data.data);
  };

  // increament
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NDQ4Mzg3LCJleHAiOjE2OTU1MzQ3ODd9.FqiweKLJgaVY9imyrWrM4cgmCo81iZfOqpKePZ0vkho",
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
      setModelIsOpen(true);

      function getRandomCode() {
        let result = "";
        for (let i = 0; i < 6; i++) {
          const randomDigit = Math.floor(Math.random() * 10);
          result += randomDigit;
        }
        return result;
      }
      // let hasil =
      const carts = await axios.post(
        "http://localhost:3001/transaction/transaction",
        { cartProduct: cart, uid: getRandomCode() }
      );
      console.log(carts.data.dataTransaction);
      setTransactionUID(carts.data?.transaction_uid);
      setCartToTransaction(carts.data.dataTransaction);

      console.log("asd");
    } catch (error) {
      console.log(error);
    }
  };

  const updateDatas = (updatedDatas) => {
    setCart(updatedDatas);
  };

  useEffect(() => {
    getApi();
  }, []);

  // if(products.length === 0) return console.log("ini product");

  // if(cart.length === 0) return console.log("ini cart");
  // if(!cartToTransaction) return console.log("test");
  return (
    <div className="screen  w-full h-screen flex ">
      <LeftSideBar />
      <div className="middle w-8/12 h-full md:px-[20px]  2xl:px-[100px] lg:px-[20px]  overflow-scroll  bg-customBackground">
        <Search className="mt-[50px]" />
        <h1 className="font-bold my-[20px] text-2xl">Category Menu</h1>
        <div className="flex gap-10 w-full overflow-scroll">
          <CategoryCard
            icons={<PiBowlFood />}
            categoryName="Foods"
            iconsCSS=""
            categoryCSS=""
          />
          <CategoryCard
            icons={<PiBowlFood />}
            categoryName="Foods"
            iconsCSS=""
            categoryCSS=""
          />
          <CategoryCard
            icons={<PiBowlFood />}
            categoryName="Foods"
            iconsCSS=""
            categoryCSS=""
          />
          <CategoryCard
            icons={<PiBowlFood />}
            categoryName="Foods"
            iconsCSS=""
            categoryCSS=""
          />
        </div>
        <div className="flex justify-between items-center mt-[20px]">
          <h1 className=" text-2xl">Foods</h1>
          <div className="flex items-center ">
            <h1>Sort by:</h1>
            <select className="filter select select-ghost text-customPrimary  focus:ring-customPrimary  border-none text-xl bg-customBackground">
              <option className="" disabled selected>
                Select
              </option>
              <option>Foods</option>
              <option>A/Z</option>
              <option>Z/A</option>
              <option>Highest</option>
              <option>Lowest</option>
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-[20px]">
          {products.map((value) => {
            return (
              <Card handleAddToCart={addToCart} id={value.id} datas={value} />
            );
          })}
        </div>

        <div className="Pagination  mt-[75px] flex justify-between mb-[20px]">
          <Button
            btnCSS="test1  text-black w-[200px] bg-white  border-2 border-orange-500 "
            btnName="Previously"
          />
          <Button btnCSS="test2 w-[200px] text-white" btnName="Next" />
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
        <div className="mt-[20px] border-t-2 border-b-2 py-[20px]">
          <div className="SubTotal flex justify-between items-center">
            <h1 className="text-lg">Sub Total</h1>
            <h1 className="text-xl  font-normal">$111</h1>
          </div>
          <div className="VAT flex justify-between items-center">
            <h1 className="text-lg">VAT (10%)</h1>
            <h1 className="text-xl font-normal">$11.1</h1>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[10px]">
          <h1 className="font-semibold text-xl">TOTAL : </h1>
          <h1 className="font-semibold text-xl">$122.1 </h1>
        </div>
        <div className="flex flex-col lg:mt-[75px]  mt-[10px] ">
          <Button onClick={confirm} btnCSS="btn-modal" btnName="Confirm" />
        </div>
        <Modals
          datas={cartToTransaction}
          transaction_uid={transactionUID}
          isOpen={modalIsOpen}
        />
        {modalIsOpen === true ? <div></div> : <Toaster />}
      </div>
    </div>
  );
};

export default Home;

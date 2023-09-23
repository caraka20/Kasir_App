import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
import Home from "../Home/Home";
import Login from "../Login/Login"
import ForgetPassword from "../Forget/ForgetPassword";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import Profile from "../Profile/Profile";

import CreateCategory from "../CreateCategory/CreateCategory";
import CardAdmin from "../../components/CardAdmin/CardAdmin";
import Admin from "../HomeAdmin/Admin";
const routes = [
  <> 
    <Route path="/home/admin" element={<Admin />}/>
    <Route path="/card" element={<CardAdmin />}/>
    <Route path="/Category" element={<CreateCategory/>}/>


// PAGES
const routes = [
  <>

    <Route path="/produk" element={<CreatePorduk />}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/" element={<Login/>}/>
    <Route path="/forgetpassword" element={<ForgetPassword/>}/>
    <Route path="/updatepassword/:email" element={<UpdatePassword/>}/>
    <Route path="/cashier"  element={<Home/>}/>
    <Route path="/cashier/profile"  element={<Profile/>}/>
  </>
  
];

export default routes

import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
import Home from "../Home/Home";
import Login from "../Login/Login"
import ForgetPassword from "../Forget/ForgetPassword";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import ChangeOldPass from "../ChangeOldPass/ChangeOldPass";
import Profile from "../Profile/Profile";

// PAGES
const routes = [
  <>
    <Route path="/produk" element={<CreatePorduk />}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgetpassword" element={<ForgetPassword/>}/>
    <Route path="/updatepassword/:email" element={<UpdatePassword/>}/>
    <Route path="/changeoldpass/:id" element={<ChangeOldPass/>}/>
    <Route path="/cashier"  element={<Home/>}/>
    <Route path="/cashier/profile/:id"  element={<Profile/>}/>
  </>
  
];

export default routes

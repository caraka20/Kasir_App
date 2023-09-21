import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
// PAGES
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import CreateCategory from "../CreateCategory/CreateCategory";
import Admin from "../HomeAdmin/Admin";
const routes = [
  <> 
    <Route path="/home/admin" element={<Admin />}/>
    <Route path="/Category" element={<CreateCategory/>}/>
    <Route path="/produk" element={<CreatePorduk />}/>
    <Route path="/"  element={<Home/>}/>

    <Route path="/cashier"  element={<Home/>}/>
    <Route path="/cashier/profile"  element={<Profile/>}/>

  </>
  
];

export default routes

import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
// PAGES
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
const routes = [
  <>

    <Route path="/produk" element={<CreatePorduk />}/>
    <Route path="/"  element={<Home/>}/>

    <Route path="/cashier"  element={<Home/>}/>
    <Route path="/cashier/profile"  element={<Profile/>}/>

  </>
  
];

export default routes

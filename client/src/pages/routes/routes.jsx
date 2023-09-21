import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
// PAGES
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Report from "../Report/Report";
const routes = [
  <>

    {/* page admin */}
    <Route path="/admin/produk" element={<CreatePorduk />}/>
    <Route path="/admin"  element={<Home/>}/>
    <Route path="/admin/report"  element={<Report/>}/>

    {/* page kasir */}
    <Route path="/cashier"  element={<Home/>}/>
    <Route path="/cashier/profile"  element={<Profile/>}/>

  </>
  
];

export default routes

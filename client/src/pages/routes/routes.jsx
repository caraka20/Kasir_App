import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
// PAGES
import Home from "../Home/Home";

const routes = [
  <>
    <Route path="/produk" element={<CreatePorduk />}/>
    <Route path="/"  element={<Home/>}/>
  </>
  
];

export default routes

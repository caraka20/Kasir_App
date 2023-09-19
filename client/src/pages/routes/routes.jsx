import { Route } from "react-router-dom";

// PAGES
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
const routes = [
  <>
    <Route path="/cashier"  element={<Home/>}/>
    <Route path="/cashier/profile"  element={<Profile/>}/>
  </>
  
];

export default routes

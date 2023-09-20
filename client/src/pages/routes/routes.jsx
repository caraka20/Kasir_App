import { Route } from "react-router-dom";

// PAGES
import Home from "../Home/Home";
import ForgetPassword from "../Forget/ForgetPassword";

const routes = [
  <>
    <Route path="/"  element={<Home/>}/>
    <Route path="/forgetpassword" element={<ForgetPassword/>}/>
  </>
  
];

export default routes

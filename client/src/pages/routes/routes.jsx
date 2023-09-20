import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
import Modals from "../../components/Modal/Modals";

// PAGES
import Home from "../Home/Home";
import Profile from "../Profile/Profile";

const routes = [
  <>
    <Route path="/product" element={<CreatePorduk />} />
    <Route path="/" element={<Home />} />

    <Route path="/cashier/profile" element={<Profile />} />
  </>,
];

export default routes;

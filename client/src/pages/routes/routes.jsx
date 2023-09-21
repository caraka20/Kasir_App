import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
// PAGES
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Report from "../Report/Report";
import RecordTransaction from "../RecordTransaction/RecordTransaction";
import DetailTransaksi from "../DetailTransaksi/DetailTransaksi";
const routes = [
  <>

    {/* page admin */}
    <Route path="/admin/produk" element={<CreatePorduk />}/>
    <Route path="/admin"  element={<Home/>}/>
    <Route path="/admin/report"  element={<Report/>}/>
    <Route path="/admin/RecordTransaction/:awal/:akhir"  element={<RecordTransaction/>}/>
    <Route path="/admin/DetailTransaksi/:awal/:akhir"  element={<DetailTransaksi/>}/>

    {/* page kasir */}
    <Route path="/cashier"  element={<Home/>}/>
    <Route path="/cashier/profile"  element={<Profile/>}/>

  </>
  
];

export default routes

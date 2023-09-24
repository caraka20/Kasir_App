import { Route } from "react-router-dom";
import CreatePorduk from "../CreateProduk/CreatePorduk";
import Home from "../Home/Home";
import Login from "../Login/Login";
import ForgetPassword from "../Forget/ForgetPassword";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import ChangeOldPass from "../ChangeOldPass/ChangeOldPass";
import Profile from "../Profile/Profile";
import CreateCategory from "../CreateCategory/CreateCategory";
import CardAdmin from "../../components/CardAdmin/CardAdmin";
import Admin from "../HomeAdmin/Admin";
import ModalReceipt from "../../components/ModalReceipt/ModalReceipt";
import Report from "../Report/Report";
import RecordTransaction from "../RecordTransaction/RecordTransaction";
import DetailTransaksi from "../DetailTransaksi/DetailTransaksi";
import CreateKasir from "../CreateKasir/CreateKasir";
import ListKasir from "../HomeAdmin/ListKasir";
const routes = [
  <>
    <Route path="/home/admin" element={<Admin />} />
    <Route path="/card" element={<CardAdmin />}/>
    <Route path="/Category" element={<CreateCategory />} />
    <Route path="/produk" element={<CreatePorduk />} />
    <Route path="/admin/report" element={<Report />} />
    <Route path="/admin/RecordTransaction/:awal/:akhir" element={<RecordTransaction />} />
    <Route path="/admin/detailTransaksi/:awal/:akhir" element={<DetailTransaksi />} />
    <Route path="/admin/kasir" element={<CreateKasir />} />
    <Route path="/admin/ListKasir" element={<ListKasir />} />

    <Route path="/login" element={<Login/>}/>
    <Route path="/forgetpassword" element={<ForgetPassword/>}/>
    <Route path="/updatepassword/:email" element={<UpdatePassword/>}/>
    <Route path="/changeoldpass/:id" element={<ChangeOldPass/>}/>
    <Route path="/cashier"  element={<Home/>}/>
    <Route path="/cashier/profile/:id"  element={<Profile/>}/>
    <Route path="/cashier/profile"  element={<Profile/>}/>
    <Route path="/receipt"  element={<ModalReceipt/>}/>
  </>,

];

export default routes;

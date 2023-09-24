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

import Report from "../Report/Report";
import RecordTransaction from "../RecordTransaction/RecordTransaction";
import DetailTransaksi from "../DetailTransaksi/DetailTransaksi";
import CreateKasir from "../CreateKasir/CreateKasir";
import ListKasir from "../HomeAdmin/ListKasir";

import Protected from "./protected";
import ItemList from "../../components/Pagin/ItemList";
const routes = [
    <Route path="/home/admin" element={<Protected adminPage={true}><Admin /></Protected>} />,,
    <Route path="/card" element={<Protected adminPage={true}><CardAdmin /></Protected>}/>,
    <Route path="/Category" element={<Protected adminPage={true}><CreateCategory /></Protected>} />,
    <Route path="/produk" element={<Protected adminPage={true}><CreatePorduk /></Protected>} />,
    <Route path="/admin/report" element={<Protected adminPage={true}><Report /></Protected>} />,
    <Route path="/admin/RecordTransaction/:awal/:akhir" element={<Protected adminPage={true}><RecordTransaction /></Protected>} />,
    <Route path="/admin/detailTransaksi/:awal/:akhir" element={<Protected adminPage={true}><DetailTransaksi /></Protected>} />,
    <Route path="/admin/kasir" element={<Protected adminPage={true}><CreateKasir /></Protected>} />,
    <Route path="/admin/ListKasir" element={<Protected adminPage={true}><ListKasir /></Protected>} />,

    <Route path="/" element={<Login/>}/>,
    <Route path="/forgetpassword" element={<ForgetPassword/>}/>,
    <Route path="/updatepassword/:email" element={<UpdatePassword/>}/>,
    <Route path="/changeoldpass/:id" element={<ChangeOldPass/>}/>,
    <Route path="/cashier"  element={<Protected kasirPage={true}><Home/></Protected>}/>,
    <Route path="/cashier/profile/:id"  element={<Profile/>}/>,
    <Route path="/cashier/profile"  element={<Profile/>}/>,
    <Route path="/test"  element={<ItemList />}/>

];

export default routes;

import React from "react";
import { Route, Routes } from "react-router-dom";

import routes from "./Pages/routes/routes"
// import ForgetPassword from "./pages/Forget/ForgetPassword";

const App = () => {
  return (
    <>
      <Routes>{routes.map((value) => value)}</Routes>
    </>
  );
};

export default App;

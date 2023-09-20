import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./pages/routes/routes";
import ForgetPassword from "./pages/Forget/ForgetPassword";

const App = () => {
  return (
    <>
      {/* <Routes>{routes.map((value) => value)}</Routes> */}
      <ForgetPassword/>
    </>
  );
};

export default App;

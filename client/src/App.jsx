import React from "react";
import { Route, Routes } from "react-router-dom";

import routes from "./Pages/routes/routes"


const App = () => {
  return (
    <>
      <Routes>{routes.map((value) => value)}</Routes>
    </>
  );
};

export default App;

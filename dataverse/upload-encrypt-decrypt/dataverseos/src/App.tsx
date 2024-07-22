import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, Toolkits } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/toolkits' element={<Toolkits />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

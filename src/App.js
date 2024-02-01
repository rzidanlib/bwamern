import React from "react";
import { Routes, Route } from "react-router-dom";

import "assets/scss/style.scss";
import LandingPage from "pages/LandingPage";
import DetailsPage from "pages/DetailsPage_";
import Checkout from "pages/Checkout";
import Example from "pages/Example";
import { ToastContainer } from "react-toastify";

import "assets/scss/style.scss";
import NotFound from "pages/404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/properties/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/example" element={<Example />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

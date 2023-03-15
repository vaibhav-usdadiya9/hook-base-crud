import React from "react";
import ShowLaptopData from "./components/ShowLaptop";
import { Route, Routes } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "./App.css";
import Cart from "./components/Cart";

const App = () => {
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <main>
        <Routes>
          <Route path="/" element={<ShowLaptopData />}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Routes>
      </main>
    </PayPalScriptProvider>
  );
};

export default App;

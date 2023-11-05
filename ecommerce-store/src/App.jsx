import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import GameDetails from "./components/GameDetails";
import AddProductForm from "./components/AddProductForm";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Video Game Store</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/cart" element={<Cart />} />      
          <Route path="/checkout" element={<Checkout />} />   
        </Routes>
      </div>
    </Router>
  );
};

export default App;

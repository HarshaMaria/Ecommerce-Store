import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import Home from "./components/Home";
import GameDetails from "./components/GameDetails";
import Cart from "./components/Cart";
import AddProductForm from "./components/AddProductForm";
// import Checkout from "./components/Checkout";
import "./index.css";

const App = () => {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState(null)

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  }
  const newLoginId = localStorage.getItem('LoginId')

  useEffect(() => {
    if (newLoginId) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  }, [newLoginId])

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Video Game Store</h1>
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/game/:userId/:id" element={<GameDetails />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/cart/:userId" element={<Cart />} />
          {isLoggedIn ?
            <Route path="/home/:userId" element={<Home />} /> :
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          }

        </Routes>
      </div>
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import Home from "./components/Home";
import GameDetails from "./components/GameDetails";
import Cart from "./components/Cart";
import AddProductForm from "./components/AddProductForm";
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
       <div className="w-full bg-gray p-2 mt-[-16px] shadow-md">
        <h1 className="text-5xl font-bold mb-6 text-center mt-[4px] mb-[16px]">Video Game Store</h1>
       </div>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

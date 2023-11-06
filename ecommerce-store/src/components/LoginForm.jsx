import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userSlice';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (formData.email.trim() === '' || formData.password.trim() === '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      // If all fields are filled, dispatch loginUser action and navigate to home page
      dispatch(loginUser(formData));
      // Navigate to the home page (assuming you have a route defined for '/home')
      // You can replace '/home' with the actual path of your home page route
      // For example: history.push('/home');
    }
  };

  return (
    <div className="border p-4">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        {!isFormValid && <p className="text-red-500 mb-4">Please fill in all fields.</p>}
        <Link to="/home">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct } from '../reducers/productsSlice';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage?.getItem('token')  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    count: 1,
  });

  useEffect(() => {
    if(!token){
      navigate('/login');
    }
  }, [dispatch, navigate, token]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({product:formData, token}))
      .then(() => {
        setFormData({
          name: '',
          description: '',
          price: '',
          imageUrl: '',
        });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="flex items-center justify-center"> 
      <div className="border p-4 w-[620px] bg-yellow-200 mt-[48px]">
        <h2 className="text-xl font-semibold mb-4">Add New Product(Game)</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
            Add Product
          </button>
        <Link to={"/"}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 flex">
            Home
          </button>
        </Link>
        </form>
      </div>
    </div> 
  );
};

export default AddProductForm;
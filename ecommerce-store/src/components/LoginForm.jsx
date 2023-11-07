// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../reducers/userSlice';
// import { Link } from 'react-router-dom';

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [isFormValid, setIsFormValid] = useState(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.email.trim() === '' || formData.password.trim() === '') {
//       setIsFormValid(false);
//     } else {
//       setIsFormValid(true);
//       dispatch(loginUser(formData));
//     }
//   };

//   return (
//     <div className="border p-4">
//       <h2 className="text-xl font-semibold mb-4">Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-1 p-2 border rounded w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="mt-1 p-2 border rounded w-full"
//             required
//           />
//         </div>
//         {!isFormValid && <p className="text-red-500 mb-4">Please fill in all fields.</p>}
//         <Link to="/home">
//         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Login
//         </button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // axios
      navigate('/home')
    }
  };

  return(
      <div className="bg-gray-20">
          <div className="h-auto flex items-center justify-center mt-10">
              <div className="bg-white p-8 rounded-3xl shadow-md w-[500px]">
          <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label name="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label name="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        {/* <Link to="/home"> */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
          Login
        </button>
        {/* </Link> */}
      </form>
           </div>
          </div>
      </div>
  )
}

export default LoginForm;

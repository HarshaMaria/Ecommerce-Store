// import React, { useState } from 'react';
// import {useNavigate} from "react-router-dom";
// import Home from './Home';

// const LoginForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     password: '',
//     email: '',
//   });

//   const [errors, setErrors] = useState({
//     password: '',
//     email: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     }
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       // axios
//       navigate('/home')
//     }
//   };

//   return(
//       <div className="bg-gray-20">
//           <div className="h-auto flex items-center justify-center mt-10">
//               <div className="bg-white p-8 rounded-3xl shadow-md w-[500px]">
//           <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label name="email" className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-1 p-2 border rounded w-full"
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//         </div>
//         <div className="mb-4">
//           <label name="password" className="block text-sm font-medium text-gray-600">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="mt-1 p-2 border rounded w-full"
//           />
//           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//         </div>
//         {/* <Link to="/home"> */}
//         <button type="submit" className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
//           Login
//         </button>
//         {/* </Link> */}
//       </form>
//            </div>
//           </div>
//       </div>
//   )
// }

// export default LoginForm;




import React, { useState } from "react";
import axios from "axios";

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/v1/user/login', { email, password: pass });
      console.log(response.data);
      props.onLoginSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm mb-4" placeholder="youremail@gmail.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm" placeholder="********" onChange={(e) => setPass(e.target.value)} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <button className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => props.onFormSwitch('register')}>
            Don't have an account? Register here.
          </button>
        </div>
      </div>
    </div>
  );
};

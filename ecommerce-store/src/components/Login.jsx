import React, { useState } from "react";
import { Link } from  "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [userId,setUserId] = useState()
  const navigate=useNavigate();
  const handleSubmit =  (e) => {
      e.preventDefault();
      axios.post('http://localhost:8081/v1/user/login', { email, password: pass })
      .then(response => {
      console.log(response.data);
      setUserId(response.data);
      // props.onLoginSuccess();
      })
      .catch(error => {
        console.error(error);
        // Handle login error if needed
      });
  }

  if(userId){
      navigate(`/home/${userId}`);
  }

  return (
    <div className="min-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-red-500 py-12 w-[600px] sm:px-6 lg:px-8 ml-[460px] mt-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="email@gmail.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="********" onChange={(e) => setPass(e.target.value)} />
            </div>
          </div>
 
          <div>
            {/* <Link to = "/home"> */}
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
            {/* </Link> */}
          </div>
        </form>
        <div className="text-center">
          <Link to = "Signup">
          <button className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => props.onFormSwitch('register')}>
            Don't have an account? Register here.
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
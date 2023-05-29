import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorr, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://songify-v1.onrender.com/login', { email, password });
      const { token, username } = response.data;

      Cookies.set('token', token, { expires: 30 });
      Cookies.set('username', username);
      toast.success('Login successful');

      window.location.href = '/';
    } catch (error) {
      if (error.response && error.message.includes('404')) {
        toast.error('User not found');
        setError('User not found');
      } else if (error.response && error.message.includes('401')) {
        toast.error('Invalid password');
        setError('Invalid password');
      } else {
        toast.error('An error occurred');
        setError('An error occurred');
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gradient-to-tr from-gray-900 to-[#000000] shadow-lg rounded-lg p-8 text-white w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-blue-500 text-white"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full p-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-blue-500 text-white"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

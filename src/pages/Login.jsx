import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorr, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const clearError = () => {
    setError('');
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
      toast.success('Login successful', {
        theme: 'dark',
      });

      navigate('/');
    } catch (error) {
      setError(error);
      if (error.response.data.error === 'Verify your OTP code before logging in.') {
        toast.error(error.response.data.error);
        navigate('/otp');
        Cookies.set('email', email);
      }
      setError(error.response.data.error);
      setTimeout(clearError, 2000);
    }
  };
  return (
    <div className="flex justify-center items-center align-middle md:mt-40 mt-20">
      <div className="bg-gradient-to-tr from-gray-900 to-[#000000] shadow-lg rounded-lg p-8 text-white w-[100%] md:w-[400px]">
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
            <div className="flex mt-1 justify-end items-end">
              <Link to="/resetrequest" className="text-blue-500 hover:text-blue-400">
                Forgot?
              </Link>
            </div>
          </div>
          {errorr && <p className="text-red-500 text-sm italic mb-2">{errorr}</p>}

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
    </div>
  );
};

export default Login;

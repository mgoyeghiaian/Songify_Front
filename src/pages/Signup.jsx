import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError('');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      // Send signup data to the backend for registration
      await axios.post('/api/signup', {
        username,
        email,
        password,
        phoneNumber,
      });

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');

      navigate('/login');

      toast.success('Signup successful', {
        theme: 'dark',
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Email already registered', {
          theme: 'dark',
        });
      } else {
        toast.error('Failed to signup', {
          theme: 'dark',
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-gradient-to-tr from-gray-900 to-[#000000] shadow-lg rounded-lg p-8 text-white md:w-[450px] w-[100%] mt-10 sm:mt-40">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-blue-500 text-white"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
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
          <div className="mb-4">
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
                className="absolute top-2 right-2 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-500" />
                ) : (
                  <FiEye className="text-gray-500" />
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-blue-500 text-white"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={handleToggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-gray-500" />
                ) : (
                  <FiEye className="text-gray-500" />
                )}
              </div>
            </div>
            {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2 font-medium">
              Phone Number
            </label>
            <PhoneInput
              country="us"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;

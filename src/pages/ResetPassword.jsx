import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const resetPasswordId = queryParams.get('id');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      await axios.put(`https://songify-v1.onrender.com/reset-password/${resetPasswordId}`, {
        newPassword,
      });
      setPassword('');
      setConfirmPassword('');
      navigate('/login');
      sessionStorage.setItem('hasVisited', 'true');

      toast.success('Password Changed successfully....', {
        theme: 'dark',
      });
    } catch (error) {
      if (error.response && error.message.includes('400')) {
        toast.error('Email already registered', {
          theme: 'dark',
        });
      } else {
        toast.error('Failed to Reset', {
          theme: 'dark',
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-gradient-to-tr from-gray-900 to-[#000000] shadow-lg rounded-lg p-8 text-white
       md:w-[450px] w-[100%] mt-10 sm:mt-40"
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full p-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-blue-500 text-white"
                placeholder="Enter your password"
                value={newPassword}
                onChange={handlePasswordChange}
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-300 w-6 h-6" />
                ) : (
                  <FiEye className="text-gray-300 w-6 h-6" />
                )}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium">
              Confirm New Password
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
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handleToggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-gray-300 w-6 h-6" />
                ) : (
                  <FiEye className="text-gray-300 w-6 h-6" />
                )}
              </div>
            </div>
          </div>
          {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 mt-4"
          >
            Reset
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;

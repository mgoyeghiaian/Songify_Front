import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Resetrequest = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [errorr, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const clearError = () => {
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('https://songify-v1.onrender.com/requestLink', { email });
      toast.success(res.data.message, {
        theme: 'dark',
      });
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(clearError, 2000);
    }
  };
  return (
    <div className="flex justify-center items-center align-middle md:mt-40 mt-20">
      <div className="bg-gradient-to-tr from-gray-900 to-[#000000] shadow-lg rounded-lg p-8 text-white w-[100%] md:w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
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
          {errorr && (
            <div className="text-red-500 p-2">{errorr}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
          >
            Reset
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Resetrequest;

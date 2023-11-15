import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [errorr, setError] = useState('');
  const email = Cookies.get('email');

  const handleOtpChange = (e) => {
    const inputOtp = e.target.value;
    if (/^\d{0,4}$/.test(inputOtp)) {
      setOtp(inputOtp);
    }
  };

  const clearError = () => {
    setError('');
  };

  const handleSubmit = () => {
    if (otp.length !== 4) {
      setError('Please enter a 4-digit OTP .');
      return;
    }

    axios.post('https://songify-v1.onrender.com/verify', { email, otpCode: otp })
      .then((response) => {
        toast.success(response.data.message, {
          theme: 'dark',
        });
        navigate('/login');
      })
      .catch((error) => {
        setError(error.response.data.error);
        setTimeout(clearError, 3000);
      });
  };

  return (
    <div className="flex justify-center items-center align-middle md:mt-40 mt-20">
      <div className="bg-gradient-to-tr from-gray-900 to-[#000000] shadow-lg rounded-lg p-8 text-white w-[100%] md:w-[400px]">
        <h2 className="text-2xl text-center mb-4">Enter the OTP</h2>
        {errorr && <p className="text-red-500 text-sm italic mb-2">{errorr}</p>}
        <input
          type="text"
          placeholder="OTP"
          className="w-full p-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-blue-500 text-white"
          value={otp}
          onChange={handleOtpChange}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 w-full rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpPage;

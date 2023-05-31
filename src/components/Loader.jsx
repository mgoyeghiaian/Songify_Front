import React from 'react';
import { loader } from '../assets';

const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <object data={loader} type="image/svg+xml" id="testtt" className="w-32 h-32 object-contain">
      <img src={loader} alt="loader" />
    </object>
    <h1 className="font-bold text-2xl text-white mt-1">
      {title || 'Loading......'}
    </h1>
  </div>
);

export default Loader;

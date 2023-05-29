import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu, HiOutlineHeart, HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi';
import Cookies from 'js-cookie';
import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick, isLoggedIn, handleLogout }) => {
  // Retrieve the username from the cookies
  const username = Cookies.get('username');

  return (
    <div className="mt-10">
      {isLoggedIn && (
        <h1 className="font-bold text-gray-400 text-center">
          Welcome, <span className="text-cyan-400 font-extrabold">{username}</span>
        </h1>
      )}
      {links.map((item) => (
        <NavLink
          className="flex flex-row justify-start items-end my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          key={item.name}
          to={item.to}
          onClick={() => handleClick && handleClick(item.name)}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
      {!isLoggedIn ? (
        <NavLink
          className="flex flex-row justify-start items-end my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          to="/login"
          onClick={handleClick}
        >
          <HiOutlineLogin className="w-6 h-6 mr-2" />
          Login
        </NavLink>
      ) : (
        <>
          <NavLink
            className="flex flex-row justify-start items-end my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
            onClick={handleClick}
            to="/foryou"
          >
            <HiOutlineHeart className="w-6 h-6 mr-2" />
            For You
          </NavLink>
          <button
            className="flex flex-row justify-start items-end  text-sm font-medium text-gray-400 hover:text-cyan-400"
            onClick={handleLogout}
            type="button"
          >
            <HiOutlineLogout className="w-6 h-6 mr-2" />
            Logout
          </button>
        </>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = Cookies.get('token') && Cookies.get('username');
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    window.location.href = '/';
  };

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-gradient-to-tl from-gray-800 to-[#000000]">
        <img src={logo} alt="logo" className="w-full h-40 object-contain" />
        <NavLinks isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#000000] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'
          }`}
      >
        <img src={logo} alt="logo" className="w-full object-contain h-40" />
        <NavLinks
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          handleClick={() => setMobileMenuOpen(false)}
        />
      </div>
    </>
  );
};

export default Sidebar;

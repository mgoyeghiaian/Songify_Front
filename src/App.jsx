import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts, SongADetails } from './pages';
import Login from './pages/Login';
import Signup from './pages/Signup';
import 'react-toastify/dist/ReactToastify.css';
import Foryou from './pages/Foryou';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  // const [showPopup, setShowPopup] = useState(true);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     sessionStorage.removeItem('hasVisited');
  //   };

  //   const hasVisitedBefore = sessionStorage.getItem('hasVisited');
  //   if (!hasVisitedBefore) {
  //     setShowPopup(true);
  //     sessionStorage.setItem('hasVisited', 'true');
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  // const handleContinueWithoutLogin = () => {
  //   setShowPopup(false);
  // };

  // const token = Cookies.get('token');

  return (
    <>
      <ToastContainer />
      <div className="relative flex">
        {/* {showPopup && !token && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-gray-900 to-[#000000] p-6 border border-gray-300 shadow-md text-center text-white font-bold z-50 rounded-lg w-[350px] md:w-[450px] lg:w-[550px]">
            <h2 className="text-2xl mb-2">Welcome to Songify V1</h2>
            <p className="text-lg">We're working hard on V2 to bring you an even better experience!</p>
            <div className="mt-4">
              <Link to="/" className="text-blue-500 hover:text-blue-300 mr-4" onClick={handleContinueWithoutLogin}>
                Continue without login
              </Link>
              <Link to="/login" className="text-blue-500 hover:text-blue-300" onClick={handleContinueWithoutLogin}>
                Login
              </Link>
            </div>
          </div>
        )} */}

        <Sidebar />
        <div className="flex-1 flex flex-col bg-gradient-to-tr from-gray-900 to-[#000000]">
          <Searchbar />
          <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
            <div className="flex-1 h-fit pb-40">
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/around-you" element={<AroundYou />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/songs/:songid" element={<SongDetails />} />
                <Route path="/song/:songid" element={<SongADetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/foryou" element={<Foryou />} />
              </Routes>
            </div>
            <div className="xl:sticky relative top-0 h-fit">
              <TopPlay />
            </div>
          </div>
        </div>
        {activeSong?.title && (
          <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
            <MusicPlayer />
          </div>
        )}
      </div>
    </>
  );
};

export default App;

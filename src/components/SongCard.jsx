import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import PlayPause from './PlayPause';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import nocoverart from '../assets/NoCoverArt.png2.png';

const SongCard = ({ song, i, isPlaying, activeSong, data, songId }) => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  console.log('idd2', songId);
  console.log('idd1', song?.key);

  const fetchLikedSongs = () => {
    axios
      .get('https://songify-v1.onrender.com/liked-songs', {
        headers: {
          authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const likedSongsData = response.data;
        setLikedSongs(likedSongsData);
        setIsLiked(likedSongsData.some((likedSong) => likedSong.key === song?.key || songId));
      })
      .catch((error) => {
        console.error('Error fetching liked songs:', error);
      });
  };
  useEffect(() => {
    fetchLikedSongs();
  }, []);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleHeartClick = () => {
    if (!token) {
      setShowPopup(true);
    } else if (isLiked) {
      axios
        .delete(`https://songify-v1.onrender.com/delete-song/${song.key || songId}`, {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log('Song removed from liked songs:', response.data);
          toast.dark('Song removed from liked songs:', response.data);

          setIsLiked(false);
        })
        .catch((error) => {
          console.error('Error removing song from liked songs:', error);
        });
    } else {
      axios
        .post(
          'https://songify-v1.onrender.com/save-song',
          { songData: song },
          {
            headers: {
              authorization: `${token}`,
            },
          },
        )
        .then((response) => {
          console.log('Song added to liked songs:', response.data);
          toast.success('Song added to liked songs:', {
            theme: 'dark',
          }, response.data);
          setIsLiked(true);
        })
        .catch((error) => {
          console.error('Error adding song to liked songs:', error);
        });
    }
  };
  // console.log(song?.relationships?.artists?.data[0]?.id);
  let toPath;

  if (song.artists) {
    toPath = `/artists/${song?.artists[0]?.adamid}`;
  } else if (song?.relationships?.artists) {
    toPath = `/artists/${song?.relationships?.artists?.data[0]?.id}`;
  } else {
    toPath = '/top-artists';
  }
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer relative">
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-black p-4 rounded-lg text-center mb-12">
            <p className="text-white mb-2">To like the song, you must</p>
            <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300">
              Login
            </Link>
            <p className="text-white mb-2">or</p>
            <button
              className="text-blue-400 font-semibold hover:text-blue-300"
              onClick={() => setShowPopup(false)}
              type="button"
            >
              Continue without Login
            </button>
          </div>
        </div>
      )}
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-opacity-70 bg-black-500' : 'hidden'}`}
        >
          <PlayPause
            song={song}
            dataa={data.attributes}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={song.images?.coverart ? song.images.coverart : song?.attributes?.images?.coverArtHq || song?.images?.coverArt || song?.images?.artistAvatar || song?.artwork?.url.replace('{w}', '350').replace('{h}', '350') || nocoverart} alt="song_img" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.key ? song?.key : songId}`} className="no-underline">
            {song.title || song?.title || song?.name}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'} className="no-underline">
            {song.subtitle}
          </Link>
        </p>
      </div>
      <div className="absolute top-2 right-2 cursor-pointer">
        {!token && (
          <div>
            <BsHeart className="w-6 h-6 text-gray-300" onClick={() => setShowPopup(true)} />
          </div>
        )}
        {token && (
          <div onClick={handleHeartClick}>
            {isLiked ? (
              <BsHeartFill className="w-6 h-6 text-rose-700" />
            ) : (
              <BsHeart className="w-6 h-6 text-gray-300" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongCard;

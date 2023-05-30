import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Foryou = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorr, setError] = useState(null);
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
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
        setIsLoading(false);
        console.log(likedSongsData);
      })
      .catch((error) => {
        console.error('Error fetching liked songs:', error);
        setError('Error fetching liked songs');
        setIsLoading(false);
      });
  }, []);

  const handleDiscoverClick = () => {
    navigate('/');
  };

  if (isLoading) {
    return <Loader title="Loading liked songs..." />;
  }

  if (errorr) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      {likedSongs.length === 0 && (
        <h2 className="font-bold text-3xl text-white text-center mt-4 mb-6">
          If you want to add songs, click{' '}
          <button
            type="button"
            className="text-blue-400 hover:text-blue-200"
            onClick={handleDiscoverClick}
          >
            here
          </button>{' '}
          to discover.
        </h2>
      )}
      <div className="flex flex-wrap sm:justify-center justify-center gap-8">
        {likedSongs.map((song, i) => {
          const songId = song.webUrl ? song.webUrl.match(/\d+/)[0] : song.id; // Check if webUrl exists before extracting the numeric portion
          return (
            <SongCard
              key={song.key}
              song={song}
              songId={songId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={likedSongs}
              i={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Foryou;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import SongCard from '../components/SongCard';

const Foryou = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [likedSongs, setLikedSongs] = useState([]);
  console.log(likedSongs);
  const token = Cookies.get('token');
  useEffect(() => {
    axios.get('http://localhost:3030/liked-songs', {
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const likedSongsData = response.data;
        setLikedSongs(likedSongsData);
      })
      .catch((error) => {
        console.error('Error fetching liked songs:', error);
      });
  }, []);

  return (
    <div>
      <h2>Liked Songs</h2>
      <div className="flex flex-wrap sm:justify-center justify-center gap-8">
        {likedSongs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={likedSongs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Foryou;

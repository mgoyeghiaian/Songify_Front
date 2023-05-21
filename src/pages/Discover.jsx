import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
// import { genres } from '../assets/constants';
import { useGetTopChartsQuery, useGetsongsGenreQuery } from '../redux/services/Spotify';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [selectedGenre, setSelectedGenre] = useState(() => localStorage.getItem('lastSelectedGenre') || 'genre-global-chart-7');
  const { data, isFetching, error } = useGetTopChartsQuery(selectedGenre);
  const { data: genre, isFetching: isFetchingSongGenre } = useGetsongsGenreQuery(selectedGenre);

  useEffect(() => {
    localStorage.setItem('lastSelectedGenre', selectedGenre);
  }, [selectedGenre]);

  const genree = genre?.global.genres;
  const dataa = data?.tracks;
  const genreName = genree?.find((genres) => genres.listid === selectedGenre)?.name; // Get the name of the selected genre

  if (isFetching || isFetchingSongGenre) {
    return <Loader title="Loading songs..." />;
  }

  if (error) {
    return <Error />;
  }

  // Apply gradient color and funky font to all genres
  const genreStyle = {
    color: 'linear-gradient(to right, #00DFFF, #FFFFFF)',
    fontFamily: 'Impact',
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover{' '}
          <span style={{ background: genreStyle.color, fontFamily: genreStyle.fontFamily, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {genreName}
          </span>
        </h2>
        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genree?.map((genreee) => (
            <option key={genreee.id} value={genreee.listid}>
              {genreee.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-end gap-8">
        {dataa?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={dataa}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

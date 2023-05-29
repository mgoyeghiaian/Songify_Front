import React from 'react';
import { Link } from 'react-router-dom';
import NoImage from '../assets/NoCoverArt.png2.png';
import PlayPause from './PlayPause';
import Apple from '../assets/icon-g3360322f6_640.png';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick, songId }) => {
  // console.log('Related Play', song);
  // console.log('SongId', songId);

  console.log('Playyyyyyyyyy', song);

  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#505052] ${activeSong?.title === song?.title ? 'bg-[#44434a]' : 'bg-transparent'} ${activeSong?.name === song?.name ? 'bg-[#44434a]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-xl"
          src={artistId ? song?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverArtHq || song?.images?.coverArt || song?.images?.artistAvatar || NoImage}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${songId}`}>
              <p className="text-xl font-bold text-white">
                {song?.title}
              </p>
            </Link>
          ) : (
            <Link to={`/song/${songId || song?.id}`}>
              <p className="text-xl font-bold text-white">
                {song?.name}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-300 mt-1">
            {artistId ? song?.albumName : song?.artist}
          </p>

          {artistId ? (
            <div>
              <p className="text-base text-gray-500 mt-1">
                {song.composerName}
              </p>
            </div>

          ) : (null)}
        </div>
      </div>
      {
        !artistId
          ? (
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(song, i)}
            />
          )
          : (
            <a
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Apple} alt="Apple Music" className="w-7 h-7 mr-2 hover:opacity-70" />
            </a>
          )
      }
    </div>
  );
};
export default SongBar;

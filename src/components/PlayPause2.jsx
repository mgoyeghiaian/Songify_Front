import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause2 = ({ isPlaying, activeSong, handlePause, handlePlay, song }) => (
  isPlaying && activeSong?.name === song.name ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (<FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  ));

export default PlayPause2;

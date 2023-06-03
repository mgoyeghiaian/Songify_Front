import { Link } from 'react-router-dom';
import Apple from '../assets/icon-g3360322f6_640.png';
import NoImage from '../assets/NoCoverArt.png2.png';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artistt = artistData?.artists[artistId].attributes;
  // console.log(artistt);
  // console.log(artistData);

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-gray-800 sm:h-48 h-28  " />
      <div className="absolute inset-0 flex">
        <img
          alt="art"
          src={artistId ? artistt.artwork?.url.replace('{w}', '400').replace('{h}', '400') : songData?.images?.coverart || songData.artwork?.url.replace('{w}', '400').replace('{h}', '400') || NoImage}
          className="sm:w-48 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-gray-600 p-2 bg-gray-500"
        />
        <div className="ml-8">
          <p className="font-bolder sm:text-3xl text-xl text-white md:mt-8">{artistId ? artistt.name : songData?.title || songData?.name}</p>
          {!artistId && (
            <Link to={`/artists/${songData?.artists ? songData?.artists[0]?.adamid : songData?.artists}`}>
              <p className="text-basse text-gray-400 mt-2">
                {songData?.subtitle || songData?.artistName}
              </p>
            </Link>
          )}
          <p className="text-basse text-gray-400 mt-4  text-lg">
            {artistId ? artistt?.genreNames[0] : songData?.genres?.primary || songData?.genreNames[0]}
          </p>
          {artistId ? (
            <div className="flex flex-grow mt-3 mr-5">
              <a
                href={artistt?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Apple} alt="Apple Music" className="w-7 h-7 mr-2 hover:opacity-70" />
              </a>
            </div>
          ) : (null)}
        </div>
      </div>
      <div className=" w-full sm:h-34 h-14" />
    </div>

  );
};
export default DetailsHeader;

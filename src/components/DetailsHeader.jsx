import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artistt = artistData?.artists[artistId].attributes;
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-gray-700 sm:h-48 h-28 " />
      <div className="absolute inset-0 flex  ">
        <img
          alt="art"
          src={artistId ? artistt.artwork?.url.replace('{w}', '500').replace('{h}', '500') : songData?.images?.coverart}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-gray-600"
        />
        <div className="ml-5">
          <p className="fon-bold sm:text-3xl text-xl text-white">{artistId ? artistt.name : songData?.title}</p>
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-basse text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}
          <p className="text-basse text-gray-400 mt-2">
            {artistId ? artistt?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>
      </div>
      <div className=" w-full sm:h-34 h-14" />
    </div>

  );
};
export default DetailsHeader;

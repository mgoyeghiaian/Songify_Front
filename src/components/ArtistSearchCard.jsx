import { useNavigate } from 'react-router-dom';

const ArtistSearchCard = ({ track }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-[210px]  sm:w-[180px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer hover:bg-gray-600" onClick={() => navigate(`/artists/${track?.adamid}`)}>
      <img alt="Atrist" src={track?.avatar} className="w-full h-46 rounded-full " />
      <p className="mt-4 font-semibold text-lg text-white text-center truncate">{track.name}</p>
    </div>
  );
};

export default ArtistSearchCard;

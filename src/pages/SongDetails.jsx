import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetRelatedSongsQuery, useGetSongDetailsQuery } from '../redux/services/Spotify';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // console.log(songid);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetRelatedSongsQuery({ songid });
  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching Song Details...." />;
  if (error) return <Error />;
  const dataaaa = Object.values(data?.resources['shazam-songs']);

  console.log('DetailsHeader', songData);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId=""
        songData={songData}
      />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-col">Lyrics</h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((line, i) => (
            <p className="text-gray-400 text-base my-1">{line}</p>
          )) : <p className="text-gray-400 text-base my-1">Sorry, No Lyrics!</p>}
        </div>
      </div>
      <h1 className="font-bold text-3xl text-white mb-5 ">Related Songs:</h1>
      <RelatedSongs
        data={dataaaa}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};
export default SongDetails;

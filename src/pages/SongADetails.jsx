import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader } from '../components';
import { useGetSongADetailsQuery } from '../redux/services/Spotify';
// import { setActiveSong, playPause } from '../redux/features/playerSlice';

const SongADetails = () => {
  const { songid } = useParams();
  // const dispatch = useDispatch();
  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // console.log(songid);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongADetailsQuery({ songid });
  // const { data, isFetching: isFetchingRelatedSongs, error } = useGetRelatedSongsQuery({ songid });
  if (isFetchingSongDetails) return <Loader title="Searching Song Details...." />;
  // if (error) return <Error />;
  // const dataaaa = Object.values(data.resources['shazam-songs']);
  const dataa = songData.data[0]?.attributes;
  // console.log('LYrics', dataa);

  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };
  // const handlePlayClick = (song, i) => {
  //   dispatch(setActiveSong({ song, data, i }));
  //   dispatch(playPause(true));
  // };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId=""
        songData={dataa}
      />
      <div className="mb-10">
        {/* <h2 className="text-white text-3xl font-col">Lyrics</h2>
        <div className="mt-5">
          {dataa?.sections[1].type === 'LYRICS' ? dataa?.sections[1].text.map((line, i) => (
            <p className="text-gray-400 text-base my-1">{line}</p>
          )) : <p className="text-gray-400 text-base my-1">Sorry, No Lyrics!</p>}
        </div> */}
      </div>
      {/* <RelatedSongs
        data={dataaaa}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      /> */}
    </div>
  );
};
export default SongADetails;

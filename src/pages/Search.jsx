import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Error, Loader, SongCard, ArtistSearchCard } from '../components';
import { useGetSearchDetailsQuery } from '../redux/services/Spotify';

const Search = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { searchTerm } = useParams();
  const { data, isFetching, error } = useGetSearchDetailsQuery(searchTerm);
  if (isFetching) return <Loader title="Searcing...." />;
  if (error) return <Error />;

  const songs = data?.tracks?.hits?.map((song) => song.track);
  const artist = data?.artists?.hits?.map((song) => song.artist);
  // console.log(songs);
  // console.log(artist);

  return (
    <div className="flex flex-col">
      <div>
        <h2 className="font-bold text-3xl text-white text-center mt-12 mb-10">Top Artist Related To "{searchTerm}"</h2>
        <div className="flex flex-wrap sm:justify-center rounded-full justify-center gap-8">
          {artist?.map((track) => (
            <ArtistSearchCard
              key={track.key}
              track={track}
            />
          ))}
        </div>
      </div>
      <h2 className="font-bold text-3xl text-white text-center mt-10 mb-10"> Top Songs Related To "{searchTerm}"</h2>
      <div className="flex flex-wrap sm:justify-center justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
          />
        ))}
      </div>

    </div>
  );
};
export default Search;

import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) =>
// console.log('Related Songs', dataaaa);

(
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs...</h1>
    <div className=",t-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.id}-${artistId}`}
          song={song.attributes}
          i={i}
          songId={song.id}
          artistId={artistId}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  </div>
);
export default RelatedSongs;

import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => (
  <div className="flex flex-col">
    <div className=",t-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          data2={song}
          key={`${song.id}-${artistId}`}
          song={song.attributes}
          i={i}
          data={song}
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

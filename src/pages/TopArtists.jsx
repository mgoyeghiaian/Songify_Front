import { Error, Loader, ArtistCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/Spotify';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const CountryData = data?.tracks;
  console.log(CountryData);
  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt04 mb-10">Top Artists</h2>
      <div className="flex flex-wrap sm:justify-center justify-center gap-8">
        {CountryData?.map((track) => (
          <ArtistCard
            key={track.adamid}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};
export default TopArtists;

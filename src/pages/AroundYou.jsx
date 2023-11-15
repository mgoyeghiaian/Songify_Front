import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Flag from 'react-world-flags';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/Spotify';

const AroundYou = () => {
  const [country, setCountry] = useState('ar-lb');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // console.log(country);

  useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_OaRWXjmPt9NFimCrs6HP1SFT8299s')
      .then((res) => setCountry(res?.data?.location?.country))
      .finally(() => setLoading(false));
  }, [country]);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  const CountryData = data?.tracks;
  if (isFetching && loading) return <Loader title="Loading Songs Around You ....." />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt04 mb-10">Top Songs In
        <p className="inline ml-2">{country} <Flag code={country} className=" w-7 h-7 inline" /></p>
      </h2>
      <div className="flex flex-wrap sm:justify-center justify-center gap-8">
        {CountryData?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={CountryData}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
export default AroundYou;

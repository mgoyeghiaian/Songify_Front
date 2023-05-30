import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { data } from 'autoprefixer';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/Spotify';
import { useGetYoutubeDetailsQuery } from '../redux/services/Youtube';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  const [artistName, setArtistName] = useState('');
  const [artistGenre, setArtistGenre] = useState('');
  // console.log('artisttt', artistName);
  useEffect(() => {
    if (artistData) {
      const adataaa = artistData?.resources;
      const DAtaV1 = Object.values(adataaa?.songs);
      setArtistName(DAtaV1[0].attributes?.artistName);
      setArtistGenre(DAtaV1[0].attributes?.albumName || DAtaV1[0].attributes?.genreNames[0]);
    }
  }, [artistData]);

  const { data: YoutubeData, isFetching: isFetchingYoutubeDetails } = useGetYoutubeDetailsQuery({
    artistName,
    artistGenre,
  });

  if (isFetchingArtistDetails) return <Loader title="Loading Artist Details" />;
  if (error) return <Error />;
  // console.log('youtubeDetails', YoutubeData);
  // console.log('songsssss', artistGenre);
  const adataaa = artistData?.resources;
  const videoData = YoutubeData?.items[0];
  const videoUrl = videoData?.url;
  const videoId = videoUrl?.split('v=')[1];
  // console.log(videoId);
  // console.log('Videourl', videoData);

  return (
    <div>
      <div className="flex flex-col">
        <DetailsHeader artistId={artistId} artistData={adataaa} />
        <div className="my-5">
          <h3 className="text-center text-2xl font-bold mb-3 text-white">Top Videos on YouTube</h3>
          {isFetchingYoutubeDetails ? (
            <div className="flex justify-center items-center h-48 md:h-[350px] bg-gray-700">
              <span className="text-white-600 text-xl text-white">
                <Loader title="Loading video" />
              </span>
            </div>
          ) : (
            <iframe
              id="inlineFrameExample"
              title="Inline Frame Example"
              className="mx-auto w-full h-[450px] lg:h-[650px]"
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <h1 className="font-bold text-3xl text-white mb-5 ">Top Songs & Albums:</h1>

        <RelatedSongs data={Object.values(adataaa?.songs)} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} />
      </div>
    </div>
  );
};

export default ArtistDetails;

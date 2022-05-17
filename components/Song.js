import React from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  //   uri -> uniform resource identifier
  //   its an array because you can go ahead and push
  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    //   padding on the y axis is 4
    // padding on the x axis is 5
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>
          {/* i am doing order plus 1 because the counting starts from 0 in coding */}
          {order + 1}
          {/* we are pointing towards zero which is the first item  */}
          {/* h-10 and w-10 means height of 10 and width of 10 */}
          <img
            className="h-10 w-10"
            src={track.track.album.images[0].url}
            alt=""
          />
        </p>
        <div>
          {/* with of 36 and on the large screen we are going for width of 64 */}
          <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      {/* we are doing margin left auto and for medium and above margin left should be zero */}
      <div className="flex items-center justify-between ml-auto">
        {/* so this will be hidden unless it is on a medium screen */}
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;

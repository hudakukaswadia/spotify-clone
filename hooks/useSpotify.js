import { useSession, signIn } from "next-auth/react";
import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

function useSpotify() {
  const { data: session, status } = useSession();

  //this useEffect will run on mount initially but it will have a dependency which is session
  //so it will run on mount and whenever the session changes so if i login logout etc

  useEffect(() => {
    if (session) {
      //so if for whatever reason the refresh token error happened
      //then we will push them to the manual sign in page
      //and get them to login all again
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      //so what we are doing is that we are setting the access token for the api
      //that will be used throughpout the build
      //singleton pattern here
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;

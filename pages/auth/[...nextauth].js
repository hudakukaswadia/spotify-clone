import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "../../lib/spotify";

async function refreshAccessToken(token) {
    try {

    } catch (error) {
        console.log(error)

        return {
            ...token, 
            error: 'RefreshAccessTokenError'
        }
    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },

  //if you sign in succesfully it will return:
  //1. an account variable
  //2. and a user variable
  callbacks: {
    async jwt({ token, account, user }) {
      //if it is your initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //we are handling expiry time in milliseconds hence * 1000
        };
      }

      //if you are coming back to the website and your access token is still valid 
      //so it means that it hasn't passed an hour as in the above code, we set it to expiration in 1 hour
      //then we will return the previous token if the access token hasn't expired
      if(Date.now() < token.accessTokenExpires) {
          console.log("EXISTING ACCESS TOKEN IS VALID")
          return token;
      }

      // if your access token has expired
      // then we will update it which means refresh it 
      console.log("ACESS TOKEN HAS EXPIRED, REFRESHING");
      return await refreshAccessToken(token)

    },
  },
});

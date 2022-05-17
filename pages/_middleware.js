import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //make sure to pass the secret alongside req or else anyone can get in
  //The token below will exist if the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  //allow the request if the following is true
  //1. if its a request for next-auth session and provider fetching
  //2. if the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //Redirect them to login if they don't have the token and they are requesting a protected route
  // the only thing that is unprotected here is /login
  if (!token && pathname == "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
}

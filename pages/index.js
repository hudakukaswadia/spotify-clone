import { getSession } from "next-auth/react";
import React from "react";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      {/* make sure to set the container to flex  */}
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

//we are pre-rendering the user on the server which will 
//give us the access token before it hits the client 
//which means we have the key 
//hence it will work
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

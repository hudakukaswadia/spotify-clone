import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { LOGIN_URL } from "../lib/spotify";

//we are going to do Server Side Render to get all of the providers from [...nextauth]
//so before the page loads -> it needs to render on the server

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />

      {/* the code below -> it goes through the providers array that came back and it gives me the key and value pair */}
      {/* so the dot map function can be read as -> for every provider, i want to do the following */}

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}{" "}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

//getServerSideProps -> will run on the server before the page gets delivered
//so anytime someone comes to the login page -> i want to make sure that i get the latest providers
//for getServerSideProps -> you always have to return an object with props inside it
//and in react you can access your props in the functional component which is function Login() at the top of the page

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers: providers,
    },
  };
}

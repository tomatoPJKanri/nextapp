import type { NextPage } from "next";
import Auth from "../src/components/Auth";
import Main from "../src/components/Main";

const Home: NextPage = ({ isLoggedIn, user }: any) => {
  return <div>{isLoggedIn ? <Main user={user} /> : <Auth />}</div>;
};

export default Home;

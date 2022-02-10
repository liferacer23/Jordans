import Head from "next/head";
import dbConnect from "../util/mongo";
import Featured from "../components/Featured/Featured";
import Trending from "../components/Trending/Trending";
import Article from "../components/Article";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sneakers | Home</title>
      </Head>
      <Featured />
      <Article />
      <Trending />
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  await dbConnect();

  // const HOST = process.env.APP_URL
  //const res = await axios.get(`${HOST}/api/jordans`);

  return {
    props: {},
  };
};

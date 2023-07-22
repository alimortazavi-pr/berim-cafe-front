import Head from "next/head";

//Components
import HeroSection from "@/components/home/HeroSection";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>بریم کافه | کافه های اطرافتو پیدا کن</title>
      </Head>
      <HeroSection />
    </div>
  );
};

export default Home;

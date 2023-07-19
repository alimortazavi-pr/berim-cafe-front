import { GetServerSideProps } from "next";

const Cafe = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  return {
    redirect: {
      destination: `/${query.username}/menu`,
      permanent: false,
    },
  };
};

export default Cafe;

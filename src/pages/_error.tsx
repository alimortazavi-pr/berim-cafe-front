import { errorPageProps } from "@/common/types/layouts.type";
import { NextPageContext } from "next";

const Error = ({ statusCode, message }: errorPageProps) => {
  return (
    <p className="text-zinc-800">
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 500;
  return { statusCode };
};

export default Error;

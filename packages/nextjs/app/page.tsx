"use client";

import type { NextPage } from "next";
import { NFTCollection } from "~~/components/example-ui/NFTCollection";
import { TokenBalance } from "~~/components/example-ui/TokenBalance";
import { TokenTransfer } from "~~/components/example-ui/TokenTransfer";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex-grow bg-base-300 w-full mt-16 px-4 py-12">
          <div className="flex justify-center items-start gap-6 flex-col lg:flex-row max-w-7xl mx-auto">
            <div className="flex flex-col px-6 py-6 text-center items-center rounded-3xl w-full lg:w-auto">
              <TokenBalance />
            </div>
            <div className="flex flex-col px-6 py-6 text-center items-center rounded-3xl w-full lg:w-auto">
              <TokenTransfer />
            </div>
            <div className="flex flex-col px-6 py-6 text-center items-center rounded-3xl w-full lg:w-auto">
              <NFTCollection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

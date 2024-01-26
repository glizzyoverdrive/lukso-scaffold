import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">

            <span className="block text-4xl font-bold">99ers 🛠️</span>
            <span className="block text-md mt-4 mb-2">powered by a lukso community</span>
          </h1>

        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              
              <p>
                Stake{" "}
                <Link href="/debug" passHref className="link">
                  Vault Contract
                </Link>{" "}
                .
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              
              <p>
                99 Tools & Chat{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Connect NFT
                </Link>{" "}
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

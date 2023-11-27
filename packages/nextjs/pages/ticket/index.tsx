import Link from "next/link";
import { Links } from "../../modules/ticket/links";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col pt-6">
        <div className="px-0 mx-0">
          <Links />
        </div>
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">My Tickets</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        {!isConnected || isConnecting ? (
          <RainbowKitCustomConnectButton />
        ) : (
          <button className="btn btn-secondary">Mint Ticket</button>
        )}
      </div>
    </>
  );
};

export default Home;

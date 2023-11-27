import { MyHoldings } from "../../modules/nfts/components/MyHoldings";
import { Links } from "../../modules/nfts/links";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useContractWrite } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const MyNFTs: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const { writeAsync: publicMint } = useScaffoldContractWrite({
    contractName: "LuksoCloneX",
    functionName: "publicMint",
    args: [connectedAddress, BigInt(1), true],
    value: parseEther("0.01"), //0.01 LYX
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { data: tokenIdCounter } = useScaffoldContractRead({
    contractName: "LuksoCloneX",
    functionName: "totalSupply",
    watch: true,
    cacheOnBlock: true,
  });

  const handleMintItem = async () => {
    const notificationId = notification.loading("Minting ...");
    try {
      // First remove previous loading notification and then show success notification
      notification.remove(notificationId);
      //notification.success("Metadata uploaded to IPFS");

      await publicMint();
    } catch (error) {
      notification.remove(notificationId);
      console.error(error);
    }
  };

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col pt-6">
        <div className="px-0 mx-0">
          <Links />
        </div>
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">My NFTs</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        {!isConnected || isConnecting ? (
          <RainbowKitCustomConnectButton />
        ) : (
          <button className="btn btn-secondary" onClick={() => handleMintItem()}>
            Mint NFT
          </button>
        )}
      </div>
      <MyHoldings />
    </>
  );
};

export default MyNFTs;

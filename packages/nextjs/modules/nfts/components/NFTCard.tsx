import { useState } from "react";
import { Address, AddressInput } from "../../../components/scaffold-eth";
import { Collectible } from "./MyHoldings";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  const [transferToAddress, setTransferToAddress] = useState("");

  const { writeAsync: transferNFT } = useScaffoldContractWrite({
    contractName: "LuksoCloneX",
    functionName: "transfer",
    args: [nft.owner, transferToAddress, nft.tokenId as `0x${string}`, true, "" as `0x${string}`],
  });

  return (
    <div className="card card-compact bg-base-100 shadow-lg sm:min-w-[300px] max-w-[300px] shadow-secondary">
      <figure className="relative">
        {/* eslint-disable-next-line  */}
        <img src={nft.imageUrl} alt="NFT Image" className="h-60 min-w-full" />
        <figcaption className="glass bg-primary absolute bottom-4 left-4 p-4 w-25 rounded-xl">
          <span className="text-white font-semibold"># {nft.id}</span>
        </figcaption>
      </figure>
      <div className="card-body space-y-2">
        <div className="flex text-xl p-0 m-0 font">{nft.name}</div>
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap space-x-1 mt-1">
            {nft.attributes?.map((attr, index) => (
              <span key={index} className="badge badge-secondary text-xs py-2 my-1 mx-1">
                {attr.value}
              </span>
            ))}
          </div>
        </div>
        {/*<div className="flex flex-col justify-center mt-1">
          <p className="my-0 text-lg">{nft.description}</p>
            </div>*/}
        <div className="flex space-x-3 mt-1 items-center">
          <span className="text-lg font-semibold">Owner : </span>
          <Address address={nft.owner} />
        </div>
        <div className="flex flex-col my-2 space-y-1">
          <span className="text-lg font-semibold mb-1">Transfer To: </span>
          <AddressInput
            value={transferToAddress}
            placeholder="receiver address"
            onChange={newValue => setTransferToAddress(newValue)}
          />
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-md px-8 tracking-wide" onClick={() => transferNFT()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

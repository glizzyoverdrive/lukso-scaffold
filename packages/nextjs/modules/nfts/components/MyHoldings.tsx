import { useEffect, useState } from "react";
import { NFTMetaData, getNFTMetadataFromIPFS } from "../utils/ipfs";
import { NFTCard } from "./NFTCard";
import { useAccount } from "wagmi";
import { Spinner } from "~~/components/Spinner";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export interface Collectible extends Partial<NFTMetaData> {
  id: number;
  tokenId: string;
  uri: string;
  owner: string;
  imageUrl: string;
}

export const MyHoldings = () => {
  const { address: connectedAddress } = useAccount();
  const [myAllCollectibles, setMyAllCollectibles] = useState<Collectible[]>([]);
  const [allCollectiblesLoading, setAllCollectiblesLoading] = useState(false);

  const { data: luksoCloneXContract } = useScaffoldContract({
    contractName: "LuksoCloneX",
  });

  const { data: myTotalBalance } = useScaffoldContractRead({
    contractName: "LuksoCloneX",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  useEffect(() => {
    const updateMyCollectibles = async (): Promise<void> => {
      if (myTotalBalance === undefined || luksoCloneXContract === undefined || connectedAddress === undefined) return;
      const myTokens = await luksoCloneXContract.read.tokenIdsOf([connectedAddress]);
      setAllCollectiblesLoading(true);
      const collectibleUpdate: Collectible[] = [];
      const totalBalance = parseInt(myTotalBalance.toString());
      for (let tokenIndex = 0; tokenIndex < totalBalance; tokenIndex++) {
        try {
          // console.log(myTokens[tokenIndex]);
          // console.log(await luksoCloneXContract.read.getData([myTokens[tokenIndex]]));

          const ipfsHash = `https://gateway.pinata.cloud/ipfs/QmZh7P3YZNxFZUiHkXLNgAtdk2T6PAza3S15Jjg1DzxVGf/${parseInt(
            myTokens[tokenIndex],
          )}`;

          const response = await fetch(ipfsHash);
          const nftMetadata = await response.json();
          console.log(nftMetadata.LSP4Metadata);

          collectibleUpdate.push({
            id: parseInt(myTokens[tokenIndex]),
            tokenId: myTokens[tokenIndex],
            uri: ipfsHash,
            owner: connectedAddress,
            imageUrl: nftMetadata.LSP4Metadata.images[0][0]["url"],
            ...nftMetadata.LSP4Metadata,
          });
        } catch (e) {
          notification.error("Error fetching all collectibles");
          setAllCollectiblesLoading(false);
          console.log(e);
        }
      }
      collectibleUpdate.sort((a, b) => a.id - b.id);
      setMyAllCollectibles(collectibleUpdate);
      setAllCollectiblesLoading(false);
    };

    updateMyCollectibles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAddress, myTotalBalance]);

  if (allCollectiblesLoading)
    return (
      <div className="flex justify-center items-center mt-10">
        <Spinner width="75" height="75" />
      </div>
    );

  return (
    <>
      {myAllCollectibles.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No NFTs found</div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
          {myAllCollectibles.map(item => (
            <NFTCard nft={item} key={item.id} />
          ))}
        </div>
      )}
    </>
  );
};

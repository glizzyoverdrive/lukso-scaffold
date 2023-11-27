import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ProfileCard from "../../modules/universalprofile/components/ProfileCard";
import { Links } from "../../modules/universalprofile/links";
//import { LSPFactory, ProfileDataBeforeUpload } from "@lukso/lsp-factory.js";
import { getAccount } from "@wagmi/core";
import type { NextPage } from "next";
import { useAccount, usePublicClient } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useEthersProvider, useEthersSigner } from "~~/lukso/utils/ethers";
import { createContractsInstance, deployUniversalProfile, fetchUniversalProfile } from "~~/lukso/utils/profile";
import { notification } from "~~/utils/scaffold-eth";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

const FetchProfile: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const [upAddress, setUpAddress] = useState("");
  const [profile, setProfile] = useState({});

  const inputAddress = useRef<HTMLInputElement>(null);

  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const publicClient = usePublicClient();

  const createProfile = async () => {
    const notificationId = notification.loading("Creating profile with default info ...");
    const lsp3Profile = {
      name: "My Universal Profile",
      description: "My Cool Universal Profile",
      tags: ["Public Profile"],
      links: [
        {
          title: "My Website",
          url: "https://my-website.com",
        },
      ],
    };

    const controllers: string[] = [(await signer?.getAddress()) ?? ""];
    try {
      const deployedAddress = await deployUniversalProfile(provider, signer, controllers, lsp3Profile);

      if (deployedAddress) {
        notification.remove(notificationId);
        notification.success("Profile created successfully!");
        setUpAddress(deployedAddress);
      }
    } catch (error) {
      notification.remove(notificationId);
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    // 0x0E90f7F3725d97A5E956581EEE6D8a0F51C8EfF8 - on testnet
    // 0x3E04Fd79D498e1CCC77dAAe33199b0Fe7158a059 - on testnet
    // @ts-ignore
    const fetchedProfile = await fetchUniversalProfile(publicClient.transport, inputAddress.current.value);
    console.log(fetchedProfile);

    setProfile(fetchedProfile);
  };

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col pt-6">
        <div className="px-0 mx-0">
          <Links />
        </div>
      </div>
      <div className="flex justify-center">
        {!isConnected || isConnecting ? (
          <RainbowKitCustomConnectButton />
        ) : (
          <div className="flex items-left">
            <input
              type="text"
              ref={inputAddress}
              className="input w-96 mr-4"
              defaultValue="0x3E04Fd79D498e1CCC77dAAe33199b0Fe7158a059"
            />
            <button className="btn btn-secondary" onClick={() => fetchProfile()}>
              Fetch Profile
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-6">
        <DynamicReactJson
          style={{ padding: "1rem", borderRadius: "0.75rem", width: "50%" }}
          src={profile}
          theme="solarized"
          enableClipboard={false}
          // onEdit={edit => {
          //   setYourJSON(edit.updated_src);
          // }}
          // onAdd={add => {
          //   setYourJSON(add.updated_src);
          // }}
          // onDelete={del => {
          //   setYourJSON(del.updated_src);
          // }}
        />
      </div>

      <div className="flex mt-10 justify-center">{/*profile ? <ProfileCard profile={profile} /> : ""*/}</div>
    </>
  );
};

export default FetchProfile;

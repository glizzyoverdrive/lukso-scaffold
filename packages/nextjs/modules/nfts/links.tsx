import { ArrowDownTrayIcon, ArrowPathIcon, ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { NavLink } from "~~/components/NavLink";

export const Links = () => {
  return (
    <ul className="flex flex-wrap gap-2 my-4 px-2 justify-center">
      <li>
        <NavLink href="/nfts">
          <PhotoIcon className="h-4 w-4" />
          My NFTs
        </NavLink>
      </li>
      <li>
        <NavLink href="/nfts/transfers">
          <ArrowPathIcon className="h-4 w-4" />
          Transfers
        </NavLink>
      </li>
      <li>
        <NavLink href="/nfts/ipfsUpload">
          <ArrowUpTrayIcon className="h-4 w-4" />
          IPFS Upload
        </NavLink>
      </li>
      <li>
        <NavLink href="/nfts/ipfsDownload">
          <ArrowDownTrayIcon className="h-4 w-4" />
          IPFS Download
        </NavLink>
      </li>
    </ul>
  );
};

import { getInstance } from "./erc725";
import { LSPFactory, ProfileDataBeforeUpload, UniversalProfile } from "@lukso/lsp-factory.js";
import LSP6KeyManagerJSON from "@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json";
import UniversalProfileJSON from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
//import { Wallet } from "ethers";
// import { AbiItem } from "web3-utils";
// import { ADDRESSES } from "~~/lukso/consts/main";
import { PublicClient, WalletClient, getContract, keccak256 } from "viem";

export const deployUniversalProfile = async (
  provider: any,
  signer: any,
  controllers: string[],
  profile: ProfileDataBeforeUpload | any,
) => {
  const lspFactory = new LSPFactory(provider, signer);

  const deployedContracts = await lspFactory.UniversalProfile.deploy({
    controllerAddresses: controllers,
    lsp3Profile: profile as ProfileDataBeforeUpload,
  });

  const upAddress = deployedContracts.LSP0ERC725Account.address;
  console.log("Universal Profile Address: ", upAddress);

  //return deployedContracts;
  return deployedContracts?.LSP0ERC725Account?.address;
};

export const fetchUniversalProfile = async (provider: any, contractAddress: string): Promise<any> => {
  const erc725 = getInstance(provider, contractAddress);
  let response;
  try {
    response = await erc725.fetchData("LSP3Profile");
  } catch (e) {
    console.log(e);
  }
  console.log("fetchUniversalProfile", response);
  return response;
};

export const fetchERC725Data = async (provider: any, contractAddress: string): Promise<any> => {
  const erc725 = getInstance(provider, contractAddress);
  let response;
  try {
    response = await erc725.fetchData(["LSP3Profile", "LSP1UniversalReceiverDelegate"]);
  } catch (e) {
    console.log(e);
  }
  console.log("fetchERC725Data", response);
  return response;
};

const uploadMetadataToIPFS = async (metadata: any) => {
  const uploadResult = await UniversalProfile.uploadProfileData(metadata);

  return uploadResult.url;
};

export const createContractsInstance = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  profileAddress: string,
) => {
  const profileContract = getContract({
    address: profileAddress,
    abi: UniversalProfileJSON.abi,
    publicClient,
    walletClient,
  });
  const keyManagerAddress = (await profileContract.read.owner()) as string;
  const keyManagerContract = getContract({
    address: keyManagerAddress,
    abi: LSP6KeyManagerJSON.abi,
    publicClient,
    walletClient,
  });

  return { profileContract, keyManagerContract };
};

export const updateUniversalProfile = async (
  walletClient: WalletClient,
  publicClient: PublicClient,
  provider: any,
  accountAddress: string,
  profile: any,
) => {
  const profileMetadataIPFSUrl = await uploadMetadataToIPFS(profile);
  const erc725 = getInstance(provider, profile.address);
  const encodedData = erc725.encodeData([
    {
      keyName: "LSP3Profile",
      value: {
        verification: {
          method: "keccak256(utf8)",
          data: `0x{keccak256(JSON.stringify({ LSP3Profile: profile }))}`,
        },
        url: profileMetadataIPFSUrl,
      },
    },
  ]);
  const { profileContract, keyManagerContract } = await createContractsInstance(
    publicClient,
    walletClient,
    profile.address,
  );

  const hash = await profileContract.write.setData(encodedData.keys, encodedData.values);

  // const abiPayload = await profileContract.methods
  //   .setData([encodedData.LSP3Profile.key], [encodedData.LSP3Profile.value])
  //   .encodeABI();

  // const result = await keyManagerContract.methods
  //   .execute(abiPayload)
  //   .send({ from: accountAddress, gasLimit: 3_000_000 });

  return hash;
};

// export const getData = async (address: string, keys: string[], web3: Web3) => {
//   const Contract = new web3.eth.Contract(
//     [
//       {
//         stateMutability: "view",
//         type: "function",
//         inputs: [
//           {
//             internalType: "bytes32[]",
//             name: "_keys",
//             type: "bytes32[]",
//           },
//         ],
//         name: "getData",
//         outputs: [
//           {
//             internalType: "bytes[]",
//             name: "values",
//             type: "bytes[]",
//           },
//         ],
//       },
//     ],
//     address,
//   );

//   let data: string[] = [];
//   try {
//     data = await Contract.methods.getData(keys).call();
//   } catch (err: any) {
//     console.log(err.message);
//   }

//   return data;
// };

// // const getDataMultiple = async (address: string, keys: string[], web3: Web3) => {
// //   const abi: AbiItem[] = [
// //     {
// //       type: 'function',
// //       stateMutability: 'view',
// //       outputs: [
// //         {
// //           type: 'bytes[]',
// //           name: '',
// //           internalType: 'bytes[]'
// //         }
// //       ],
// //       name: 'getDataMultiple',
// //       inputs: [
// //         {
// //           type: 'bytes32[]',
// //           name: '_keys',
// //           internalType: 'bytes32[]'
// //         }
// //       ]
// //     }
// //   ]
// //   const Contract = new web3.eth.Contract(abi, address)
// //   let dataMultiple: string[] = []
// //   try {
// //     dataMultiple = await Contract.methods.getDataMultiple(keys).call()
// //   } catch (err: any) {
// //     console.log(err.message)
// //     console.log('getDataMultiple not working, fetching with getData')
// //     dataMultiple = await Promise.all(keys.map((key) => getDataLegacy(address, web3, key)))
// //   }

// //   return dataMultiple
// // }

// const getAllDataKeys = async (address: string, web3: Web3): Promise<string[]> => {
//   const abi: AbiItem[] = [
//     {
//       type: "function",
//       stateMutability: "view",
//       outputs: [
//         {
//           type: "bytes32[]",
//           name: "",
//           internalType: "bytes32[]",
//         },
//       ],
//       name: "allDataKeys",
//       inputs: [],
//     },
//   ];
//   const Contract = new web3.eth.Contract(abi, address);
//   let allDataKeys = [];
//   try {
//     allDataKeys = await Contract.methods.allDataKeys().call();
//   } catch (err: any) {
//     console.log(err.message);
//   }

//   return allDataKeys;
// };

// export const getAddressesWithPermissions = async (profileAddress: string, web3: Web3) => {
//   const getKeys = await getAllDataKeys(profileAddress, web3);
//   const permissionKey = ADDRESSES.PERMISSIONS;
//   const permissionKeys = getKeys.filter(key => key.indexOf(permissionKey) !== -1);
//   const addressesWithPermissions = permissionKeys.map(key => key.replace(permissionKey, "0x"));

//   return addressesWithPermissions;
// };

// export const hasPermission = async (profileAddress: string, accountAddress: string, web3: Web3) => {
//   const addressesWithPermissions = await getAddressesWithPermissions(profileAddress, web3);
//   const hasPermission = addressesWithPermissions.includes(accountAddress.toLowerCase());

//   return hasPermission;
// };

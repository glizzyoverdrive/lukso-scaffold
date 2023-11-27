import { ethers } from "hardhat";

async function main() {
  const args = {
    //gasPrice: "0xB2D05E00", // 3 Gwei
    gasPrice: 10000000000,
    gasLimit: 6721975,
  };

  const accounts = await ethers.getSigners();
  const deployer = accounts[0].address;

  console.log("deploying LuksoCloneX...");
  const LuksoCloneX = await ethers.getContractFactory("LuksoCloneX");
  const luksoCloneX = await LuksoCloneX.deploy(deployer, args);
  await luksoCloneX.deployed();
  console.log("LuksoCloneX deployed to:", luksoCloneX.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

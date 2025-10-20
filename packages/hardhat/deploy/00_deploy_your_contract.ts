import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  // Deploy ERC20 Token
  await deploy("MyToken", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  // Deploy SimpleUSDC
  await deploy("SimpleUSDC", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  // Deploy ERC721 NFT
  await deploy("MyNFT", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  // Get deployed token addresses for DEX
  const myToken = await get("MyToken");
  const simpleUSDC = await get("SimpleUSDC");

  console.log("Deploying SimpleDEX with:");
  console.log("  Token A (MyToken):", myToken.address);
  console.log("  Token B (SimpleUSDC):", simpleUSDC.address);

  // Deploy SimpleDEX
  await deploy("SimpleDEX", {
    from: deployer,
    args: [myToken.address, simpleUSDC.address],
    log: true,
    autoMine: true,
  });

  // Get deployed MyNFT address for NFTMarketplace
  const myNFT = await get("MyNFT");

  console.log("Deploying NFTMarketplace with:");
  console.log("  NFT Contract (MyNFT):", myNFT.address);

  // Deploy NFTMarketplace
  await deploy("NFTMarketplace", {
    from: deployer,
    args: [myNFT.address],
    log: true,
    autoMine: true,
  });
};

export default deployContracts;
deployContracts.tags = ["MyToken", "SimpleUSDC", "MyNFT", "SimpleDEX", "NFTMarketplace"];

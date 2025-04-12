import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  try {
    // Get the ContractFactory
    const DecentraCloud = await ethers.getContractFactory("DecentraCloud");

    console.log("Deploying DecentraCloud...");

    // Deploy the contract
    const decentraCloud = await DecentraCloud.deploy();
    await decentraCloud.waitForDeployment();

    const address = await decentraCloud.getAddress();
    console.log("DecentraCloud deployed to:", address);

    // Get the contract artifacts
    const artifactPath = path.join(__dirname, "../artifacts/contracts/DecentraCloud.sol/DecentraCloud.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    // Create the contract info object with ONLY the ABI and address
    const contractInfo = {
      contractAddress: address,
      abi: artifact.abi
    };

    // Save to the frontend directory
    const frontendPath = path.join(__dirname, "../../src/contracts/DecentraCloud.json");
    fs.mkdirSync(path.dirname(frontendPath), { recursive: true });
    fs.writeFileSync(
      frontendPath,
      JSON.stringify(contractInfo, null, 2)
    );

    console.log("Contract artifacts copied to frontend");
    console.log("\nDeployment complete! Please update the contract address in:");
    console.log("1. src/components/web3-provider.tsx");
    console.log(`2. Set NEXT_PUBLIC_CONTRACT_ADDRESS=${address} in your frontend .env file\n`);
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

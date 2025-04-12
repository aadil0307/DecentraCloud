const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Testing contract with the account:", deployer.address);

  // Get the contract instance
  const DecentraCloud = await ethers.getContractFactory("DecentraCloud");

  // Use the address of your deployed contract
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const decentraCloud = DecentraCloud.attach(contractAddress);

  console.log("Contract address:", await decentraCloud.getAddress());

  // Test upload file
  console.log("Uploading test file...");
  const tx = await decentraCloud.uploadFile(
    "test.txt",
    "text/plain",
    1024,
    "QmTest123456789"
  );

  await tx.wait();
  console.log("Test file uploaded");

  // Test get file count
  const fileCount = await decentraCloud.getFileCount();
  console.log("File count:", fileCount.toString());

  // Test get file
  if (fileCount > 0) {
    console.log("Getting file details...");
    const file = await decentraCloud.getFile(0);
    console.log("File details:", file);
    console.log("File name:", file[0]);
    console.log("File type:", file[1]);
    console.log("File size:", file[2].toString());
    console.log("IPFS hash:", file[3]);
    console.log("Upload date:", file[4].toString());
  }

  console.log("Contract test completed successfully");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

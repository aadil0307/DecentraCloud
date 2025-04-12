import { expect } from "chai";
import { ethers } from "hardhat";
import { DecentraCloud } from "../typechain-types";

describe("DecentraCloud", function () {
  let decentraCloud: DecentraCloud;

  beforeEach(async function () {
    const DecentraCloudFactory = await ethers.getContractFactory(
      "DecentraCloud"
    );
    decentraCloud = await DecentraCloudFactory.deploy();
    await decentraCloud.waitForDeployment();
  });

  it("Should upload a file and retrieve it", async function () {
    // Upload a file
    const fileName = "test.txt";
    const fileType = "text/plain";
    const fileSize = 1024;
    const ipfsHash = "QmTest123456789";

    await decentraCloud.uploadFile(fileName, fileType, fileSize, ipfsHash);

    // Check file count
    expect(await decentraCloud.getFileCount()).to.equal(1);

    // Retrieve the file
    const [name, type, size, hash, timestamp] = await decentraCloud.getFile(0);

    expect(name).to.equal(fileName);
    expect(type).to.equal(fileType);
    expect(size).to.equal(fileSize);
    expect(hash).to.equal(ipfsHash);
    expect(timestamp).to.be.gt(0);
  });

  it("Should delete a file", async function () {
    // Upload a file
    const fileName = "test.txt";
    const fileType = "text/plain";
    const fileSize = 1024;
    const ipfsHash = "QmTest123456789";

    await decentraCloud.uploadFile(fileName, fileType, fileSize, ipfsHash);

    // Delete the file
    await decentraCloud.deleteFile(0);

    // Verify the file is deleted
    await expect(decentraCloud.getFile(0)).to.be.revertedWith(
      "File was deleted"
    );
  });
});

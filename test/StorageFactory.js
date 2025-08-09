const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StorageFactory", function () {
  let factory;

  beforeEach(async function () {
    const StorageFactory = await ethers.getContractFactory("StorageFactory");
    factory = await StorageFactory.deploy();
    await factory.waitForDeployment();
  });

  it("creates SimpleStorage contracts and stores/reads values", async function () {
    // Create two SimpleStorage instances
    await (await factory.createSimpleStorageContract()).wait();
    await (await factory.createSimpleStorageContract()).wait();

    // Store values in each
    await (await factory.sfStore(0, 11)).wait();
    await (await factory.sfStore(1, 22)).wait();

    // Verify reads
    const v0 = await factory.sfGet(0);
    const v1 = await factory.sfGet(1);
    expect(v0).to.equal(11);
    expect(v1).to.equal(22);
  });
});



const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AddFiveStorage", function () {
  let addFive;

  beforeEach(async function () {
    const AddFiveStorage = await ethers.getContractFactory("AddFiveStorage");
    addFive = await AddFiveStorage.deploy();
    await addFive.waitForDeployment();
  });

  it("adds five on store", async function () {
    await (await addFive.store(10)).wait();
    const value = await addFive.retrieve();
    expect(value).to.equal(15);
  });
});



const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FundMe", function () {
    let fundMe;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        const FundMe = await ethers.getContractFactory("FundMe");
        fundMe = await FundMe.deploy();
    });

    it("Should revert when sending less than 1 ETH", async function () {
        await expect(
            fundMe.fund({ value: ethers.parseEther("0.01") })
        ).to.be.revertedWith("You need to send at least 1 ETH");
    });

    it("Should succeed when sending more than 1 ETH", async function () {
        await expect(
            fundMe.fund({ value: ethers.parseEther("1.1") })
        ).to.not.be.reverted;
    });
});
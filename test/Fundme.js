const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FundMe", function () {
    let fundMe;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        
        // Deploy FundMe (no price feed needed)
        const FundMe = await ethers.getContractFactory("FundMe");
        fundMe = await FundMe.deploy();
    });

    it("Should revert when sending less than 5 USD worth of ETH", async function () {
        // With ETH price at $2000, we need at least 0.0025 ETH to get $5 USD
        await expect(
            fundMe.fund({ value: ethers.parseEther("0.002") })
        ).to.be.revertedWith("You need to send at least 5 USD");
    });

    it("Should succeed when sending more than 5 USD worth of ETH", async function () {
        // With ETH price at $2000, 0.003 ETH = $6 USD
        await expect(
            fundMe.fund({ value: ethers.parseEther("0.003") })
        ).to.not.be.reverted;
    });

    it("Should track funders correctly", async function () {
        const fundAmount = ethers.parseEther("0.003");
        await fundMe.fund({ value: fundAmount });
        
        expect(await fundMe.getFunder(0)).to.equal(owner.address);
        expect(await fundMe.getAddressToAmountFunded(owner.address)).to.equal(fundAmount);
    });

    it("Should get ETH price correctly", async function () {
        const price = await fundMe.getPrice();
        expect(price).to.equal(ethers.parseEther("2000")); // $2000 USD
    });

    it("Should calculate conversion rate correctly", async function () {
        const ethAmount = ethers.parseEther("1");
        const conversionRate = await fundMe.getConversionRate(ethAmount);
        expect(conversionRate).to.equal(ethers.parseEther("2000")); // 1 ETH = $2000 USD
    });

    it("Should allow multiple funders", async function () {
        const [owner, funder1, funder2] = await ethers.getSigners();
        
        await fundMe.connect(funder1).fund({ value: ethers.parseEther("0.003") });
        await fundMe.connect(funder2).fund({ value: ethers.parseEther("0.004") });
        
        expect(await fundMe.getFunder(0)).to.equal(funder1.address);
        expect(await fundMe.getFunder(1)).to.equal(funder2.address);
        expect(await fundMe.getAddressToAmountFunded(funder1.address)).to.equal(ethers.parseEther("0.003"));
        expect(await fundMe.getAddressToAmountFunded(funder2.address)).to.equal(ethers.parseEther("0.004"));
    });
});
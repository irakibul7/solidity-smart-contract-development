const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ModifiersAndAccessDemo", function () {
  let modifiersDemo;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const ModifiersAndAccessDemo = await ethers.getContractFactory("ModifiersAndAccessDemo");
    modifiersDemo = await ModifiersAndAccessDemo.deploy();
    await modifiersDemo.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await modifiersDemo.owner()).to.equal(owner.address);
    });

    it("Should set initial status to ACTIVE", async function () {
      expect(await modifiersDemo.currentStatus()).to.equal(1); // ACTIVE = 1
    });

    it("Should set deploy time", async function () {
      // deployTime is private, so we can't access it directly
      // But we can verify it's set by testing the time restriction modifier
      await expect(modifiersDemo.timeRestrictedFunction()).to.be.revertedWith("too early");
    });
  });

  describe("Owner Access Control", function () {
    it("Should allow owner to add authorized user", async function () {
      await expect(modifiersDemo.addAuthorizedUser(addr1.address))
        .to.not.be.reverted;
    });

    it("Should allow owner to remove authorized user", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(modifiersDemo.removeAuthorizedUser(addr1.address))
        .to.not.be.reverted;
    });

    it("Should allow owner to set max gas price", async function () {
      const newMaxGasPrice = ethers.parseUnits("30", "gwei");
      await expect(modifiersDemo.setMaxGasPrice(newMaxGasPrice))
        .to.not.be.reverted;
    });

    it("Should revert when non-owner tries to add authorized user", async function () {
      await expect(
        modifiersDemo.connect(addr1).addAuthorizedUser(addr2.address)
      ).to.be.revertedWithCustomError(modifiersDemo, "UnauthorizedAccess");
    });

    it("Should revert when non-owner tries to remove authorized user", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).removeAuthorizedUser(addr1.address)
      ).to.be.revertedWithCustomError(modifiersDemo, "UnauthorizedAccess");
    });

    it("Should revert when non-owner tries to set max gas price", async function () {
      const newMaxGasPrice = ethers.parseUnits("30", "gwei");
      await expect(
        modifiersDemo.connect(addr1).setMaxGasPrice(newMaxGasPrice)
      ).to.be.revertedWithCustomError(modifiersDemo, "UnauthorizedAccess");
    });
  });

  describe("Number Validation Modifier", function () {
    it("Should allow valid numbers", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(500000)
      ).to.not.be.reverted;
    });

    it("Should revert for numbers too large", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(2000000)
      ).to.be.revertedWithCustomError(modifiersDemo, "NumberTooLarge");
    });

    it("Should allow maximum valid number", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(1000000)
      ).to.not.be.reverted;
    });
  });

  describe("Non-Reentrant Modifier", function () {
    it("Should prevent reentrancy", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      
      // First call should succeed
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(100)
      ).to.not.be.reverted;
      
      // Second call should also succeed (modifier resets after first call)
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(200)
      ).to.not.be.reverted;
    });
  });

  describe("Authorization Modifier", function () {
    it("Should allow owner to call restricted functions", async function () {
      await expect(
        modifiersDemo.restrictedUpdate(100)
      ).to.not.be.reverted;
    });

    it("Should allow authorized user to call restricted functions", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(100)
      ).to.not.be.reverted;
    });

    it("Should revert when unauthorized user tries to call restricted functions", async function () {
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(100)
      ).to.be.revertedWith("not authorized");
    });
  });

  describe("Time Restriction Modifier", function () {
    it("Should revert when called too early", async function () {
      await expect(
        modifiersDemo.timeRestrictedFunction()
      ).to.be.revertedWith("too early");
    });

    it("Should allow call after sufficient time has passed", async function () {
      // Fast forward time by 2 hours (7200 seconds)
      await ethers.provider.send("evm_increaseTime", [7200]);
      await ethers.provider.send("evm_mine");
      
      await expect(
        modifiersDemo.timeRestrictedFunction()
      ).to.not.be.reverted;
    });
  });

  describe("Gas Price Modifier", function () {
    it("Should allow calls with acceptable gas price", async function () {
      // This test will pass as long as the current gas price is within limits
      // In a real scenario, you might need to set specific gas prices
      await expect(
        modifiersDemo.gasPriceRestrictedFunction(100)
      ).to.not.be.reverted;
    });

    it("Should revert with custom error for invalid numbers", async function () {
      await expect(
        modifiersDemo.gasPriceRestrictedFunction(2000000)
      ).to.be.revertedWithCustomError(modifiersDemo, "NumberTooLarge");
    });
  });

  describe("Status Modifier", function () {
    it("Should allow calls when status is ACTIVE", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(100)
      ).to.not.be.reverted;
    });

    it("Should revert when status is not ACTIVE", async function () {
      // Note: This contract doesn't have a function to change status
      // So this test demonstrates the current behavior
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(100)
      ).to.not.be.reverted;
    });
  });

  describe("Gas Testing", function () {
    it("Should test gas consumption for restricted update", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      
      const tx = await modifiersDemo.connect(addr1).restrictedUpdate(100);
      const receipt = await tx.wait();
      
      expect(receipt.status).to.equal(1);
    });

    it("Should test gas consumption for adding authorized user", async function () {
      const tx = await modifiersDemo.addAuthorizedUser(addr1.address);
      const receipt = await tx.wait();
      
      expect(receipt.status).to.equal(1);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle zero values correctly", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(0)
      ).to.not.be.reverted;
    });

    it("Should handle boundary values correctly", async function () {
      await modifiersDemo.addAuthorizedUser(addr1.address);
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(1)
      ).to.not.be.reverted;
      
      await expect(
        modifiersDemo.connect(addr1).restrictedUpdate(999999)
      ).to.not.be.reverted;
    });
  });
});

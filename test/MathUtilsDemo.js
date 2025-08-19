const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MathUtilsDemo", function () {
  let mathUtilsDemo;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const MathUtilsDemo = await ethers.getContractFactory("MathUtilsDemo");
    mathUtilsDemo = await MathUtilsDemo.deploy();
    await mathUtilsDemo.waitForDeployment();
  });

  describe("Pure Functions", function () {
    it("Should add two numbers correctly", async function () {
      const result = await mathUtilsDemo.add(5, 3);
      expect(result).to.equal(8);
    });

    it("Should handle zero values", async function () {
      const result = await mathUtilsDemo.add(0, 0);
      expect(result).to.equal(0);
    });

    it("Should handle large numbers", async function () {
      const largeNumber = ethers.MaxUint256;
      // Adding 1 to max uint256 will overflow
      await expect(mathUtilsDemo.add(largeNumber, 1)).to.be.reverted;
    });

    it("Should handle addition with zero", async function () {
      const result1 = await mathUtilsDemo.add(100, 0);
      expect(result1).to.equal(100);
      
      const result2 = await mathUtilsDemo.add(0, 100);
      expect(result2).to.equal(100);
    });

    it("Should handle consecutive additions", async function () {
      let result = await mathUtilsDemo.add(1, 2);
      expect(result).to.equal(3);
      
      result = await mathUtilsDemo.add(result, 3);
      expect(result).to.equal(6);
      
      result = await mathUtilsDemo.add(result, 4);
      expect(result).to.equal(10);
    });
  });

  describe("Type Limits", function () {
    it("Should return correct maximum values for uint types", async function () {
      const [uint8Max, uint16Max, uint32Max, uint256Max] = await mathUtilsDemo.getTypeLimits();
      
      expect(uint8Max).to.equal(255); // 2^8 - 1
      expect(uint16Max).to.equal(65535); // 2^16 - 1
      expect(uint32Max).to.equal(4294967295); // 2^32 - 1
      expect(uint256Max).to.equal(ethers.MaxUint256); // 2^256 - 1
    });

    it("Should verify uint8 maximum value", async function () {
      const [uint8Max, , , ] = await mathUtilsDemo.getTypeLimits();
      expect(uint8Max).to.equal(255);
      
      // Verify this is indeed the maximum by checking it's one less than 2^8
      expect(uint8Max).to.equal(2 ** 8 - 1);
    });

    it("Should verify uint16 maximum value", async function () {
      const [, uint16Max, , ] = await mathUtilsDemo.getTypeLimits();
      expect(uint16Max).to.equal(65535);
      
      // Verify this is indeed the maximum by checking it's one less than 2^16
      expect(uint16Max).to.equal(2 ** 16 - 1);
    });

    it("Should verify uint32 maximum value", async function () {
      const [, , uint32Max, ] = await mathUtilsDemo.getTypeLimits();
      expect(uint32Max).to.equal(4294967295);
      
      // Verify this is indeed the maximum by checking it's one less than 2^32
      expect(uint32Max).to.equal(2 ** 32 - 1);
    });

    it("Should verify uint256 maximum value", async function () {
      const [, , , uint256Max] = await mathUtilsDemo.getTypeLimits();
      expect(uint256Max).to.equal(ethers.MaxUint256);
      
      // This is the largest possible uint256 value
      expect(uint256Max).to.be.gt(0);
    });
  });

  describe("Block Information", function () {
    it("Should return current block timestamp", async function () {
      const [timestamp, , ] = await mathUtilsDemo.getBlockInfo();
      
      // Block timestamp should be a reasonable value (not 0)
      expect(timestamp).to.be.gt(0);
      
      // Block timestamp should not be in the future (allowing for some clock skew)
      const currentTime = Math.floor(Date.now() / 1000);
      expect(timestamp).to.be.lte(currentTime + 60); // Allow 1 minute skew
    });

    it("Should return current block number", async function () {
      const [, blockNumber, ] = await mathUtilsDemo.getBlockInfo();
      
      // Block number should be a reasonable value
      expect(blockNumber).to.be.gte(0);
    });

    it("Should return current block coinbase (miner address)", async function () {
      const [, , coinbase] = await mathUtilsDemo.getBlockInfo();
      
      // Coinbase should be a valid address
      expect(coinbase).to.match(/^0x[a-fA-F0-9]{40}$/);
    });

    it("Should return consistent block information for the same block", async function () {
      const [timestamp1, blockNumber1, coinbase1] = await mathUtilsDemo.getBlockInfo();
      const [timestamp2, blockNumber2, coinbase2] = await mathUtilsDemo.getBlockInfo();
      
      // All values should be identical since we're querying the same block
      expect(timestamp1).to.equal(timestamp2);
      expect(blockNumber1).to.equal(blockNumber2);
      expect(coinbase1).to.equal(coinbase2);
    });

    it("Should demonstrate that block info changes between blocks", async function () {
      const [timestamp1, blockNumber1, ] = await mathUtilsDemo.getBlockInfo();
      
      // Mine a new block
      await ethers.provider.send("evm_mine");
      
      const [timestamp2, blockNumber2, ] = await mathUtilsDemo.getBlockInfo();
      
      // Block number should increase
      expect(blockNumber2).to.be.gt(blockNumber1);
      
      // Timestamp should be greater or equal (allowing for same second)
      expect(timestamp2).to.be.gte(timestamp1);
    });
  });

  describe("Gas Testing", function () {
    it("Should test gas consumption for add function", async function () {
      // Add function is pure, so no transaction to wait for
      const result = await mathUtilsDemo.add(100, 200);
      expect(result).to.equal(300);
    });

    it("Should test gas consumption for getTypeLimits function", async function () {
      // getTypeLimits function is pure, so no transaction to wait for
      const [uint8Max, , , ] = await mathUtilsDemo.getTypeLimits();
      expect(uint8Max).to.equal(255);
    });

    it("Should test gas consumption for getBlockInfo function", async function () {
      // getBlockInfo function is view, so no transaction to wait for
      const [timestamp, , ] = await mathUtilsDemo.getBlockInfo();
      expect(timestamp).to.be.gt(0);
    });
  });

  describe("Function Purity", function () {
    it("Should demonstrate that add function is pure (same input = same output)", async function () {
      const result1 = await mathUtilsDemo.add(5, 3);
      const result2 = await mathUtilsDemo.add(5, 3);
      const result3 = await mathUtilsDemo.add(5, 3);
      
      expect(result1).to.equal(result2);
      expect(result2).to.equal(result3);
      expect(result1).to.equal(8);
    });

    it("Should demonstrate that getTypeLimits function is pure (same output always)", async function () {
      const [uint8Max1, uint16Max1, uint32Max1, uint256Max1] = await mathUtilsDemo.getTypeLimits();
      const [uint8Max2, uint16Max2, uint32Max2, uint256Max2] = await mathUtilsDemo.getTypeLimits();
      
      expect(uint8Max1).to.equal(uint8Max2);
      expect(uint16Max1).to.equal(uint16Max2);
      expect(uint32Max1).to.equal(uint32Max2);
      expect(uint256Max1).to.equal(uint256Max2);
    });

    it("Should demonstrate that getBlockInfo function is view (output changes with state)", async function () {
      const [timestamp1, blockNumber1, ] = await mathUtilsDemo.getBlockInfo();
      
      // Mine a new block
      await ethers.provider.send("evm_mine");
      
      const [timestamp2, blockNumber2, ] = await mathUtilsDemo.getBlockInfo();
      
      // Block info should change
      expect(blockNumber2).to.be.gt(blockNumber1);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle maximum uint256 values in addition", async function () {
      const maxUint256 = ethers.MaxUint256;
      
      // Adding 1 to max uint256 should overflow and revert
      await expect(mathUtilsDemo.add(maxUint256, 1)).to.be.reverted;
      
      // Adding 0 to max uint256 should remain max uint256
      const result2 = await mathUtilsDemo.add(maxUint256, 0);
      expect(result2).to.equal(maxUint256);
    });

    it("Should handle very small numbers", async function () {
      const result = await mathUtilsDemo.add(1, 1);
      expect(result).to.equal(2);
      
      const result2 = await mathUtilsDemo.add(0, 1);
      expect(result2).to.equal(1);
    });

    it("Should handle consecutive operations correctly", async function () {
      // Test multiple operations in sequence
      let result = await mathUtilsDemo.add(1, 1);
      expect(result).to.equal(2);
      
      const [uint8Max, , , ] = await mathUtilsDemo.getTypeLimits();
      expect(uint8Max).to.equal(255);
      
      const [timestamp, blockNumber, coinbase] = await mathUtilsDemo.getBlockInfo();
      expect(timestamp).to.be.gt(0);
      expect(blockNumber).to.be.gte(0);
      expect(coinbase).to.match(/^0x[a-fA-F0-9]{40}$/);
    });
  });

  describe("Cross-Function Testing", function () {
    it("Should work correctly with other functions", async function () {
      // Test add function
      const sum = await mathUtilsDemo.add(10, 20);
      expect(sum).to.equal(30);
      
      // Test type limits
      const [uint8Max, , , ] = await mathUtilsDemo.getTypeLimits();
      expect(uint8Max).to.equal(255);
      
      // Test block info
      const [timestamp, , ] = await mathUtilsDemo.getBlockInfo();
      expect(timestamp).to.be.gt(0);
    });

    it("Should maintain consistency across multiple calls", async function () {
      // Call all functions multiple times
      for (let i = 0; i < 3; i++) {
        const sum = await mathUtilsDemo.add(i, i + 1);
        expect(sum).to.equal(i + i + 1);
        
        const [uint8Max, , , ] = await mathUtilsDemo.getTypeLimits();
        expect(uint8Max).to.equal(255);
        
        const [timestamp, blockNumber, ] = await mathUtilsDemo.getBlockInfo();
        expect(timestamp).to.be.gt(0);
        expect(blockNumber).to.be.gte(0);
      }
    });
  });
});

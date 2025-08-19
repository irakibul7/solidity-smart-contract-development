const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DataTypesDemo", function () {
  let dataTypesDemo;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    
    const DataTypesDemo = await ethers.getContractFactory("DataTypesDemo");
    dataTypesDemo = await DataTypesDemo.deploy();
    await dataTypesDemo.waitForDeployment();
  });

  describe("Default Values", function () {
    it("Should have correct default boolean values", async function () {
      expect(await dataTypesDemo.myBool()).to.equal(false);
      expect(await dataTypesDemo.isActive()).to.equal(true);
    });

    it("Should have correct default uint values", async function () {
      expect(await dataTypesDemo.myUint8()).to.equal(0);
      expect(await dataTypesDemo.myUint16()).to.equal(0);
      expect(await dataTypesDemo.myUint32()).to.equal(0);
      expect(await dataTypesDemo.myUint64()).to.equal(0);
      expect(await dataTypesDemo.myUint128()).to.equal(0);
      expect(await dataTypesDemo.myUint256()).to.equal(0);
      expect(await dataTypesDemo.myUint()).to.equal(0);
    });

    it("Should have correct default int values", async function () {
      expect(await dataTypesDemo.myInt8()).to.equal(0);
      expect(await dataTypesDemo.myInt16()).to.equal(0);
      expect(await dataTypesDemo.myInt32()).to.equal(0);
      expect(await dataTypesDemo.myInt64()).to.equal(0);
      expect(await dataTypesDemo.myInt128()).to.equal(0);
      expect(await dataTypesDemo.myInt256()).to.equal(0);
      expect(await dataTypesDemo.myInt()).to.equal(0);
    });

    it("Should have correct default address values", async function () {
      expect(await dataTypesDemo.myAddress()).to.equal("0x0000000000000000000000000000000000000000");
      expect(await dataTypesDemo.myPayableAddress()).to.equal("0x0000000000000000000000000000000000000000");
    });

    it("Should have correct default bytes values", async function () {
      expect(await dataTypesDemo.myBytes1()).to.equal("0x00");
      expect(await dataTypesDemo.myBytes8()).to.equal("0x0000000000000000");
      expect(await dataTypesDemo.myBytes16()).to.equal("0x00000000000000000000000000000000");
      expect(await dataTypesDemo.myBytes32()).to.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    it("Should have correct default dynamic type values", async function () {
      expect(await dataTypesDemo.myString()).to.equal("");
      expect(await dataTypesDemo.myDynamicBytes()).to.equal("0x");
      // Note: myArray is not accessible as a public array, so we skip this check
    });

    it("Should have correct default fixed array values", async function () {
      const fixedArray = await dataTypesDemo.fixedArray(0);
      expect(fixedArray).to.equal(0);
    });
  });

  describe("Array Operations", function () {
    it("Should demonstrate dynamic array operations", async function () {
      await dataTypesDemo.demonstrateArrays();
      
      const arrayLength = await dataTypesDemo.myArray(0);
      expect(arrayLength).to.equal(100);
      
      const arrayLength2 = await dataTypesDemo.myArray(1);
      expect(arrayLength2).to.equal(200);
    });

    it("Should demonstrate fixed array operations", async function () {
      await dataTypesDemo.demonstrateArrays();
      
      const fixedArray0 = await dataTypesDemo.fixedArray(0);
      expect(fixedArray0).to.equal(10);
      
      const fixedArray1 = await dataTypesDemo.fixedArray(1);
      expect(fixedArray1).to.equal(20);
    });
  });

  describe("Gas Testing", function () {
    it("Should test gas consumption for array operations", async function () {
      const tx = await dataTypesDemo.demonstrateArrays();
      const receipt = await tx.wait();
      
      // This test will show gas usage in the report
      expect(receipt.status).to.equal(1);
    });
  });
});

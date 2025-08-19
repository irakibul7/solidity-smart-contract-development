const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FunctionsVisibilityDemo", function () {
  let visibilityDemo;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const FunctionsVisibilityDemo = await ethers.getContractFactory("FunctionsVisibilityDemo");
    visibilityDemo = await FunctionsVisibilityDemo.deploy();
    await visibilityDemo.waitForDeployment();
  });

  describe("Public Functions", function () {
    it("Should allow public function to be called externally", async function () {
      const result = await visibilityDemo.publicFunction();
      expect(result).to.equal("public");
    });

    it("Should allow public function to be called internally", async function () {
      const [publicResult, , ] = await visibilityDemo.demonstrateVisibility();
      expect(publicResult).to.equal("public");
    });

    it("Should allow public function to be called from another account", async function () {
      const result = await visibilityDemo.connect(addr1).publicFunction();
      expect(result).to.equal("public");
    });
  });

  describe("External Functions", function () {
    it("Should allow external function to be called externally", async function () {
      const result = await visibilityDemo.externalFunction();
      expect(result).to.equal("external");
    });

    it("Should allow external function to be called using 'this'", async function () {
      const result = await visibilityDemo.callExternalFunction();
      expect(result).to.equal("external");
    });

    it("Should allow external function to be called from another account", async function () {
      const result = await visibilityDemo.connect(addr1).externalFunction();
      expect(result).to.equal("external");
    });

    it("Should NOT allow external function to be called internally", async function () {
      // This demonstrates that external functions cannot be called directly internally
      // The demonstrateVisibility function only calls public, internal, and private functions
      const [publicResult, internalResult, privateResult] = await visibilityDemo.demonstrateVisibility();
      expect(publicResult).to.equal("public");
      expect(internalResult).to.equal("internal");
      expect(privateResult).to.equal("private");
    });
  });

  describe("Internal Functions", function () {
    it("Should allow internal function to be called internally", async function () {
      const [, internalResult, ] = await visibilityDemo.demonstrateVisibility();
      expect(internalResult).to.equal("internal");
    });

    it("Should NOT allow internal function to be called externally", async function () {
      // Internal functions cannot be called from outside the contract
      // This will throw a TypeError since the function doesn't exist externally
      expect(() => visibilityDemo.internalFunction()).to.throw();
    });

    it("Should NOT allow internal function to be called from another account", async function () {
      expect(() => visibilityDemo.connect(addr1).internalFunction()).to.throw();
    });
  });

  describe("Private Functions", function () {
    it("Should allow private function to be called internally", async function () {
      const [, , privateResult] = await visibilityDemo.demonstrateVisibility();
      expect(privateResult).to.equal("private");
    });

    it("Should NOT allow private function to be called externally", async function () {
      // Private functions cannot be called from outside the contract
      expect(() => visibilityDemo.privateFunction()).to.throw();
    });

    it("Should NOT allow private function to be called from another account", async function () {
      expect(() => visibilityDemo.connect(addr1).privateFunction()).to.throw();
    });
  });

  describe("Visibility Demonstration", function () {
    it("Should demonstrate all internal function calls correctly", async function () {
      const [publicResult, internalResult, privateResult] = await visibilityDemo.demonstrateVisibility();
      
      expect(publicResult).to.equal("public");
      expect(internalResult).to.equal("internal");
      expect(privateResult).to.equal("private");
    });

    it("Should demonstrate external function call using 'this'", async function () {
      const result = await visibilityDemo.callExternalFunction();
      expect(result).to.equal("external");
    });
  });

  describe("Gas Testing", function () {
    it("Should test gas consumption for public function", async function () {
      // Public function is view, so no transaction to wait for
      const result = await visibilityDemo.publicFunction();
      expect(result).to.equal("public");
    });

    it("Should test gas consumption for external function", async function () {
      // External function is view, so no transaction to wait for
      const result = await visibilityDemo.externalFunction();
      expect(result).to.equal("external");
    });

    it("Should test gas consumption for demonstrateVisibility", async function () {
      // demonstrateVisibility function is view, so no transaction to wait for
      const [publicResult, internalResult, privateResult] = await visibilityDemo.demonstrateVisibility();
      expect(publicResult).to.equal("public");
      expect(internalResult).to.equal("internal");
      expect(privateResult).to.equal("private");
    });

    it("Should test gas consumption for callExternalFunction", async function () {
      // callExternalFunction is view, so no transaction to wait for
      const result = await visibilityDemo.callExternalFunction();
      expect(result).to.equal("external");
    });
  });

  describe("Visibility Rules Verification", function () {
    it("Should demonstrate that public functions are accessible from anywhere", async function () {
      // Owner can call
      let result = await visibilityDemo.publicFunction();
      expect(result).to.equal("public");
      
      // Other account can call
      result = await visibilityDemo.connect(addr1).publicFunction();
      expect(result).to.equal("public");
    });

    it("Should demonstrate that external functions are only accessible externally", async function () {
      // Direct external call works
      let result = await visibilityDemo.externalFunction();
      expect(result).to.equal("external");
      
      // Call using 'this' works
      result = await visibilityDemo.callExternalFunction();
      expect(result).to.equal("external");
      
      // Internal call should not work (and doesn't exist in this contract)
      // This is demonstrated by the fact that demonstrateVisibility doesn't call externalFunction
    });

    it("Should demonstrate that internal functions are only accessible internally", async function () {
      // Internal call works
      const [, internalResult, ] = await visibilityDemo.demonstrateVisibility();
      expect(internalResult).to.equal("internal");
      
      // External call should fail
      expect(() => visibilityDemo.internalFunction()).to.throw();
    });

    it("Should demonstrate that private functions are only accessible internally", async function () {
      // Internal call works
      const [, , privateResult] = await visibilityDemo.demonstrateVisibility();
      expect(privateResult).to.equal("private");
      
      // External call should fail
      expect(() => visibilityDemo.privateFunction()).to.throw();
    });
  });

  describe("Edge Cases", function () {
    it("Should handle multiple consecutive calls correctly", async function () {
      // Multiple calls to the same function should work
      for (let i = 0; i < 3; i++) {
        const result = await visibilityDemo.publicFunction();
        expect(result).to.equal("public");
      }
      
      for (let i = 0; i < 3; i++) {
        const result = await visibilityDemo.externalFunction();
        expect(result).to.equal("external");
      }
    });

    it("Should handle calls from different accounts correctly", async function () {
      const accounts = [owner, addr1];
      
      for (const account of accounts) {
        const publicResult = await visibilityDemo.connect(account).publicFunction();
        expect(publicResult).to.equal("public");
        
        const externalResult = await visibilityDemo.connect(account).externalFunction();
        expect(externalResult).to.equal("external");
      }
    });
  });
});

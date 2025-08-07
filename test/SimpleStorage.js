const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Get signers
    [owner, addr1] = await ethers.getSigners();
    
    // Deploy the contract
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the initial favorite number to 0", async function () {
      expect(await simpleStorage.retrieve()).to.equal(0);
    });

    it("Should have no people initially", async function () {
      expect(await simpleStorage.getPeopleCount()).to.equal(0);
    });
  });

  describe("Store and Retrieve", function () {
    it("Should store and retrieve a favorite number", async function () {
      const favoriteNumber = 42;
      
      await simpleStorage.store(favoriteNumber);
      expect(await simpleStorage.retrieve()).to.equal(favoriteNumber);
    });

    it("Should update the favorite number", async function () {
      await simpleStorage.store(42);
      expect(await simpleStorage.retrieve()).to.equal(42);
      
      await simpleStorage.store(100);
      expect(await simpleStorage.retrieve()).to.equal(100);
    });
  });

  describe("People Management", function () {
    it("Should add a person and retrieve their information", async function () {
      const name = "Alice";
      const favoriteNumber = 25;
      
      await simpleStorage.addPerson(name, favoriteNumber);
      
      expect(await simpleStorage.getPeopleCount()).to.equal(1);
      expect(await simpleStorage.nameToFavoriteNumber(name)).to.equal(favoriteNumber);
      
      const [retrievedNumber, retrievedName] = await simpleStorage.getPerson(0);
      expect(retrievedNumber).to.equal(favoriteNumber);
      expect(retrievedName).to.equal(name);
    });

    it("Should add multiple people", async function () {
      await simpleStorage.addPerson("Alice", 25);
      await simpleStorage.addPerson("Bob", 30);
      await simpleStorage.addPerson("Charlie", 35);
      
      expect(await simpleStorage.getPeopleCount()).to.equal(3);
      
      // Check first person
      const [number1, name1] = await simpleStorage.getPerson(0);
      expect(number1).to.equal(25);
      expect(name1).to.equal("Alice");
      
      // Check last person
      const [number3, name3] = await simpleStorage.getPerson(2);
      expect(number3).to.equal(35);
      expect(name3).to.equal("Charlie");
    });

    it("Should handle mapping correctly", async function () {
      await simpleStorage.addPerson("Alice", 25);
      await simpleStorage.addPerson("Bob", 30);
      
      expect(await simpleStorage.nameToFavoriteNumber("Alice")).to.equal(25);
      expect(await simpleStorage.nameToFavoriteNumber("Bob")).to.equal(30);
      expect(await simpleStorage.nameToFavoriteNumber("NonExistent")).to.equal(0);
    });

    it("Should revert when accessing person with invalid index", async function () {
      await expect(simpleStorage.getPerson(0)).to.be.revertedWith("Index out of bounds");
      
      await simpleStorage.addPerson("Alice", 25);
      await expect(simpleStorage.getPerson(1)).to.be.revertedWith("Index out of bounds");
    });
  });

  describe("Gas Testing", function () {
    it("Should test gas consumption for storing numbers", async function () {
      const tx = await simpleStorage.store(42);
      const receipt = await tx.wait();
      
      console.log(`      Gas used for storing: ${receipt.gasUsed.toString()}`);
      expect(receipt.gasUsed).to.be.greaterThan(0);
    });

    it("Should test gas consumption for adding people", async function () {
      const tx = await simpleStorage.addPerson("Alice", 25);
      const receipt = await tx.wait();
      
      console.log(`      Gas used for adding person: ${receipt.gasUsed.toString()}`);
      expect(receipt.gasUsed).to.be.greaterThan(0);
    });
  });
});
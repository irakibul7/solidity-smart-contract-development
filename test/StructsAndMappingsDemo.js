const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StructsAndMappingsDemo", function () {
  let structsDemo;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const StructsAndMappingsDemo = await ethers.getContractFactory("StructsAndMappingsDemo");
    structsDemo = await StructsAndMappingsDemo.deploy();
    await structsDemo.waitForDeployment();
  });

  describe("Person Management", function () {
    it("Should add a person successfully", async function () {
      const name = "Alice";
      const favoriteNumber = 25;
      
      await expect(structsDemo.connect(addr1).addPerson(name, favoriteNumber))
        .to.emit(structsDemo, "PersonAdded")
        .withArgs(name, favoriteNumber, addr1.address);
      
      expect(await structsDemo.getPeopleCount()).to.equal(1);
      expect(await structsDemo.nameToFavoriteNumber(name)).to.equal(favoriteNumber);
      expect(await structsDemo.numberExists(favoriteNumber)).to.equal(true);
    });

    it("Should revert when adding person with empty name", async function () {
      await expect(
        structsDemo.connect(addr1).addPerson("", 25)
      ).to.be.revertedWithCustomError(structsDemo, "InvalidPersonData");
    });

    it("Should add multiple people", async function () {
      await structsDemo.connect(addr1).addPerson("Alice", 25);
      await structsDemo.connect(addr2).addPerson("Bob", 30);
      
      expect(await structsDemo.getPeopleCount()).to.equal(2);
      expect(await structsDemo.nameToFavoriteNumber("Alice")).to.equal(25);
      expect(await structsDemo.nameToFavoriteNumber("Bob")).to.equal(30);
    });

    it("Should update person age correctly", async function () {
      await structsDemo.connect(addr1).addPerson("Alice", 25);
      
      const newAge = 26;
      await structsDemo.connect(addr1).updateAge(newAge);
      
      // Check if age was updated in the address mapping
      const person = await structsDemo.addressToPerson(addr1.address);
      expect(person.age).to.equal(newAge);
    });

    it("Should handle mapping lookups correctly", async function () {
      await structsDemo.connect(addr1).addPerson("Alice", 25);
      
      // Check name to number mapping
      expect(await structsDemo.nameToFavoriteNumber("Alice")).to.equal(25);
      expect(await structsDemo.nameToFavoriteNumber("NonExistent")).to.equal(0);
      
      // Check address to person mapping
      const person = await structsDemo.addressToPerson(addr1.address);
      expect(person.name).to.equal("Alice");
      expect(person.age).to.equal(0); // Initially 0
      expect(person.isActive).to.equal(true);
      expect(person.wallet).to.equal(addr1.address);
      
      // Check number exists mapping
      expect(await structsDemo.numberExists(25)).to.equal(true);
      expect(await structsDemo.numberExists(999)).to.equal(false);
    });
  });

  describe("Data Integrity", function () {
    it("Should maintain data consistency across mappings", async function () {
      const name = "Charlie";
      const favoriteNumber = 42;
      
      await structsDemo.connect(addr1).addPerson(name, favoriteNumber);
      
      // Verify all mappings are consistent
      expect(await structsDemo.nameToFavoriteNumber(name)).to.equal(favoriteNumber);
      expect(await structsDemo.numberExists(favoriteNumber)).to.equal(true);
      
      const person = await structsDemo.addressToPerson(addr1.address);
      expect(person.name).to.equal(name);
      // favoriteNumber is stored in a separate mapping, not in the Person struct
      expect(await structsDemo.nameToFavoriteNumber(name)).to.equal(favoriteNumber);
    });

    it("Should handle multiple people with same favorite number", async function () {
      await structsDemo.connect(addr1).addPerson("Alice", 25);
      await structsDemo.connect(addr2).addPerson("Bob", 25);
      
      expect(await structsDemo.numberExists(25)).to.equal(true);
      expect(await structsDemo.nameToFavoriteNumber("Alice")).to.equal(25);
      expect(await structsDemo.nameToFavoriteNumber("Bob")).to.equal(25);
    });
  });

  describe("Gas Testing", function () {
    it("Should test gas consumption for adding people", async function () {
      const tx = await structsDemo.connect(addr1).addPerson("Alice", 25);
      const receipt = await tx.wait();
      
      expect(receipt.status).to.equal(1);
    });

    it("Should test gas consumption for updating age", async function () {
      await structsDemo.connect(addr1).addPerson("Alice", 25);
      
      const tx = await structsDemo.connect(addr1).updateAge(26);
      const receipt = await tx.wait();
      
      expect(receipt.status).to.equal(1);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle very long names", async function () {
      const longName = "A".repeat(100); // Very long name
      const favoriteNumber = 999;
      
      await expect(structsDemo.connect(addr1).addPerson(longName, favoriteNumber))
        .to.emit(structsDemo, "PersonAdded")
        .withArgs(longName, favoriteNumber, addr1.address);
      
      expect(await structsDemo.nameToFavoriteNumber(longName)).to.equal(favoriteNumber);
    });

    it("Should handle large favorite numbers", async function () {
      const largeNumber = ethers.MaxUint256;
      const name = "LargeNumber";
      
      await expect(structsDemo.connect(addr1).addPerson(name, largeNumber))
        .to.emit(structsDemo, "PersonAdded")
        .withArgs(name, largeNumber, addr1.address);
      
      expect(await structsDemo.nameToFavoriteNumber(name)).to.equal(largeNumber);
    });
  });
});

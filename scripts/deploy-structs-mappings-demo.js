const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying StructsAndMappingsDemo contract...");
  
  // Get the contract factory
  const StructsAndMappingsDemo = await ethers.getContractFactory("StructsAndMappingsDemo");
  
  // Deploy the contract
  console.log("Starting deployment...");
  const structsDemo = await StructsAndMappingsDemo.deploy();
  
  // Wait for deployment to complete
  await structsDemo.waitForDeployment();
  
  const deployedAddress = await structsDemo.getAddress();
  console.log(`StructsAndMappingsDemo deployed to: ${deployedAddress}`);
  
  // Get the deployer's address
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);
  
  // Demonstrate struct and mapping operations
  console.log("\n--- Structs and Mappings Demonstration ---");
  
  // Add first person
  console.log("Adding first person (Alice)...");
  const addPerson1Tx = await structsDemo.addPerson("Alice", 25);
  await addPerson1Tx.wait();
  console.log("Alice added successfully!");
  
  // Check the results
  const peopleCount1 = await structsDemo.getPeopleCount();
  const aliceFavoriteNumber = await structsDemo.nameToFavoriteNumber("Alice");
  const alicePerson = await structsDemo.addressToPerson(deployer.address);
  const number25Exists = await structsDemo.numberExists(25);
  
  console.log(`Total people: ${peopleCount1}`);
  console.log(`Alice's favorite number: ${aliceFavoriteNumber}`);
  console.log(`Alice's person data: ${alicePerson.name}, Age: ${alicePerson.age}, Active: ${alicePerson.isActive}, Wallet: ${alicePerson.wallet}`);
  console.log(`Number 25 exists: ${number25Exists}`);
  
  // Add second person
  console.log("\nAdding second person (Bob)...");
  const addPerson2Tx = await structsDemo.addPerson("Bob", 30);
  await addPerson2Tx.wait();
  console.log("Bob added successfully!");
  
  // Check updated results
  const peopleCount2 = await structsDemo.getPeopleCount();
  const bobFavoriteNumber = await structsDemo.nameToFavoriteNumber("Bob");
  const bobPerson = await structsDemo.addressToPerson(deployer.address);
  const number30Exists = await structsDemo.numberExists(30);
  
  console.log(`Total people: ${peopleCount2}`);
  console.log(`Bob's favorite number: ${bobFavoriteNumber}`);
  console.log(`Bob's person data: ${bobPerson.name}, Age: ${bobPerson.age}, Active: ${bobPerson.isActive}, Wallet: ${bobPerson.wallet}`);
  console.log(`Number 30 exists: ${number30Exists}`);
  
  // Update age
  console.log("\nUpdating age to 26...");
  const updateAgeTx = await structsDemo.updateAge(26);
  await updateAgeTx.wait();
  console.log("Age updated successfully!");
  
  // Check updated age
  const updatedPerson = await structsDemo.addressToPerson(deployer.address);
  console.log(`Updated person data: ${updatedPerson.name}, Age: ${updatedPerson.age}, Active: ${updatedPerson.isActive}, Wallet: ${updatedPerson.wallet}`);
  
  // Demonstrate mapping lookups
  console.log("\n--- Mapping Lookup Demonstration ---");
  
  // Check non-existent person
  const nonExistentNumber = await structsDemo.nameToFavoriteNumber("NonExistent");
  const nonExistentNumberExists = await structsDemo.numberExists(999);
  console.log(`Non-existent person's favorite number: ${nonExistentNumber}`);
  console.log(`Number 999 exists: ${nonExistentNumberExists}`);
  
  // Demonstrate event emission (check if events were emitted)
  console.log("\n--- Event Demonstration ---");
  console.log("Events were emitted during person additions. Check the transaction logs for details.");
  
  // Demonstrate error handling
  console.log("\n--- Error Handling Demonstration ---");
  try {
    console.log("Attempting to add person with empty name...");
    const invalidTx = await structsDemo.addPerson("", 50);
    await invalidTx.wait();
    console.log("This should not have succeeded!");
  } catch (error) {
    console.log("Successfully caught error for empty name:", error.message);
  }
  
  console.log("\nDeployment and demonstration completed successfully!");
  
  return {
    contract: structsDemo,
    address: deployedAddress
  };
}

// Execute the deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Deployment failed:");
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;

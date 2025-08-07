const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SimpleStorage contract...");
  
  // Get the contract factory
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  
  // Deploy the contract
  console.log("Starting deployment...");
  const simpleStorage = await SimpleStorage.deploy();
  
  // Wait for deployment to complete
  await simpleStorage.waitForDeployment();
  
  const deployedAddress = await simpleStorage.getAddress();
  console.log(`SimpleStorage deployed to: ${deployedAddress}`);
  
  // Verify deployment by calling a view function
  const initialValue = await simpleStorage.retrieve();
  console.log(`Initial favorite number: ${initialValue}`);
  
  // Example interactions
  console.log("\n--- Example interactions ---");
  
  // Store a favorite number
  console.log("Storing favorite number 42...");
  const storeTx = await simpleStorage.store(42);
  await storeTx.wait();
  
  const storedValue = await simpleStorage.retrieve();
  console.log(`Stored favorite number: ${storedValue}`);
  
  // Add a person
  console.log("Adding a person...");
  const addPersonTx = await simpleStorage.addPerson("Alice", 25);
  await addPersonTx.wait();
  
  const peopleCount = await simpleStorage.getPeopleCount();
  console.log(`Total people: ${peopleCount}`);
  
  const [personNumber, personName] = await simpleStorage.getPerson(0);
  console.log(`First person: ${personName} with favorite number ${personNumber}`);
  
  const aliceFavoriteNumber = await simpleStorage.nameToFavoriteNumber("Alice");
  console.log(`Alice's favorite number from mapping: ${aliceFavoriteNumber}`);
  
  console.log("\nDeployment and testing completed successfully!");
  
  return {
    contract: simpleStorage,
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
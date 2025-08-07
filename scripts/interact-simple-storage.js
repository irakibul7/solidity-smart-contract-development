const { ethers } = require("hardhat");

async function main() {
  // This script assumes the contract is already deployed
  // Replace this address with your deployed contract address
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  
  if (contractAddress === "YOUR_CONTRACT_ADDRESS_HERE") {
    console.log("Please update the contractAddress variable with your deployed contract address");
    console.log("You can get this from the deploy script output");
    return;
  }
  
  console.log(`Interacting with SimpleStorage at: ${contractAddress}`);
  
  // Get the contract factory and attach to the deployed contract
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = SimpleStorage.attach(contractAddress);
  
  // Get current favorite number
  let currentFavorite = await simpleStorage.retrieve();
  console.log(`Current favorite number: ${currentFavorite}`);
  
  // Store a new favorite number
  console.log("Storing new favorite number: 777");
  const storeTx = await simpleStorage.store(777);
  await storeTx.wait();
  console.log("Transaction completed!");
  
  // Retrieve the updated value
  currentFavorite = await simpleStorage.retrieve();
  console.log(`Updated favorite number: ${currentFavorite}`);
  
  // Add some people
  console.log("\nAdding people...");
  
  const people = [
    { name: "Alice", number: 10 },
    { name: "Bob", number: 20 },
    { name: "Charlie", number: 30 }
  ];
  
  for (const person of people) {
    console.log(`Adding ${person.name} with favorite number ${person.number}`);
    const addTx = await simpleStorage.addPerson(person.name, person.number);
    await addTx.wait();
  }
  
  // Display all people
  const totalPeople = await simpleStorage.getPeopleCount();
  console.log(`\nTotal people stored: ${totalPeople}`);
  
  for (let i = 0; i < totalPeople; i++) {
    const [number, name] = await simpleStorage.getPerson(i);
    console.log(`Person ${i}: ${name} - ${number}`);
  }
  
  // Test the mapping
  console.log("\nTesting name-to-number mapping:");
  for (const person of people) {
    const mappedNumber = await simpleStorage.nameToFavoriteNumber(person.name);
    console.log(`${person.name}: ${mappedNumber}`);
  }
  
  console.log("\nInteraction completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Interaction failed:");
    console.error(error);
    process.exit(1);
  });
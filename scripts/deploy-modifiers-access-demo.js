const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying ModifiersAndAccessDemo contract...");
  
  // Get the contract factory
  const ModifiersAndAccessDemo = await ethers.getContractFactory("ModifiersAndAccessDemo");
  
  // Deploy the contract
  console.log("Starting deployment...");
  const modifiersDemo = await ModifiersAndAccessDemo.deploy();
  
  // Wait for deployment to complete
  await modifiersDemo.waitForDeployment();
  
  const deployedAddress = await modifiersDemo.getAddress();
  console.log(`ModifiersAndAccessDemo deployed to: ${deployedAddress}`);
  
  // Get the deployer's address
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);
  
  // Demonstrate deployment state
  console.log("\n--- Deployment State ---");
  const owner = await modifiersDemo.owner();
  const currentStatus = await modifiersDemo.currentStatus();
  console.log(`Owner: ${owner}`);
  console.log(`Current Status: ${currentStatus} (1 = ACTIVE)`);
  
  // Demonstrate owner access control
  console.log("\n--- Owner Access Control Demonstration ---");
  
  // Add authorized user
  console.log("Adding authorized user...");
  const addUserTx = await modifiersDemo.addAuthorizedUser(deployer.address);
  await addUserTx.wait();
  console.log("User authorized successfully!");
  
  // Set max gas price
  console.log("Setting max gas price to 30 gwei...");
  const newMaxGasPrice = ethers.parseUnits("30", "gwei");
  const setGasPriceTx = await modifiersDemo.setMaxGasPrice(newMaxGasPrice);
  await setGasPriceTx.wait();
  console.log("Max gas price updated successfully!");
  
  // Demonstrate modifiers
  console.log("\n--- Modifiers Demonstration ---");
  
  // Test validNumber modifier
  console.log("Testing validNumber modifier with valid number (500000)...");
  const validUpdateTx = await modifiersDemo.restrictedUpdate(500000);
  await validUpdateTx.wait();
  console.log("Valid number update successful!");
  
  // Test number validation error
  console.log("\nTesting validNumber modifier with invalid number (2000000)...");
  try {
    const invalidUpdateTx = await modifiersDemo.restrictedUpdate(2000000);
    await invalidUpdateTx.wait();
    console.log("This should not have succeeded!");
  } catch (error) {
    console.log("Successfully caught error for number too large:", error.message);
  }
  
  // Test authorization modifier
  console.log("\n--- Authorization Modifier Test ---");
  console.log("Testing restricted update as authorized user...");
  const authorizedUpdateTx = await modifiersDemo.restrictedUpdate(300000);
  await authorizedUpdateTx.wait();
  console.log("Authorized update successful!");
  
  // Test non-reentrant modifier
  console.log("\n--- Non-Reentrant Modifier Test ---");
  console.log("Testing non-reentrant functionality...");
  const nonReentrantTx = await modifiersDemo.restrictedUpdate(400000);
  await nonReentrantTx.wait();
  console.log("Non-reentrant update successful!");
  
  // Test time restriction modifier
  console.log("\n--- Time Restriction Modifier Test ---");
  console.log("Testing time restriction (should fail initially)...");
  try {
    const timeRestrictedTx = await modifiersDemo.timeRestrictedFunction();
    await timeRestrictedTx.wait();
    console.log("This should not have succeeded!");
  } catch (error) {
    console.log("Successfully caught time restriction error:", error.message);
  }
  
  // Fast forward time and test again
  console.log("\nFast forwarding time by 2 hours...");
  await ethers.provider.send("evm_increaseTime", [7200]); // 2 hours
  await ethers.provider.send("evm_mine");
  
  console.log("Testing time restriction after time has passed...");
  const timeRestrictedTx2 = await modifiersDemo.timeRestrictedFunction();
  await timeRestrictedTx2.wait();
  console.log("Time restricted function successful after waiting!");
  
  // Test gas price modifier
  console.log("\n--- Gas Price Modifier Test ---");
  console.log("Testing gas price restriction...");
  const gasPriceTx = await modifiersDemo.gasPriceRestrictedFunction(600000);
  await gasPriceTx.wait();
  console.log("Gas price restricted function successful!");
  
  // Demonstrate error handling
  console.log("\n--- Error Handling Demonstration ---");
  
  // Test unauthorized access
  console.log("Testing unauthorized access (should fail)...");
  try {
    const unauthorizedTx = await modifiersDemo.connect(ethers.provider.getSigner(1)).addAuthorizedUser(deployer.address);
    await unauthorizedTx.wait();
    console.log("This should not have succeeded!");
  } catch (error) {
    console.log("Successfully caught unauthorized access error:", error.message);
  }
  
  // Test invalid number with gas price function
  console.log("\nTesting invalid number with gas price function...");
  try {
    const invalidGasPriceTx = await modifiersDemo.gasPriceRestrictedFunction(2000000);
    await invalidGasPriceTx.wait();
    console.log("This should not have succeeded!");
  } catch (error) {
    console.log("Successfully caught error for number too large:", error.message);
  }
  
  console.log("\nDeployment and demonstration completed successfully!");
  
  return {
    contract: modifiersDemo,
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

const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying MathUtilsDemo contract...");
  
  // Get the contract factory
  const MathUtilsDemo = await ethers.getContractFactory("MathUtilsDemo");
  
  // Deploy the contract
  console.log("Starting deployment...");
  const mathUtilsDemo = await MathUtilsDemo.deploy();
  
  // Wait for deployment to complete
  await mathUtilsDemo.waitForDeployment();
  
  const deployedAddress = await mathUtilsDemo.getAddress();
  console.log(`MathUtilsDemo deployed to: ${deployedAddress}`);
  
  // Demonstrate pure functions
  console.log("\n--- Pure Functions Demonstration ---");
  
  // Test addition function
  console.log("Testing addition function...");
  const addResult1 = await mathUtilsDemo.add(5, 3);
  console.log(`add(5, 3) = ${addResult1}`);
  
  const addResult2 = await mathUtilsDemo.add(100, 200);
  console.log(`add(100, 200) = ${addResult2}`);
  
  const addResult3 = await mathUtilsDemo.add(0, 0);
  console.log(`add(0, 0) = ${addResult3}`);
  
  // Test edge cases
  console.log("\nTesting edge cases...");
  const maxUint256 = ethers.MaxUint256;
  const overflowResult = await mathUtilsDemo.add(maxUint256, 1);
  console.log(`add(${maxUint256}, 1) = ${overflowResult} (overflow)`);
  
  const maxUint256Result = await mathUtilsDemo.add(maxUint256, 0);
  console.log(`add(${maxUint256}, 0) = ${maxUint256Result}`);
  
  // Demonstrate type limits
  console.log("\n--- Type Limits Demonstration ---");
  
  const [uint8Max, uint16Max, uint32Max, uint256Max] = await mathUtilsDemo.getTypeLimits();
  
  console.log("Maximum values for different uint types:");
  console.log(`uint8 max: ${uint8Max} (2^8 - 1 = ${2**8 - 1})`);
  console.log(`uint16 max: ${uint16Max} (2^16 - 1 = ${2**16 - 1})`);
  console.log(`uint32 max: ${uint32Max} (2^32 - 1 = ${2**32 - 1})`);
  console.log(`uint256 max: ${uint256Max}`);
  
  // Verify the values are correct
  console.log("\nVerifying type limits...");
  if (uint8Max === 255) {
    console.log("✓ uint8 maximum is correct");
  } else {
    console.log("✗ uint8 maximum is incorrect");
  }
  
  if (uint16Max === 65535) {
    console.log("✓ uint16 maximum is correct");
  } else {
    console.log("✗ uint16 maximum is incorrect");
  }
  
  if (uint32Max === 4294967295) {
    console.log("✓ uint32 maximum is correct");
  } else {
    console.log("✗ uint32 maximum is incorrect");
  }
  
  if (uint256Max === ethers.MaxUint256) {
    console.log("✓ uint256 maximum is correct");
  } else {
    console.log("✗ uint256 maximum is incorrect");
  }
  
  // Demonstrate block information
  console.log("\n--- Block Information Demonstration ---");
  
  const [timestamp1, blockNumber1, coinbase1] = await mathUtilsDemo.getBlockInfo();
  
  console.log("Current block information:");
  console.log(`Timestamp: ${timestamp1}`);
  console.log(`Block number: ${blockNumber1}`);
  console.log(`Coinbase (miner): ${coinbase1}`);
  
  // Mine a new block to show changes
  console.log("\nMining a new block...");
  await ethers.provider.send("evm_mine");
  
  const [timestamp2, blockNumber2, coinbase2] = await mathUtilsDemo.getBlockInfo();
  
  console.log("New block information:");
  console.log(`Timestamp: ${timestamp2}`);
  console.log(`Block number: ${blockNumber2}`);
  console.log(`Coinbase (miner): ${coinbase2}`);
  
  // Show the differences
  console.log("\nChanges between blocks:");
  console.log(`Timestamp change: ${timestamp2 - timestamp1} seconds`);
  console.log(`Block number change: ${blockNumber2 - blockNumber1}`);
  console.log(`Coinbase change: ${coinbase1 === coinbase2 ? "None" : "Changed"}`);
  
  // Demonstrate function purity
  console.log("\n--- Function Purity Demonstration ---");
  
  console.log("Testing pure function consistency...");
  const addResult4 = await mathUtilsDemo.add(10, 20);
  const addResult5 = await mathUtilsDemo.add(10, 20);
  const addResult6 = await mathUtilsDemo.add(10, 20);
  
  if (addResult4 === addResult5 && addResult5 === addResult6) {
    console.log("✓ Addition function is pure (same input = same output)");
  } else {
    console.log("✗ Addition function is not pure");
  }
  
  console.log("Testing type limits consistency...");
  const [uint8Max2, , , ] = await mathUtilsDemo.getTypeLimits();
  const [uint8Max3, , , ] = await mathUtilsDemo.getTypeLimits();
  
  if (uint8Max2 === uint8Max3) {
    console.log("✓ Type limits function is pure (same output always)");
  } else {
    console.log("✗ Type limits function is not pure");
  }
  
  console.log("Testing block info consistency...");
  const [timestamp3, blockNumber3, ] = await mathUtilsDemo.getBlockInfo();
  const [timestamp4, blockNumber4, ] = await mathUtilsDemo.getBlockInfo();
  
  if (timestamp3 === timestamp4 && blockNumber3 === blockNumber4) {
    console.log("✓ Block info is consistent within the same block");
  } else {
    console.log("✗ Block info is inconsistent");
  }
  
  // Test multiple operations
  console.log("\n--- Multiple Operations Test ---");
  console.log("Testing multiple operations in sequence...");
  
  let runningSum = 0;
  for (let i = 1; i <= 5; i++) {
    runningSum = await mathUtilsDemo.add(runningSum, i);
    console.log(`Running sum after adding ${i}: ${runningSum}`);
  }
  
  // Test cross-function functionality
  console.log("\n--- Cross-Function Testing ---");
  console.log("Testing that all functions work together correctly...");
  
  const finalSum = await mathUtilsDemo.add(100, 200);
  const [uint8MaxFinal, , , ] = await mathUtilsDemo.getTypeLimits();
  const [finalTimestamp, finalBlockNumber, finalCoinbase] = await mathUtilsDemo.getBlockInfo();
  
  console.log("All functions working together:");
  console.log(`  - Addition: 100 + 200 = ${finalSum}`);
  console.log(`  - Type limit: uint8 max = ${uint8MaxFinal}`);
  console.log(`  - Block info: timestamp=${finalTimestamp}, block=${finalBlockNumber}, coinbase=${finalCoinbase}`);
  
  console.log("\nDeployment and demonstration completed successfully!");
  
  return {
    contract: mathUtilsDemo,
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

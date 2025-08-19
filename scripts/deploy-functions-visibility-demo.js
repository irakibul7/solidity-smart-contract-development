const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying FunctionsVisibilityDemo contract...");
  
  // Get the contract factory
  const FunctionsVisibilityDemo = await ethers.getContractFactory("FunctionsVisibilityDemo");
  
  // Deploy the contract
  console.log("Starting deployment...");
  const visibilityDemo = await FunctionsVisibilityDemo.deploy();
  
  // Wait for deployment to complete
  await visibilityDemo.waitForDeployment();
  
  const deployedAddress = await visibilityDemo.getAddress();
  console.log(`FunctionsVisibilityDemo deployed to: ${deployedAddress}`);
  
  // Get the deployer's address
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);
  
  // Demonstrate function visibility
  console.log("\n--- Function Visibility Demonstration ---");
  
  // Test public function
  console.log("Testing public function...");
  const publicResult = await visibilityDemo.publicFunction();
  console.log(`publicFunction() result: "${publicResult}"`);
  
  // Test external function
  console.log("\nTesting external function...");
  const externalResult = await visibilityDemo.externalFunction();
  console.log(`externalFunction() result: "${externalResult}"`);
  
  // Test internal function call through demonstrateVisibility
  console.log("\nTesting internal function call...");
  const [publicResult2, internalResult, privateResult] = await visibilityDemo.demonstrateVisibility();
  console.log(`demonstrateVisibility() results:`);
  console.log(`  - public function: "${publicResult2}"`);
  console.log(`  - internal function: "${internalResult}"`);
  console.log(`  - private function: "${privateResult}"`);
  
  // Test external function call using 'this'
  console.log("\nTesting external function call using 'this'...");
  const externalCallResult = await visibilityDemo.callExternalFunction();
  console.log(`callExternalFunction() result: "${externalCallResult}"`);
  
  // Demonstrate visibility rules
  console.log("\n--- Visibility Rules Verification ---");
  
  // Verify that public functions can be called from anywhere
  console.log("Verifying public function accessibility...");
  const publicResult3 = await visibilityDemo.publicFunction();
  console.log(`Owner can call public function: "${publicResult3}"`);
  
  // Test from another account (if available)
  try {
    const otherSigner = ethers.provider.getSigner(1);
    const otherAddress = await otherSigner.getAddress();
    console.log(`Testing public function from another account: ${otherAddress}`);
    const publicResult4 = await visibilityDemo.connect(otherSigner).publicFunction();
    console.log(`Other account can call public function: "${publicResult4}"`);
  } catch (error) {
    console.log("Could not test from another account (only one signer available)");
  }
  
  // Verify that external functions can be called externally
  console.log("\nVerifying external function accessibility...");
  const externalResult2 = await visibilityDemo.externalFunction();
  console.log(`Direct external call works: "${externalResult2}"`);
  
  const externalCallResult2 = await visibilityDemo.callExternalFunction();
  console.log(`Call using 'this' works: "${externalCallResult2}"`);
  
  // Demonstrate that internal and private functions cannot be called externally
  console.log("\nVerifying internal/private function restrictions...");
  try {
    await visibilityDemo.internalFunction();
    console.log("ERROR: internalFunction() should not be callable externally!");
  } catch (error) {
    console.log("✓ internalFunction() correctly rejected external call");
  }
  
  try {
    await visibilityDemo.privateFunction();
    console.log("ERROR: privateFunction() should not be callable externally!");
  } catch (error) {
    console.log("✓ privateFunction() correctly rejected external call");
  }
  
  // Test multiple consecutive calls
  console.log("\n--- Multiple Calls Test ---");
  console.log("Testing multiple consecutive calls to the same functions...");
  
  for (let i = 0; i < 3; i++) {
    const publicResult = await visibilityDemo.publicFunction();
    const externalResult = await visibilityDemo.externalFunction();
    console.log(`Call ${i + 1}: public="${publicResult}", external="${externalResult}"`);
  }
  
  // Test cross-function functionality
  console.log("\n--- Cross-Function Testing ---");
  console.log("Testing that all functions work together correctly...");
  
  const publicResult4 = await visibilityDemo.publicFunction();
  const externalResult3 = await visibilityDemo.externalFunction();
  const [publicResult5, internalResult2, privateResult2] = await visibilityDemo.demonstrateVisibility();
  const externalCallResult3 = await visibilityDemo.callExternalFunction();
  
  console.log("All function calls successful:");
  console.log(`  - publicFunction(): "${publicResult4}"`);
  console.log(`  - externalFunction(): "${externalResult3}"`);
  console.log(`  - demonstrateVisibility(): ["${publicResult5}", "${internalResult2}", "${privateResult2}"]`);
  console.log(`  - callExternalFunction(): "${externalCallResult3}"`);
  
  // Verify consistency
  console.log("\n--- Consistency Verification ---");
  if (publicResult4 === publicResult5) {
    console.log("✓ Public function results are consistent");
  } else {
    console.log("✗ Public function results are inconsistent");
  }
  
  if (externalResult3 === externalCallResult3) {
    console.log("✓ External function results are consistent");
  } else {
    console.log("✗ External function results are inconsistent");
  }
  
  console.log("\nDeployment and demonstration completed successfully!");
  
  return {
    contract: visibilityDemo,
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

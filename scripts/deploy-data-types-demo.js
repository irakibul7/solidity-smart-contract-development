const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying DataTypesDemo contract...");
  
  // Get the contract factory
  const DataTypesDemo = await ethers.getContractFactory("DataTypesDemo");
  
  // Deploy the contract
  console.log("Starting deployment...");
  const dataTypesDemo = await DataTypesDemo.deploy();
  
  // Wait for deployment to complete
  await dataTypesDemo.waitForDeployment();
  
  const deployedAddress = await dataTypesDemo.getAddress();
  console.log(`DataTypesDemo deployed to: ${deployedAddress}`);
  
  // Demonstrate default values
  console.log("\n--- Default Values Demonstration ---");
  
  // Boolean defaults
  const myBool = await dataTypesDemo.myBool();
  const isActive = await dataTypesDemo.isActive();
  console.log(`myBool default value: ${myBool}`);
  console.log(`isActive initial value: ${isActive}`);
  
  // Unsigned integer defaults
  const myUint8 = await dataTypesDemo.myUint8();
  const myUint256 = await dataTypesDemo.myUint256();
  console.log(`myUint8 default value: ${myUint8}`);
  console.log(`myUint256 default value: ${myUint256}`);
  
  // Signed integer defaults
  const myInt8 = await dataTypesDemo.myInt8();
  const myInt256 = await dataTypesDemo.myInt256();
  console.log(`myInt8 default value: ${myInt8}`);
  console.log(`myInt256 default value: ${myInt256}`);
  
  // Address defaults
  const myAddress = await dataTypesDemo.myAddress();
  const myPayableAddress = await dataTypesDemo.myPayableAddress();
  console.log(`myAddress default value: ${myAddress}`);
  console.log(`myPayableAddress default value: ${myPayableAddress}`);
  
  // Bytes defaults
  const myBytes1 = await dataTypesDemo.myBytes1();
  const myBytes32 = await dataTypesDemo.myBytes32();
  console.log(`myBytes1 default value: ${myBytes1}`);
  console.log(`myBytes32 default value: ${myBytes32}`);
  
  // Dynamic type defaults
  const myString = await dataTypesDemo.myString();
  const myDynamicBytes = await dataTypesDemo.myDynamicBytes();
  console.log(`myString default value: "${myString}"`);
  console.log(`myDynamicBytes default value: ${myDynamicBytes}`);
  
  // Fixed array defaults
  const fixedArray0 = await dataTypesDemo.fixedArray(0);
  console.log(`fixedArray[0] default value: ${fixedArray0}`);
  
  // Demonstrate array operations
  console.log("\n--- Array Operations Demonstration ---");
  
  console.log("Calling demonstrateArrays()...");
  const tx = await dataTypesDemo.demonstrateArrays();
  await tx.wait();
  console.log("Array operations completed!");
  
  // Check the results
  const arrayValue0 = await dataTypesDemo.myArray(0);
  const arrayValue1 = await dataTypesDemo.myArray(1);
  const fixedArrayValue0 = await dataTypesDemo.fixedArray(0);
  const fixedArrayValue1 = await dataTypesDemo.fixedArray(1);
  
  console.log(`Dynamic array[0]: ${arrayValue0}`);
  console.log(`Dynamic array[1]: ${arrayValue1}`);
  console.log(`Fixed array[0]: ${fixedArrayValue0}`);
  console.log(`Fixed array[1]: ${fixedArrayValue1}`);
  
  console.log("\nDeployment and demonstration completed successfully!");
  
  return {
    contract: dataTypesDemo,
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

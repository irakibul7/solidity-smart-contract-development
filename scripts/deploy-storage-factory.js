const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying StorageFactory contract...");

  const StorageFactory = await ethers.getContractFactory("StorageFactory");
  const storageFactory = await StorageFactory.deploy();
  await storageFactory.waitForDeployment();

  const factoryAddress = await storageFactory.getAddress();
  console.log(`StorageFactory deployed to: ${factoryAddress}`);

  console.log("\n--- Example interactions ---");
  console.log("Creating a new SimpleStorage via factory...");
  const createTx = await storageFactory.createSimpleStorageContract();
  await createTx.wait();

  // Interact with the first created SimpleStorage
  console.log("Storing 123 in the first SimpleStorage...");
  const storeTx = await storageFactory.sfStore(0, 123);
  await storeTx.wait();

  const value = await storageFactory.sfGet(0);
  console.log(`Value in first SimpleStorage: ${value}`);

  return { contract: storageFactory, address: factoryAddress };
}

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



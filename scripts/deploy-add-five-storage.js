const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying AddFiveStorage contract...");

  const AddFiveStorage = await ethers.getContractFactory("AddFiveStorage");
  const addFiveStorage = await AddFiveStorage.deploy();
  await addFiveStorage.waitForDeployment();

  const deployedAddress = await addFiveStorage.getAddress();
  console.log(`AddFiveStorage deployed to: ${deployedAddress}`);

  console.log("\n--- Example interaction ---");
  console.log("Calling store(10) which should save 15...");
  const tx = await addFiveStorage.store(10);
  await tx.wait();

  const value = await addFiveStorage.retrieve();
  console.log(`retrieve() returned: ${value}`);

  return { contract: addFiveStorage, address: deployedAddress };
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



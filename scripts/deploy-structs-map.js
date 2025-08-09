const {ethers} = require("hardhat");

async function main(){
    console.log("Deploying StructsAndMappingsDemo contract...");

    // Get the contract factory
    const StructsAndMappingsDemo = await ethers.getContractFactory("StructsAndMappingsDemo");
    const [deployer] = await ethers.getSigners();

    // Deploy the contract
    const simpleStorage = await StructsAndMappingsDemo.deploy();

    await simpleStorage.waitForDeployment();

    const deployedAddress = await simpleStorage.getAddress();
    console.log(`StructsAndMappingsDemo deployed to: ${deployedAddress}`);

    // Example interactions
    console.log("\n--- Example interactions ---");

    // Add a person
    console.log("Adding a person...");
    // addPerson expects (string name, uint256 favoriteNumber)
    const addPersonTx = await simpleStorage.addPerson("John Doe", 42);
    await addPersonTx.wait();

    // Update age for msg.sender (the deployer)
    console.log("Updating age to 25...");
    const updateAgeTx = await simpleStorage.updateAge(25);
    await updateAgeTx.wait();

    // Get the person's information
    const person = await simpleStorage.addressToPerson(deployer.address);
    console.log(`Person: ${person.name} - ${person.age} - ${person.isActive} - ${person.wallet}`);

    // Get the person's favorite number
    const favoriteNumber = await simpleStorage.nameToFavoriteNumber("John Doe");
    console.log(`John Doe's favorite number: ${favoriteNumber}`);

    return {
        contract: simpleStorage,    
        address: deployedAddress
    }
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
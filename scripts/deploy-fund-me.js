const { ethers} = require("hardhat");

async function main(){
    const fundMe = await ethers.getContractFactory("FundMe");
    const fundMeDeployed = await fundMe.deploy();

    await fundMeDeployed.waitForDeployment();

    console.log(`FundMe deployed to: ${fundMeDeployed.target}`);
    const deployedAddress = await fundMeDeployed.getAddress();
    console.log(`FundMe deployed to: ${deployedAddress}`);

    return {
        contract: fundMeDeployed,
        address: deployedAddress
    }
}

if(require.main === module){
    main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Deployment failed:");
        console.error(error);
        process.exit(1);
    });
}

module.exports = main;
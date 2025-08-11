const { ethers} = require("hardhat");
const PRIVATE_KEY = '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a'
async function main(){
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // Get the FundMe contract factory
    const fundMe = await ethers.getContractFactory("FundMe");
    const fundMeDeployed = fundMe.attach(contractAddress);

    // Fund the contract from the private key account
    const tx = await fundMeDeployed.fund({value: ethers.parseEther("0.01")});
    await tx.wait(1);

    console.log("Transaction hash:", tx.hash);
    console.log("Funded with 1.1 ETH successfully!");
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error("Interaction failed:");
    console.error(error);
    process.exit(1);
});

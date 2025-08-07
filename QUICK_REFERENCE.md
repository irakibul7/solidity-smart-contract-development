# Quick Reference Guide

## Essential Commands

### Development
```bash
npm run compile          # Compile contracts
npm run test            # Run all tests
npm run test --grep "Storage"  # Run specific tests
npm run clean           # Clean build artifacts
```

### Deployment
```bash
npm run deploy          # Deploy to hardhat network
npm run deploy:localhost # Deploy to localhost network
npm run node            # Start local blockchain node
```

### Interaction
```bash
npm run interact        # Run interaction script
npx hardhat console     # Open Hardhat console
```

### Network Commands
```bash
# Deploy to specific network
npx hardhat run scripts/deploy-simple-storage.js --network localhost
npx hardhat run scripts/deploy-simple-storage.js --network sepolia

# Verify contract on Etherscan
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

## Hardhat Console Examples

```javascript
// Get contract factory
const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

// Deploy contract
const contract = await SimpleStorage.deploy();
await contract.waitForDeployment();

// Interact with contract
await contract.store(42);
const value = await contract.retrieve();
console.log(value.toString());

// Add person
await contract.addPerson("Alice", 25);
const count = await contract.getPeopleCount();
console.log(count.toString());
```

## Common Solidity Patterns

### Basic Contract Structure
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyContract {
    // State variables
    uint256 public myNumber;
    
    // Constructor
    constructor(uint256 _initialNumber) {
        myNumber = _initialNumber;
    }
    
    // Functions
    function setNumber(uint256 _number) public {
        myNumber = _number;
    }
    
    function getNumber() public view returns (uint256) {
        return myNumber;
    }
}
```

### Common Data Types
```solidity
bool public isTrue = true;
uint256 public myUint = 123;
int256 public myInt = -123;
address public myAddress = 0x123...;
string public myString = "Hello";
bytes32 public myBytes = "Hello World";
```

### Arrays and Mappings
```solidity
uint256[] public myArray;
mapping(address => uint256) public balances;
mapping(string => bool) public nameExists;
```

## Debugging Tips

1. **Use console.log in tests**
   ```javascript
   console.log("Value:", value.toString());
   ```

2. **Check gas usage**
   ```bash
   REPORT_GAS=true npm run test
   ```

3. **Use Hardhat's built-in tools**
   ```bash
   npx hardhat compile --verbose
   npx hardhat test --verbose
   ```

4. **Common errors and solutions**
   - `Transaction reverted`: Check require statements
   - `Out of gas`: Increase gas limit or optimize code
   - `Nonce too high`: Reset account in MetaMask

## Useful Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)
- [Ethereum Development Tools](https://ethereum.org/developers/)
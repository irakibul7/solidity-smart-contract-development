# Lesson 1: Simple Storage Contract

This lesson covers the fundamentals of Solidity smart contracts using a simple storage example.

## Learning Objectives

- Understand basic Solidity syntax
- Learn about state variables and functions
- Work with structs, arrays, and mappings
- Practice contract deployment and interaction
- Understand gas costs and optimization

## Contract Overview

The `SimpleStorage.sol` contract demonstrates:

### State Variables
```solidity
uint256 private favoriteNumber;    // Private state variable
Person[] public people;            // Dynamic array of structs
mapping(string => uint256) public nameToFavoriteNumber; // Key-value mapping
```

### Data Structures
```solidity
struct Person {
    uint256 favoriteNumber;
    string name;
}
```

### Functions
- `store(uint256)` - Writes to state (costs gas)
- `retrieve()` - Reads from state (view function, no gas cost when called externally)
- `addPerson(string, uint256)` - Adds person to array and mapping
- `getPerson(uint256)` - Retrieves person by index with bounds checking
- `getPeopleCount()` - Returns array length

## Key Concepts

### Function Types
- **View Functions**: Read state without modifying it
- **Pure Functions**: Don't read or modify state
- **Regular Functions**: Can modify state (cost gas)

### Visibility Modifiers
- **public**: Accessible from anywhere
- **private**: Only accessible within the contract
- **internal**: Accessible within contract and derived contracts
- **external**: Only accessible from outside the contract

### Storage vs Memory
- **Storage**: Permanent data stored on blockchain
- **Memory**: Temporary data during function execution
- **Calldata**: Read-only temporary data (for function parameters)

## Exercises

1. **Basic Operations**
   - Deploy the contract
   - Store your favorite number
   - Retrieve and verify the stored number

2. **Working with People**
   - Add multiple people with different favorite numbers
   - Retrieve people by index
   - Test the name-to-number mapping

3. **Error Handling**
   - Try accessing a person with an invalid index
   - Observe the revert message

4. **Gas Analysis**
   - Compare gas costs between storing numbers and adding people
   - Understand why adding people costs more gas

## Commands

```bash
# Compile the contract
npm run compile

# Run tests
npm run test

# Deploy locally
npm run deploy

# Interact with deployed contract
npm run interact
```

## Next Steps

After completing this lesson:
1. Experiment with different data types
2. Try modifying the contract structure
3. Add new functions and test them
4. Move to lesson 2 for Remix IDE practice
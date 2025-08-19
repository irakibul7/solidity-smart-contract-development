# Solidity Smart Contract Development

[![CI](https://github.com/irakibul7/solidity-smart-contract-development/actions/workflows/ci.yml/badge.svg)](https://github.com/irakibul7/solidity-smart-contract-development/actions/workflows/ci.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.x-yellow)](https://hardhat.org)
[![Stars](https://img.shields.io/github/stars/irakibul7/solidity-smart-contract-development?style=social)](https://github.com/irakibul7/solidity-smart-contract-development/stargazers)

Welcome to your Solidity learning journey! This workspace is organized to follow the Blockchain Developer, providing a structured environment for learning smart contract development with Hardhat.

## 📁 Project Structure

```
├── contracts/                       # Smart contracts
│   ├── SimpleStorage.sol           # Minimal storage contract used by tests/scripts
│   ├── FundMe.sol                  # Crowdfunding contract with price feeds
│   ├── PriceConverter.sol          # Price conversion utility library
│   ├── StorageFactory.sol          # Factory pattern for creating storage contracts
│   ├── AddFiveStorage.sol          # Extended storage contract with inheritance
│   ├── DataTypesDemo.sol           # Basic types, arrays, fixed arrays
│   ├── StructsAndMappingsDemo.sol  # Structs, arrays, mappings, simple CRUD
│   ├── ModifiersAndAccessDemo.sol  # Modifiers and access control patterns
│   ├── FunctionsVisibilityDemo.sol # public/external/internal/private examples
│   └── MathUtilsDemo.sol           # Pure/view utilities and block globals
├── test/                           # Test files
│   ├── SimpleStorage.js            # Comprehensive tests for SimpleStorage
│   ├── Fundme.js                   # Tests for FundMe contract
│   ├── StorageFactory.js           # Tests for StorageFactory contract
│   ├── AddFiveStorage.js           # Tests for AddFiveStorage contract
│   ├── DataTypesDemo.js            # Tests for DataTypesDemo contract
│   ├── StructsAndMappingsDemo.js   # Tests for StructsAndMappingsDemo contract
│   ├── ModifiersAndAccessDemo.js   # Tests for ModifiersAndAccessDemo contract
│   ├── FunctionsVisibilityDemo.js  # Tests for FunctionsVisibilityDemo contract
│   └── MathUtilsDemo.js            # Tests for MathUtilsDemo contract
├── scripts/                        # Deployment and interaction scripts
│   ├── deploy-simple-storage.js    # Deploy SimpleStorage contract
│   ├── deploy-fund-me.js           # Deploy FundMe contract
│   ├── deploy-storage-factory.js   # Deploy StorageFactory contract
│   ├── deploy-add-five-storage.js  # Deploy AddFiveStorage contract
│   ├── deploy-data-types-demo.js   # Deploy and demo DataTypesDemo
│   ├── deploy-structs-mappings-demo.js # Deploy and demo StructsAndMappingsDemo
│   ├── deploy-modifiers-access-demo.js # Deploy and demo ModifiersAndAccessDemo
│   ├── deploy-functions-visibility-demo.js # Deploy and demo FunctionsVisibilityDemo
│   ├── deploy-math-utils-demo.js   # Deploy and demo MathUtilsDemo
│   ├── interact-simple-storage.js  # Interact with SimpleStorage
│   └── interact-fund-me.js         # Interact with FundMe
├── ignition/                       # Hardhat Ignition deployment modules
├── hardhat.config.js               # Hardhat configuration
├── package.json                    # Dependencies and scripts
├── QUICK_REFERENCE.md              # Quick reference guide
└── env-template.txt                # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Git

### Installation
```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm run test

# Start local blockchain
npm run node
```

### Project Initialization (For Reference)
If you need to recreate this setup from scratch, here are the commands used:

```bash
# Initialize Node.js project
npm init -y

# Install Hardhat and toolbox
npm install --save-dev hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox

# Initialize Hardhat project
npx hardhat init
# Select: "Create a JavaScript project"
# Accept defaults for project root and .gitignore

# Create organized folder structure
mkdir lessons
mkdir lessons\01-simple-storage
mkdir lessons\02-remix-storage
mkdir lessons\03-fund-me
mkdir scripts

# The SimpleStorage contract, tests, and scripts were then created
# Configuration files (hardhat.config.js, package.json) were updated
```


### 🎯 Educational Demo Contracts (Beginner Friendly)

This repository includes comprehensive demo contracts designed to teach specific Solidity concepts in isolation. Each contract focuses on a particular topic with practical examples:

#### **DataTypesDemo.sol** - Solidity Data Types & Arrays
- **Purpose**: Learn about all Solidity data types and their default values
- **Concepts**: Booleans, integers (signed/unsigned), addresses, bytes, strings, arrays
- **Features**: Demonstrates default values, dynamic vs fixed arrays, array operations
- **Deploy**: `npm run deploy:data-types`
- **Test**: `npx hardhat test test/DataTypesDemo.js`

#### **StructsAndMappingsDemo.sol** - Data Structures & CRUD Operations
- **Purpose**: Master structs, mappings, and basic database-like operations
- **Concepts**: Structs, arrays of structs, mappings, events, custom errors
- **Features**: Person management system, CRUD operations, data validation
- **Deploy**: `npm run deploy:structs-mappings`
- **Test**: `npx hardhat test test/StructsAndMappingsDemo.js`

#### **ModifiersAndAccessDemo.sol** - Access Control & Security Patterns
- **Purpose**: Learn about modifiers, access control, and security best practices
- **Concepts**: Modifiers, access control, reentrancy protection, time locks, gas price limits
- **Features**: Owner-only functions, authorization system, multiple modifier types
- **Deploy**: `npm run deploy:modifiers-access`
- **Test**: `npx hardhat test test/ModifiersAndAccessDemo.js`

#### **FunctionsVisibilityDemo.sol** - Function Visibility & Scope
- **Purpose**: Understand function visibility and scope in Solidity
- **Concepts**: public, external, internal, private functions, scope rules
- **Features**: Demonstrates all visibility levels, internal vs external calls
- **Deploy**: `npm run deploy:functions-visibility`
- **Test**: `npx hardhat test test/FunctionsVisibilityDemo.js`

#### **MathUtilsDemo.sol** - Pure/View Functions & Block Information
- **Purpose**: Learn about pure/view functions and blockchain context
- **Concepts**: Pure functions, view functions, type limits, block information
- **Features**: Mathematical utilities, type boundary demonstrations, block data
- **Deploy**: `npm run deploy:math-utils`
- **Test**: `npx hardhat test test/MathUtilsDemo.js`

#### **Deploy All Demo Contracts**
```bash
npm run deploy:all-demos
```

Use these demos to explore each topic in isolation while `SimpleStorage.sol` remains a clear, minimal contract for tests and scripts.

### Why This Repo (and how you can help it grow)
- **Beginner-first design**: Minimal core contract + focused topic demos.
- **Real workflow**: Hardhat project with tests, gas reports, scripts, and lessons.
- **Approachable examples**: Each demo is short and to the point.

If you find this helpful, please star the repo to help more learners discover it!

### 🤝 Contributing (Make this the best Solidity learning repo)

We welcome improvements and new examples to make this the ultimate Solidity learning resource. Please:

#### **Contribution Guidelines**
- Keep demos short, focused, and beginner-friendly
- Prefer adding new demo contracts over bloating existing ones
- Add comprehensive tests for all new functionality
- Update documentation and README for new features
- Follow the existing code style and commenting patterns

#### **Suggested Contributions**

##### **Security & Best Practices**
- Reentrancy protection patterns
- Access control implementations
- Checks-Effects-Interactions pattern
- Upgradeable contract patterns
- Multi-signature wallet examples

##### **Advanced Patterns**
- Gas optimization techniques and trade-offs
- Events and indexing patterns for frontends
- Error handling with custom errors
- Try/catch between contracts
- Library implementations

##### **Real-World Examples**
- Token contracts (ERC20, ERC721)
- DeFi protocols (lending, DEX)
- DAO governance systems
- Oracle integrations
- Cross-chain functionality

##### **Testing & Development**
- Fuzzing test examples
- Integration test patterns
- Gas benchmarking tools
- Security analysis tools
- Deployment automation

#### **How to Contribute**
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Add your improvements**: New contracts, tests, or documentation
4. **Test thoroughly**: Ensure all tests pass
5. **Update documentation**: README, comments, and examples
6. **Submit a pull request**: With clear description of changes

#### **Quality Standards**
- **Educational Value**: Each addition should teach a clear concept
- **Code Quality**: Follow Solidity best practices and security patterns
- **Documentation**: Comprehensive comments and examples
- **Testing**: Full test coverage with edge cases
- **Gas Efficiency**: Consider gas optimization where appropriate

Let's make this the go-to resource for learning Solidity! 🚀

## 🛠 Available Scripts

### Core Development
| Command | Description |
|---------|-------------|
| `npm run compile` | Compile all smart contracts |
| `npm run test` | Run all tests with gas reporting |
| `npm run clean` | Clean compiled artifacts |
| `npm run coverage` | Run test coverage analysis |

### Main Contract Deployment
| Command | Description |
|---------|-------------|
| `npm run deploy` | Deploy SimpleStorage to local hardhat network |
| `npm run deploy:localhost` | Deploy FundMe to localhost network |
| `npm run deploy:factory` | Deploy StorageFactory contract |
| `npm run deploy:add5` | Deploy AddFiveStorage contract |

### Demo Contract Deployment
| Command | Description |
|---------|-------------|
| `npm run deploy:data-types` | Deploy and demo DataTypesDemo contract |
| `npm run deploy:structs-mappings` | Deploy and demo StructsAndMappingsDemo contract |
| `npm run deploy:modifiers-access` | Deploy and demo ModifiersAndAccessDemo contract |
| `npm run deploy:functions-visibility` | Deploy and demo FunctionsVisibilityDemo contract |
| `npm run deploy:math-utils` | Deploy and demo MathUtilsDemo contract |
| `npm run deploy:all-demos` | Deploy all demo contracts in sequence |

### Interaction & Network
| Command | Description |
|---------|-------------|
| `npm run interact` | Interact with deployed FundMe contract |
| `npm run node` | Start local blockchain node |

## 🧪 Testing

The project includes comprehensive tests for all contracts with detailed coverage:

### Running Tests
```bash
# Run all tests
npm run test

# Run with gas reporting
REPORT_GAS=true npm run test

# Run specific test file
npx hardhat test test/SimpleStorage.js
npx hardhat test test/DataTypesDemo.js
npx hardhat test test/StructsAndMappingsDemo.js
npx hardhat test test/ModifiersAndAccessDemo.js
npx hardhat test test/FunctionsVisibilityDemo.js
npx hardhat test test/MathUtilsDemo.js
```

### Test Coverage by Contract

#### **SimpleStorage.js** - Core Storage Contract
- Contract deployment and initialization
- State variable management (favorite number)
- People management (add, retrieve, count)
- Mapping operations and lookups
- Error handling (index bounds)
- Gas consumption analysis

#### **DataTypesDemo.js** - Data Types & Arrays
- Default values for all Solidity types
- Boolean, integer, address, bytes defaults
- Dynamic and fixed array operations
- Array manipulation and access
- Gas testing for array operations

#### **StructsAndMappingsDemo.js** - Data Structures
- Person struct creation and management
- Mapping operations (name → number, address → person)
- CRUD operations (add, update, retrieve)
- Event emission verification
- Custom error handling
- Data consistency across mappings

#### **ModifiersAndAccessDemo.js** - Access Control
- Owner access control verification
- Modifier functionality testing
- Number validation and limits
- Non-reentrant protection
- Time-based restrictions
- Gas price limitations
- Authorization system

#### **FunctionsVisibilityDemo.js** - Function Scope
- Public function accessibility
- External function calls (direct and via 'this')
- Internal function restrictions
- Private function restrictions
- Cross-function visibility rules
- Multiple account testing

#### **MathUtilsDemo.js** - Utilities & Block Info
- Pure function consistency
- Type limit verification
- Block information accuracy
- Time progression testing
- Function purity validation
- Cross-function integration

### Test Features
- **Comprehensive Coverage**: Each contract has 15-25+ test cases
- **Gas Analysis**: Built-in gas consumption testing
- **Error Handling**: Tests for expected failures and edge cases
- **Multi-Account Testing**: Verifies access control and permissions
- **State Consistency**: Ensures data integrity across operations
- **Educational Value**: Tests demonstrate Solidity concepts clearly

## 🚀 Deployment

### Local Network Setup & Deployment

To deploy contracts on a local blockchain network, follow these steps:

#### Step 1: Start Local Blockchain Network
```bash
# Start local Hardhat network (keeps running until stopped)
npm run node
```
This command will:
- Start a local Ethereum network on `http://127.0.0.1:8545`
- Create 20 test accounts with 10,000 ETH each
- Display account addresses and private keys
- Keep the network running until you stop it (Ctrl+C)

#### Step 2: Deploy Contract (New Terminal)
Open a new terminal window/tab and run:
```bash
# Deploy to the local network
npm run deploy:localhost
```

#### Alternative: One-Terminal Deployment
If you prefer not to keep a persistent local network running:
```bash
# Deploy to Hardhat's built-in network (ephemeral)
npm run deploy
```

#### Step 3: Interact with Deployed Contract
```bash
# Run interaction script
npm run interact
```

**Note**: Make sure to update the contract address in `scripts/interact-simple-storage.js` after deployment if using the interaction script.

### Testnet Deployment
1. Copy `env-template.txt` to `.env`
2. Fill in your environment variables:
   - `ALCHEMY_API_KEY`: Your Alchemy API key
   - `PRIVATE_KEY`: Your wallet private key (KEEP SECURE!)
   - `ETHERSCAN_API_KEY`: For contract verification

3. Uncomment testnet configuration in `hardhat.config.js`
4. Deploy: `npx hardhat run scripts/deploy-simple-storage.js --network sepolia`

## 🔧 Configuration

### Hardhat Config Features
- **Solidity 0.8.19** with optimizer enabled
- **Gas reporting** in USD
- **Multiple networks** (local, testnet ready)
- **Extended timeouts** for complex operations

### Network Setup
- **Hardhat Network**: Built-in development network
- **Localhost**: Connect to local running node
- **Sepolia**: Ethereum testnet (configure in hardhat.config.js)

## 🎯 Learning Path & Objectives

This repository is designed as a comprehensive learning journey through Solidity smart contract development. Follow this structured path to build your skills progressively:

### 🚀 **Phase 1: Fundamentals** (Start Here)
1. **SimpleStorage.sol** - Your first smart contract
   - Learn basic Solidity syntax and structure
   - Understand state variables and functions
   - Master basic data types and storage
   - Practice with tests and deployment scripts

### 📚 **Phase 2: Core Concepts** (Educational Demos)
2. **DataTypesDemo.sol** - Master Solidity Types
   - Learn all data types and their default values
   - Understand arrays (dynamic vs fixed)
   - Practice type manipulation and operations

3. **StructsAndMappingsDemo.sol** - Data Structures
   - Master structs and complex data types
   - Learn mapping operations and CRUD
   - Understand events and error handling

4. **FunctionsVisibilityDemo.sol** - Function Scope
   - Learn public, external, internal, private
   - Understand function accessibility rules
   - Practice cross-function calls

5. **MathUtilsDemo.sol** - Pure Functions & Context
   - Learn pure vs view functions
   - Understand blockchain context (block info)
   - Master type limits and mathematical operations

6. **ModifiersAndAccessDemo.sol** - Security & Access Control
   - Learn modifiers and access control patterns
   - Understand security best practices
   - Practice reentrancy protection and time locks

### 🏗️ **Phase 3: Advanced Patterns** (Real-World Examples)
7. **StorageFactory.sol** - Factory Pattern
   - Learn design patterns in Solidity
   - Understand contract creation and management

8. **FundMe.sol** - Real-World Application
   - Learn price feeds and external dependencies
   - Understand payable functions and value handling
   - Practice with Chainlink integration

### 🛠️ **Phase 4: Development Tools & Best Practices**
- **Hardhat Framework**: Complete development environment
- **Testing**: Comprehensive test coverage with Mocha/Chai
- **Deployment**: Automated deployment scripts
- **Gas Optimization**: Built-in gas reporting and analysis
- **Security**: Access control and security patterns

### 📖 **Learning Resources**
- **Code Comments**: Every contract is heavily commented
- **Test Files**: Tests demonstrate expected behavior
- **Deployment Scripts**: See contracts in action
- **QUICK_REFERENCE.md**: Essential commands and patterns
- **Gas Reports**: Learn about gas optimization

### 🎯 **What You'll Master**
- **Solidity Fundamentals**: Syntax, types, functions, storage
- **Smart Contract Design**: Patterns, security, best practices
- **Development Workflow**: Testing, deployment, interaction
- **Real-World Skills**: Price feeds, access control, factory patterns
- **Security Awareness**: Reentrancy, access control, validation

## 🔍 Contract Interaction

### Using the Deploy Scripts

#### **Main Contracts**
```bash
# Deploy SimpleStorage (fundamentals)
npm run deploy

# Deploy FundMe (crowdfunding)
npm run deploy:localhost

# Deploy StorageFactory (factory pattern)
npm run deploy:factory

# Deploy AddFiveStorage (inheritance)
npm run deploy:add5
```

#### **Educational Demo Contracts**
```bash
# Deploy individual demo contracts
npm run deploy:data-types          # Data types and arrays
npm run deploy:structs-mappings    # Structs and mappings
npm run deploy:modifiers-access    # Access control and security
npm run deploy:functions-visibility # Function visibility
npm run deploy:math-utils          # Pure functions and block info

# Deploy all demo contracts at once
npm run deploy:all-demos
```

Each demo deployment script will:
- Deploy the contract
- Demonstrate key functionality
- Show expected outputs
- Test error conditions
- Provide educational insights

### Using the Interact Scripts
```bash
# Interact with SimpleStorage
npm run interact

# Interact with FundMe (after deployment)
# Update contract address in scripts/interact-fund-me.js first
npm run interact
```

### Manual Interaction
```bash
# Start Hardhat console
npx hardhat console

# In console:
const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
const contract = await SimpleStorage.deploy();
await contract.store(42);
console.log(await contract.retrieve());
```

## 🛡️ Security Notes

- **Never commit private keys** to version control
- Use environment variables for sensitive data
- Test thoroughly before mainnet deployment
- Consider using multi-signature wallets for production

Happy coding! 🚀

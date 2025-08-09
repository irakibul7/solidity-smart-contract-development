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
│   ├── DataTypesDemo.sol           # Basic types, arrays, fixed arrays
│   ├── StructsAndMappingsDemo.sol  # Structs, arrays, mappings, simple CRUD
│   ├── ModifiersAndAccessDemo.sol  # Modifiers and access control patterns
│   ├── FunctionsVisibilityDemo.sol # public/external/internal/private examples
│   └── MathUtilsDemo.sol           # Pure/view utilities and block globals
├── test/                           # Test files
│   └── SimpleStorage.js            # Comprehensive tests for SimpleStorage
├── scripts/                        # Deployment and interaction scripts
│   ├── deploy-simple-storage.js
│   └── interact-simple-storage.js
├── lessons/                        # Course materials organized by lesson
│   ├── 01-simple-storage/          # Basic storage concepts
│   ├── 02-remix-storage/           # Remix IDE lessons
│   └── 03-fund-me/                 # Fund me contract lessons
├── ignition/                       # Hardhat Ignition deployment modules
├── hardhat.config.js               # Hardhat configuration
├── package.json                    # Dependencies and scripts
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

## 📚 Learning Path

### Lesson 1: Simple Storage
Start with the minimal `SimpleStorage.sol` contract to learn:
- State variables
- Functions (view, pure, payable)
- Structs and arrays
- Mappings
- Basic contract interaction

### Topic-Based Demo Contracts (Beginner Friendly)
To keep learning focused and approachable, advanced examples were split into dedicated, self-contained demo contracts under `contracts/`:

- **DataTypesDemo.sol**: Basic types, dynamic/fixed arrays, defaults, small array ops.
- **StructsAndMappingsDemo.sol**: `struct` patterns, arrays of structs, mappings, simple updates.
- **ModifiersAndAccessDemo.sol**: Common modifiers (`onlyOwner`, `nonReentrant`, time, gas price) and access control.
- **FunctionsVisibilityDemo.sol**: `public`, `external`, `internal`, `private` with simple call examples.
- **MathUtilsDemo.sol**: Pure/view utilities, type limits, and block globals.

Use these demos to explore each topic in isolation while `SimpleStorage.sol` remains a clear, minimal contract for tests and scripts.

### Why This Repo (and how you can help it grow)
- **Beginner-first design**: Minimal core contract + focused topic demos.
- **Real workflow**: Hardhat project with tests, gas reports, scripts, and lessons.
- **Approachable examples**: Each demo is short and to the point.

If you find this helpful, please star the repo to help more learners discover it!

### Contributing (Make this the best Solidity learning repo)
We welcome improvements and new examples. Please:
- Keep demos short, focused, and beginner-friendly.
- Prefer adding a new demo contract over bloating existing ones.
- Add or update tests where it makes sense.
- Document any new topic briefly in this README.

Suggested contributions:
- More security best-practice demos (reentrancy, access patterns, checks-effects-interactions).
- Gas optimization patterns and trade-offs.
- Events and indexing patterns, logging for frontends.
- Error handling with custom errors and try/catch between contracts.

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile all smart contracts |
| `npm run test` | Run all tests with gas reporting |
| `npm run deploy` | Deploy to local hardhat network |
| `npm run deploy:localhost` | Deploy to localhost network |
| `npm run interact` | Interact with deployed contract |
| `npm run node` | Start local blockchain node |
| `npm run clean` | Clean compiled artifacts |
| `npm run coverage` | Run test coverage analysis |

## 🧪 Testing

The project includes comprehensive tests for the SimpleStorage contract:

```bash
# Run all tests
npm run test

# Run with gas reporting
REPORT_GAS=true npm run test

# Run specific test file
npx hardhat test test/SimpleStorage.js
```

Test coverage includes:
- Contract deployment
- State variable management
- Function execution
- Error handling
- Gas consumption analysis

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

## 🎯 Learning Objectives

By working through this project, you'll learn:

1. **Smart Contract Basics**
   - Solidity syntax and structure
   - State variables and functions
   - Data types and storage

2. **Development Tools**
   - Hardhat framework
   - Testing with Mocha/Chai
   - Deployment automation

3. **Best Practices**
   - Contract testing strategies
   - Gas optimization
   - Security considerations

## 🔍 Contract Interaction

### Using the Deploy Script
```bash
npm run deploy
```
This will:
- Deploy the SimpleStorage contract
- Set an initial favorite number
- Add a sample person
- Display all interactions

### Using the Interact Script
```bash
# First, update the contract address in scripts/interact-simple-storage.js
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

## 📝 Next Steps

1. Complete the SimpleStorage exercises
2. Move to `lessons/02-remix-storage/` for Remix IDE practice
3. Progress to `lessons/03-fund-me/` for more advanced concepts
4. Explore DeFi protocols and advanced patterns

Happy coding! 🚀

# Solidity Smart Contract Development - Cyfrin Updraft Course

Welcome to your Solidity learning journey! This workspace is organized to follow the Cyfrin Updraft Blockchain Developer course, providing a structured environment for learning smart contract development with Hardhat.

## 📁 Project Structure

```
├── contracts/                 # Smart contracts
│   └── SimpleStorage.sol     # Basic storage contract for learning
├── test/                     # Test files
│   └── SimpleStorage.js      # Comprehensive tests for SimpleStorage
├── scripts/                  # Deployment and interaction scripts
│   ├── deploy-simple-storage.js
│   └── interact-simple-storage.js
├── lessons/                  # Course materials organized by lesson
│   ├── 01-simple-storage/    # Basic storage concepts
│   ├── 02-remix-storage/     # Remix IDE lessons
│   └── 03-fund-me/          # Fund me contract lessons
├── ignition/                 # Hardhat Ignition deployment modules
├── hardhat.config.js         # Hardhat configuration
├── package.json              # Dependencies and scripts
└── env-template.txt          # Environment variables template
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
Start with the basic `SimpleStorage.sol` contract to learn:
- State variables
- Functions (view, pure, payable)
- Structs and arrays
- Mappings
- Basic contract interaction

### Current Contract: SimpleStorage
The `SimpleStorage.sol` contract demonstrates:
- **State Management**: Store and retrieve a favorite number
- **Data Structures**: Use of structs, arrays, and mappings
- **Function Types**: View and state-changing functions
- **Access Patterns**: Public, private visibility

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

### Local Development
```bash
# Terminal 1: Start local blockchain
npm run node

# Terminal 2: Deploy contract
npm run deploy:localhost
```

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

## 📖 Course Resources

- **Cyfrin Updraft**: [https://updraft.cyfrin.io/](https://updraft.cyfrin.io/)
- **Solidity Documentation**: [https://docs.soliditylang.org/](https://docs.soliditylang.org/)
- **Hardhat Documentation**: [https://hardhat.org/docs](https://hardhat.org/docs)
- **Ethereum Development**: [https://ethereum.org/developers](https://ethereum.org/developers)

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

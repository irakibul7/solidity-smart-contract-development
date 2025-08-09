# Lesson 2: Storage Patterns (SimpleStorage, AddFiveStorage, StorageFactory)

This lesson introduces core storage patterns in Solidity using three small contracts and shows how to work with them using Hardhat.

## What you'll build

- **Simple persistent storage** with `SimpleStorage`
- **Inheritance + override** with `AddFiveStorage`
- **Factory pattern** that deploys and manages many `SimpleStorage` contracts with `StorageFactory`

## Contracts overview

- **SimpleStorage** (`contracts/SimpleStorage.sol`)
  - State: `favoriteNumber`, `listOfPeople`, `nameToFavoriteNumber`
  - Functions: `store`, `retrieve`, `addPerson`, `getPeopleCount`, `getPerson`

- **AddFiveStorage** (`contracts/AddFiveStorage.sol`)
  - Inherits `SimpleStorage`
  - Overrides `store` to save the provided number plus 5

- **StorageFactory** (`contracts/StorageFactory.sol`)
  - Deploys new `SimpleStorage` instances and keeps them in an array
  - Functions: `createSimpleStorageContract`, `sfStore`, `sfGet`

## Prerequisites

- Node.js and npm installed
- Install dependencies:
  ```bash
  npm install
  ```

## Compile

```bash
npm run compile
```

## Test

Run the full test suite:
```bash
npm test
```

Or target a specific test:
```bash
npx hardhat test test/SimpleStorage.js
npx hardhat test test/AddFiveStorage.js
npx hardhat test test/StorageFactory.js
```

## Deploy and interact (scripts)

The repository includes scripts that deploy and perform a few example interactions.

- Deploy `SimpleStorage` and run sample interactions:
  ```bash
  npm run deploy
  ```

- Deploy `AddFiveStorage` and verify that `store(x)` saves `x + 5`:
  ```bash
  npm run deploy:add5
  ```

- Deploy `StorageFactory`, create a `SimpleStorage`, store and read via the factory:
  ```bash
  npm run deploy:factory
  ```

Each command runs against the built‑in Hardhat network by default. To use a local node:
```bash
npm run node
# in another terminal
npx hardhat run scripts/deploy-simple-storage.js --network localhost
```

## Key learning points

- Public variables generate getters you can call from scripts/tests
- Inheritance enables reuse; overriding allows behavior changes (`AddFiveStorage.store`)
- Factory contracts can create and track many child contracts (`StorageFactory`)

## Next steps

- Extend `StorageFactory` to index deployments by address or add events
- Add more derived contracts that override `store` differently (e.g., multiply, clamp, validate)

*Tip: See `scripts/` and `test/` for usage examples matching this lesson.*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SimpleStorage - Complete Solidity Learning Contract
 * @dev A comprehensive contract for learning Solidity fundamentals
 * @author Educational Resource
 * 
 * This contract demonstrates:
 * - All basic Solidity data types and their default values
 * - State variables with different visibility modifiers
 * - Functions with various visibility and mutability specifiers
 * - Advanced data structures (structs, arrays, mappings, enums)
 * - Events and error handling
 * - Best practices and patterns
 */
contract SimpleStorage {
    
    /* ========================================
     * SOLIDITY DATA TYPES AND DEFAULT VALUES
     * ======================================== */
    
    /* 
     * BOOLEAN TYPE
     * - Can be true or false
     * - Default value: false
     * - 1 byte in size
     */
    bool public myBool; // Default: false
    bool public isActive = true; // Explicitly set to true
    
    /* 
     * INTEGER TYPES
     * Unsigned integers (uint) - only positive numbers and zero
     * Default value for all uint types: 0
     */
    uint8 public myUint8;     // 0 to 255, Default: 0
    uint16 public myUint16;   // 0 to 65,535, Default: 0
    uint32 public myUint32;   // 0 to 4,294,967,295, Default: 0
    uint64 public myUint64;   // 0 to 18,446,744,073,709,551,615, Default: 0
    uint128 public myUint128; // Very large range, Default: 0
    uint256 public myUint256; // Largest uint (same as uint), Default: 0
    uint public myUint;       // Same as uint256, Default: 0
    
    /* 
     * SIGNED INTEGER TYPES
     * Can store both positive and negative numbers
     * Default value for all int types: 0
     */
    int8 public myInt8;       // -128 to 127, Default: 0
    int16 public myInt16;     // -32,768 to 32,767, Default: 0
    int32 public myInt32;     // -2,147,483,648 to 2,147,483,647, Default: 0
    int64 public myInt64;     // Large negative to large positive, Default: 0
    int128 public myInt128;   // Very large range, Default: 0
    int256 public myInt256;   // Largest int (same as int), Default: 0
    int public myInt;         // Same as int256, Default: 0
    
    /* 
     * ADDRESS TYPES
     * - address: Can hold Ethereum addresses (20 bytes)
     * - address payable: Can receive Ether
     * - Default value: 0x0000000000000000000000000000000000000000
     */
    address public myAddress; // Default: 0x0000000000000000000000000000000000000000
    address payable public myPayableAddress; // Can receive Ether
    address public owner = msg.sender; // Set to contract deployer
    
    /* 
     * BYTE TYPES
     * Fixed-size byte arrays
     * Default value: all bytes are 0x00
     */
    bytes1 public myBytes1;   // 1 byte, Default: 0x00
    bytes8 public myBytes8;   // 8 bytes, Default: 0x0000000000000000
    bytes16 public myBytes16; // 16 bytes, Default: all zeros
    bytes32 public myBytes32; // 32 bytes (most common), Default: all zeros
    
    /* 
     * DYNAMIC TYPES
     * These types have variable length
     */
    string public myString;        // Default: "" (empty string)
    bytes public myDynamicBytes;   // Default: "" (empty bytes)
    uint256[] public myArray;      // Default: [] (empty array)
    
    /* 
     * MAIN STATE VARIABLE
     * This is our primary storage variable for demonstration
     */
    uint256 private favoriteNumber; // Default: 0
    
    
    /* ========================================
     * ADVANCED DATA STRUCTURES
     * ======================================== */
    
    /* 
     * ENUM - Custom type with predefined values
     * Default value: first element (PENDING = 0)
     */
    enum Status { PENDING, ACTIVE, INACTIVE, COMPLETED }
    Status public currentStatus; // Default: Status.PENDING (0)
    
    /* 
     * STRUCT - Custom data type grouping variables
     * Default: all fields have their default values
     */
    struct Person {
        string name;        // Default: ""
        uint256 age;        // Default: 0
        bool isActive;      // Default: false
        address wallet;     // Default: 0x00...00
    }
    
    /* 
     * MAPPINGS - Key-value storage
     * Default: accessing non-existent key returns default value
     */
    mapping(string => uint256) public nameToFavoriteNumber; // Default: 0 for any key
    mapping(address => Person) public addressToPerson;      // Default: Person with default values
    mapping(uint256 => bool) public numberExists;           // Default: false for any key
    
    /* 
     * ARRAYS - Collections of elements
     */
    Person[] public people; // Dynamic array of Person structs
    uint256[5] public fixedArray; // Fixed array of 5 uint256s, all default to 0
    
    
    /* ========================================
     * EVENTS - For logging and frontend communication
     * ======================================== */
    
    event NumberStored(uint256 indexed oldNumber, uint256 indexed newNumber, address indexed sender);
    event PersonAdded(string name, uint256 favoriteNumber, address indexed personAddress);
    event StatusChanged(Status indexed oldStatus, Status indexed newStatus);
    
    
    /* ========================================
     * CUSTOM ERRORS - Gas efficient error handling
     * ======================================== */
    
    error NumberTooLarge(uint256 provided, uint256 maximum);
    error UnauthorizedAccess(address caller, address required);
    error InvalidPersonData(string reason);
    
    
    /* ========================================
     * FUNCTION VISIBILITY SPECIFIERS
     * ======================================== */
    
    /* 
     * Solidity has four types of function visibility specifiers:
     * 
     * 1. PUBLIC
     *    - Can be called internally (within the contract) and externally (from outside)
     *    - Automatically creates a getter function for state variables
     *    - Most gas expensive for external calls due to copying to memory
     *    - Default visibility for functions if not specified
     * 
     * 2. EXTERNAL
     *    - Can ONLY be called from outside the contract (externally)
     *    - Cannot be called internally (use this.functionName() for internal calls)
     *    - More gas efficient than public for external calls (parameters stored in calldata)
     *    - Recommended for functions that should only be called externally
     * 
     * 3. INTERNAL
     *    - Can be called from within the contract and derived contracts (inheritance)
     *    - Cannot be called from outside the contract
     *    - Default visibility for state variables
     *    - Used for helper functions and contract-to-contract communication
     * 
     * 4. PRIVATE
     *    - Can ONLY be called from within the same contract
     *    - Cannot be accessed by derived contracts (inheritance)
     *    - Most restrictive visibility
     *    - Used for sensitive internal logic
     */
    
    // Example of each visibility type:
    
    /**
     * @dev PUBLIC function - accessible from anywhere
     * Can be called both internally and externally
     * More expensive for external calls due to memory copying
     */
    function publicFunction() public pure returns (string memory) {
        return "This is a public function - accessible from anywhere";
    }
    
    /**
     * @dev EXTERNAL function - only accessible from outside the contract
     * More gas efficient for external calls (uses calldata)
     * Cannot be called internally without this.functionName()
     */
    function externalFunction() external pure returns (string memory) {
        return "This is an external function - only callable from outside";
    }
    
    /**
     * @dev INTERNAL function - accessible within this contract and derived contracts
     * Cannot be called from outside the contract
     * Used for helper functions and inheritance
     */
    function internalFunction() internal pure returns (string memory) {
        return "This is an internal function - accessible within contract and derived contracts";
    }
    
    /**
     * @dev PRIVATE function - only accessible within this specific contract
     * Cannot be accessed by derived contracts
     * Most restrictive visibility
     */
    function privateFunction() private pure returns (string memory) {
        return "This is a private function - only accessible within this contract";
    }
    
    /**
     * @dev Function to demonstrate calling different visibility functions
     * Shows how visibility affects function accessibility
     */
    function demonstrateVisibility() public view returns (string memory, string memory, string memory) {
        // Can call public function internally
        string memory publicResult = publicFunction();
        
        // Can call internal function (same contract)
        string memory internalResult = internalFunction();
        
        // Can call private function (same contract)
        string memory privateResult = privateFunction();
        
        // Cannot call external function directly - would need this.externalFunction()
        // string memory externalResult = externalFunction(); // This would cause an error
        
        return (publicResult, internalResult, privateResult);
    }
    
    /**
     * @dev Example of calling external function from within contract
     * Demonstrates the use of 'this' keyword for external calls
     */
    function callExternalFunction() public view returns (string memory) {
        // Must use 'this' to call external function from within the contract
        return this.externalFunction();
    }
    
    /* 
     * BEST PRACTICES FOR FUNCTION VISIBILITY:
     * 
     * 1. Use EXTERNAL for functions that should only be called from outside
     *    - More gas efficient for external calls
     *    - Prevents accidental internal calls
     * 
     * 2. Use PUBLIC when you need both internal and external access
     *    - Common for main contract functions
     *    - Required for functions that need to be called both ways
     * 
     * 3. Use INTERNAL for helper functions and inheritance
     *    - Functions shared with derived contracts
     *    - Common utility functions
     * 
     * 4. Use PRIVATE for sensitive internal logic
     *    - Functions that should never be accessed outside current contract
     *    - Implementation details that shouldn't be inherited
     * 
     * 5. Always specify visibility explicitly for better code clarity
     *    - Avoid relying on default visibility
     *    - Makes contract interface clear to developers
     */
    
    // Examples of visibility in practice:
    
    // Internal helper function for validation
    function _validateInput(uint256 _value) internal pure returns (bool) {
        return _value > 0 && _value <= 1000000;
    }
    
    // Private function for complex calculations
    function _calculateComplexValue(uint256 _input) private pure returns (uint256) {
        // Some complex calculation logic
        return _input * 2 + 100;
    }
    
    // External function that uses internal validation
    function processValue(uint256 _value) external pure returns (uint256) {
        require(_validateInput(_value), "Invalid input value");
        return _value * 10;
    }
    
    // Public function that uses both internal and private functions
    function processComplexValue(uint256 _value) public pure returns (uint256) {
        require(_validateInput(_value), "Invalid input value");
        return _calculateComplexValue(_value);
    }
    

    /* ========================================
     * MODIFIERS - Reusable function logic
     * ======================================== */
    
    /* 
     * WHAT ARE MODIFIERS?
     * Modifiers are reusable pieces of code that can be attached to functions
     * to change their behavior. They are primarily used for:
     * 
     * 1. ACCESS CONTROL - Restricting who can call functions
     * 2. INPUT VALIDATION - Checking parameters before function execution
     * 3. STATE CHECKS - Verifying contract state before execution
     * 4. REENTRANCY PROTECTION - Preventing certain attack patterns
     * 5. TIMING RESTRICTIONS - Time-based access control
     * 
     * HOW MODIFIERS WORK:
     * - Code before the underscore (_) runs BEFORE the function
     * - The underscore (_) represents where the function body executes
     * - Code after the underscore (_) runs AFTER the function (if any)
     * - Multiple modifiers can be applied to a single function
     * - Modifiers are executed in the order they are listed
     */
    
    // STATE VARIABLES FOR MODIFIER DEMONSTRATIONS
    bool private locked = false;           // For reentrancy protection
    uint256 private deployTime;            // For time-based restrictions
    mapping(address => bool) private authorizedUsers; // For authorization
    uint256 private maxGasPrice = 20 gwei; // For gas price limits
    
    /* ========================================
     * BASIC MODIFIERS - Core Examples
     * ======================================== */
    
    /**
     * @dev ACCESS CONTROL MODIFIER
     * Restricts function access to contract owner only
     * This is the most common type of modifier
     */
    modifier onlyOwner() {
        // Code before _ runs BEFORE the function
        if (msg.sender != owner) {
            revert UnauthorizedAccess(msg.sender, owner);
        }
        _; // This is where the actual function code executes
        // Code after _ would run AFTER the function (none in this case)
    }
    
    /**
     * @dev INPUT VALIDATION MODIFIER
     * Validates input parameters before function execution
     * Can accept parameters just like functions
     */
    modifier validNumber(uint256 _number) {
        // Validate input before function execution
        if (_number > 1000000) {
            revert NumberTooLarge(_number, 1000000);
        }
        _; // Function executes here if validation passes
    }
    
    /**
     * @dev REENTRANCY PROTECTION MODIFIER
     * Prevents reentrancy attacks using a simple lock mechanism
     * Demonstrates before AND after execution logic
     */
    modifier nonReentrant() {
        // Check lock before function execution
        require(!locked, "Reentrancy protection: function is locked");
        
        // Set lock before function execution
        locked = true;
        
        _; // Function executes here
        
        // Remove lock after function execution
        locked = false;
    }
    
    /**
     * @dev AUTHORIZATION MODIFIER
     * Checks if caller is in authorized users list
     * Demonstrates mapping-based access control
     */
    modifier onlyAuthorized() {
        require(
            authorizedUsers[msg.sender] || msg.sender == owner,
            "Not authorized to call this function"
        );
        _;
    }
    
    /**
     * @dev TIME-BASED MODIFIER
     * Restricts function calls based on time conditions
     * Useful for time-locked functions or scheduled operations
     */
    modifier onlyAfterDeployment(uint256 _seconds) {
        require(
            block.timestamp >= deployTime + _seconds,
            "Function not available yet"
        );
        _;
    }
    
    /**
     * @dev GAS PRICE MODIFIER
     * Limits the gas price for function calls
     * Helps prevent front-running attacks
     */
    modifier gasPrice() {
        require(tx.gasprice <= maxGasPrice, "Gas price too high");
        _;
    }
    
    /**
     * @dev STATE VALIDATION MODIFIER
     * Checks contract state before allowing function execution
     * Ensures contract is in correct state
     */
    modifier onlyWhenActive() {
        require(currentStatus == Status.ACTIVE, "Contract is not active");
        _;
    }
    
    /**
     * @dev VALUE VALIDATION MODIFIER
     * Checks that exact Ether amount is sent with function call
     * Useful for payable functions requiring specific amounts
     */
    modifier exactValue(uint256 _requiredValue) {
        require(msg.value == _requiredValue, "Incorrect Ether amount sent");
        _;
    }
    
    /* ========================================
     * ADVANCED MODIFIERS - Complex Examples
     * ======================================== */
    
    /**
     * @dev CONDITIONAL MODIFIER
     * Only applies restriction under certain conditions
     * Demonstrates conditional modifier logic
     */
    modifier onlyOwnerWhenPaused() {
        if (currentStatus != Status.ACTIVE) {
            require(msg.sender == owner, "Only owner can call when paused");
        }
        _;
    }
    
    /**
     * @dev MULTI-PARAMETER MODIFIER
     * Accepts multiple parameters for complex validation
     * Shows how to use multiple inputs in modifier logic
     */
    modifier validateRange(uint256 _value, uint256 _min, uint256 _max) {
        require(_value >= _min && _value <= _max, "Value out of range");
        _;
    }
    
    /**
     * @dev MODIFIER WITH RETURN VALUE CHECK
     * Validates return values after function execution
     * Demonstrates post-execution validation
     */
    modifier mustReturnPositive() {
        _;
        // Note: In real implementations, you'd need to modify the function
        // to store return value in a state variable to check it here
        // This is a conceptual example
    }
    
    /* ========================================
     * MODIFIER UTILITY FUNCTIONS
     * ======================================== */
    
    /**
     * @dev Add authorized user (only owner)
     * Demonstrates modifier usage in state-changing functions
     */
    function addAuthorizedUser(address _user) external onlyOwner {
        authorizedUsers[_user] = true;
    }
    
    /**
     * @dev Remove authorized user (only owner)
     */
    function removeAuthorizedUser(address _user) external onlyOwner {
        authorizedUsers[_user] = false;
    }
    
    /**
     * @dev Set maximum gas price (only owner)
     */
    function setMaxGasPrice(uint256 _maxGasPrice) external onlyOwner {
        maxGasPrice = _maxGasPrice;
    }
    
    /* ========================================
     * FUNCTIONS DEMONSTRATING MODIFIER USAGE
     * ======================================== */
    
    /**
     * @dev Function with SINGLE modifier
     * Shows basic modifier application
     */
    function ownerOnlyFunction() external onlyOwner {
        // Only owner can call this function
        favoriteNumber = 999;
    }
    
    /**
     * @dev Function with MULTIPLE modifiers
     * Modifiers execute in order: validNumber -> onlyAuthorized -> nonReentrant
     * Demonstrates modifier stacking
     */
    function restrictedUpdate(uint256 _value) 
        external 
        validNumber(_value)     // First: validate input
        onlyAuthorized          // Second: check authorization
        nonReentrant           // Third: protect against reentrancy
    {
        favoriteNumber = _value;
    }
    
    /**
     * @dev Function with CONDITIONAL modifiers
     * Shows how modifiers can have different behaviors
     */
    function conditionalFunction(uint256 _value) 
        external 
        onlyOwnerWhenPaused
        validateRange(_value, 1, 100)
    {
        favoriteNumber = _value;
    }
    
    /**
     * @dev Function with TIME-BASED modifier
     * Can only be called 1 hour after deployment
     */
    function timeRestrictedFunction() 
        external 
        onlyAfterDeployment(3600) // 3600 seconds = 1 hour
        onlyOwner
    {
        favoriteNumber = block.timestamp;
    }
    
    /**
     * @dev Payable function with VALUE modifier
     * Requires exactly 0.1 ETH to be sent
     */
    function payableWithModifier() 
        external 
        payable 
        exactValue(0.1 ether)
        onlyWhenActive
    {
        // Function logic here
        favoriteNumber = msg.value;
    }
    
    /**
     * @dev Function with GAS PRICE modifier
     * Prevents high gas price transactions
     */
    function gasPriceRestrictedFunction(uint256 _value) 
        external 
        gasPrice
        validNumber(_value)
    {
        favoriteNumber = _value;
    }
    
    /* ========================================
     * HOW MODIFIERS AFFECT FUNCTION EXECUTION
     * ======================================== */
    
    /**
     * @dev Example showing modifier execution order
     * When this function is called:
     * 1. validNumber modifier checks _value <= 1000000
     * 2. onlyOwner modifier checks msg.sender == owner
     * 3. nonReentrant modifier sets locked = true
     * 4. Function body executes
     * 5. nonReentrant modifier sets locked = false
     * 
     * If any modifier fails, the entire transaction reverts
     */
    function demonstrateModifierOrder(uint256 _value)
        external
        validNumber(_value)    // Executes first
        onlyOwner             // Executes second  
        nonReentrant          // Executes third, unlocks after function
    {
        favoriteNumber = _value;
        // Function body executes here (between _ in nonReentrant)
    }
    
    /* ========================================
     * MODIFIER BEST PRACTICES
     * ======================================== */
    
    /*
     * BEST PRACTICES FOR MODIFIERS:
     * 
     * 1. SINGLE RESPONSIBILITY
     *    - Each modifier should have one clear purpose
     *    - Don't combine unrelated checks in one modifier
     * 
     * 2. CLEAR NAMING
     *    - Use descriptive names (onlyOwner, validInput, etc.)
     *    - Follow consistent naming conventions
     * 
     * 3. EFFICIENT ORDERING
     *    - Place cheaper checks first (gas optimization)
     *    - Put access control before expensive operations
     * 
     * 4. ERROR HANDLING
     *    - Use custom errors for gas efficiency
     *    - Provide clear error messages
     * 
     * 5. DOCUMENTATION
     *    - Document what each modifier does
     *    - Explain when and why to use them
     * 
     * 6. AVOID OVERUSE
     *    - Don't use modifiers for simple one-line checks
     *    - Consider inline checks for rarely used validations
     * 
     * 7. STATE MODIFICATIONS
     *    - Be careful with state changes in modifiers
     *    - Consider side effects and gas costs
     */
    
    
    /* ========================================
     * CONSTRUCTOR - Runs once when contract is deployed
     * ======================================== */
    
    constructor() {
        owner = msg.sender;
        currentStatus = Status.ACTIVE;
        favoriteNumber = 777; // Initial favorite number
        deployTime = block.timestamp; // Initialize deployment time for time-based modifiers
    }
    
    
    /* ========================================
     * VIEW FUNCTIONS - Read data without modifying state
     * These functions don't cost gas when called externally
     * ======================================== */
    
    /**
     * @dev Retrieve the stored favorite number
     * @return The stored uint256 value
     */
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
    
    /**
     * @dev Get person's favorite number by name
     * @param _name The person's name to look up
     * @return The favorite number associated with the name
     */
    function getFavoriteNumber(string memory _name) public view returns (uint256) {
        return nameToFavoriteNumber[_name];
    }
    
    /**
     * @dev Get person details by address
     * @param _address The person's address
     * @return Person struct with all details
     */
    function getPerson(address _address) public view returns (Person memory) {
        return addressToPerson[_address];
    }
    
    /**
     * @dev Get the number of people stored
     * @return The length of the people array
     */
    function getPeopleCount() public view returns (uint256) {
        return people.length;
    }
    
    /**
     * @dev Check all default values - useful for understanding defaults
     * @return All the default values as a tuple
     */
    function getDefaultValues() public view returns (
        bool, uint256, int256, address, bytes32, string memory
    ) {
        bool defaultBool;           // false
        uint256 defaultUint;        // 0
        int256 defaultInt;          // 0
        address defaultAddress;     // 0x0000000000000000000000000000000000000000
        bytes32 defaultBytes32;     // 0x0000000000000000000000000000000000000000000000000000000000000000
        string memory defaultString; // ""
        
        return (defaultBool, defaultUint, defaultInt, defaultAddress, defaultBytes32, defaultString);
    }
    
    
    /* ========================================
     * STATE-CHANGING FUNCTIONS
     * These functions modify blockchain state and cost gas
     * ======================================== */
    
    /**
     * @dev Store a number as the favorite number (with validation)
     * @param _favoriteNumber The number to store (must be <= 1,000,000)
     */
    function store(uint256 _favoriteNumber) public validNumber(_favoriteNumber) {
        uint256 oldNumber = favoriteNumber;
        favoriteNumber = _favoriteNumber;
        
        emit NumberStored(oldNumber, _favoriteNumber, msg.sender);
    }
    
    /**
     * @dev Add a person with their favorite number
     * @param _name Person's name (cannot be empty)
     * @param _favoriteNumber Their favorite number
     */
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        // Input validation
        if (bytes(_name).length == 0) {
            revert InvalidPersonData("Name cannot be empty");
        }
        
        // Create new person
        Person memory newPerson = Person({
            name: _name,
            age: 0, // Can be updated later
            isActive: true,
            wallet: msg.sender
        });
        
        // Store in multiple data structures
        people.push(newPerson);
        nameToFavoriteNumber[_name] = _favoriteNumber;
        addressToPerson[msg.sender] = newPerson;
        numberExists[_favoriteNumber] = true;
        
        emit PersonAdded(_name, _favoriteNumber, msg.sender);
    }
    
    /**
     * @dev Update person's age
     * @param _age New age to set
     */
    function updateAge(uint256 _age) public {
        addressToPerson[msg.sender].age = _age;
        
        // Also update in the people array (find and update)
        for (uint256 i = 0; i < people.length; i++) {
            if (people[i].wallet == msg.sender) {
                people[i].age = _age;
                break;
            }
        }
    }
    
    /**
     * @dev Change contract status (only owner)
     * @param _newStatus New status to set
     */
    function changeStatus(Status _newStatus) public onlyOwner {
        Status oldStatus = currentStatus;
        currentStatus = _newStatus;
        
        emit StatusChanged(oldStatus, _newStatus);
    }
    
    /**
     * @dev Demonstrate array operations
     */
    function demonstrateArrays() public {
        // Add elements to dynamic array
        myArray.push(100);
        myArray.push(200);
        myArray.push(300);
        
        // Modify fixed array
        fixedArray[0] = 10;
        fixedArray[1] = 20;
    }
    
    /**
     * @dev Reset favorite number to default (only owner)
     */
    function resetFavoriteNumber() public onlyOwner {
        uint256 oldNumber = favoriteNumber;
        favoriteNumber = 0; // Reset to default
        
        emit NumberStored(oldNumber, 0, msg.sender);
    }
    
    
    /* ========================================
     * PURE FUNCTIONS - Don't read or modify state
     * These are utility functions for calculations
     * ======================================== */
    
    /**
     * @dev Add two numbers (pure function example)
     * @param a First number
     * @param b Second number
     * @return Sum of a and b
     */
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
    
    /**
     * @dev Demonstrate type limits
     * @return Maximum values for different uint types
     */
    function getTypeLimits() public pure returns (uint8, uint16, uint32, uint256) {
        return (
            type(uint8).max,    // 255
            type(uint16).max,   // 65535
            type(uint32).max,   // 4294967295
            type(uint256).max   // 115792089237316195423570985008687907853269984665640564039457584007913129639935
        );
    }
    
    /**
     * @dev Demonstrate block global variables
     * @return Information about the current block
     */
    function getBlockInfo() public view returns (uint256, uint256, address) {
        return (
            block.timestamp,  // Current block timestamp
            block.number,     // Current block number
            block.coinbase    // Current block miner's address
        );
    }
}
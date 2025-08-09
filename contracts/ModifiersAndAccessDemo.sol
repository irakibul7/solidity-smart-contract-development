// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title ModifiersAndAccessDemo
/// @notice Demonstrates common modifiers and access control patterns
contract ModifiersAndAccessDemo {
    address public owner;

    bool private locked;
    uint256 private deployTime;
    mapping(address => bool) private authorizedUsers;
    uint256 private maxGasPrice = 20 gwei;

    enum Status { PENDING, ACTIVE, INACTIVE, COMPLETED }
    Status public currentStatus;

    error UnauthorizedAccess(address caller, address required);
    error NumberTooLarge(uint256 provided, uint256 maximum);

    constructor() {
        owner = msg.sender;
        currentStatus = Status.ACTIVE;
        deployTime = block.timestamp;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert UnauthorizedAccess(msg.sender, owner);
        _;
    }

    modifier validNumber(uint256 _number) {
        if (_number > 1_000_000) revert NumberTooLarge(_number, 1_000_000);
        _;
    }

    modifier nonReentrant() {
        require(!locked, "locked");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender] || msg.sender == owner, "not authorized");
        _;
    }

    modifier onlyAfterDeployment(uint256 _seconds) {
        require(block.timestamp >= deployTime + _seconds, "too early");
        _;
    }

    modifier gasPrice() {
        require(tx.gasprice <= maxGasPrice, "gas price too high");
        _;
    }

    modifier onlyWhenActive() {
        require(currentStatus == Status.ACTIVE, "not active");
        _;
    }

    function addAuthorizedUser(address _user) external onlyOwner {
        authorizedUsers[_user] = true;
    }

    function removeAuthorizedUser(address _user) external onlyOwner {
        authorizedUsers[_user] = false;
    }

    function setMaxGasPrice(uint256 _maxGasPrice) external onlyOwner {
        maxGasPrice = _maxGasPrice;
    }

    // Examples using modifiers
    uint256 private value;

    function restrictedUpdate(uint256 _value)
        external
        validNumber(_value)
        onlyAuthorized
        nonReentrant
    {
        value = _value;
    }

    function timeRestrictedFunction()
        external
        onlyAfterDeployment(3600)
        onlyOwner
    {
        value = block.timestamp;
    }

    function gasPriceRestrictedFunction(uint256 _value)
        external
        gasPrice
        validNumber(_value)
    {
        value = _value;
    }
}



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title DataTypesDemo
/// @notice Demonstrates basic Solidity value/reference types and default values
contract DataTypesDemo {
    // Booleans
    bool public myBool; // default: false
    bool public isActive = true;

    // Unsigned integers
    uint8 public myUint8; 
    uint16 public myUint16;
    uint32 public myUint32;
    uint64 public myUint64;
    uint128 public myUint128;
    uint256 public myUint256;
    uint public myUint;

    // Signed integers
    int8 public myInt8;
    int16 public myInt16;
    int32 public myInt32;
    int64 public myInt64;
    int128 public myInt128;
    int256 public myInt256;
    int public myInt;

    // Addresses
    address public myAddress;
    address payable public myPayableAddress;

    // Fixed-size bytes
    bytes1 public myBytes1;
    bytes8 public myBytes8;
    bytes16 public myBytes16;
    bytes32 public myBytes32;

    // Dynamic types
    string public myString;
    bytes public myDynamicBytes;
    uint256[] public myArray;

    // Fixed array example
    uint256[5] public fixedArray;

    function demonstrateArrays() external {
        myArray.push(100);
        myArray.push(200);
        fixedArray[0] = 10;
        fixedArray[1] = 20;
    }
}



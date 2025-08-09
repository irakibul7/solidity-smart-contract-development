// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title MathUtilsDemo
/// @notice Demonstrates pure/view utility functions
contract MathUtilsDemo {
    function add(uint256 a, uint256 b) external pure returns (uint256) {
        return a + b;
    }

    function getTypeLimits()
        external
        pure
        returns (uint8, uint16, uint32, uint256)
    {
        return (type(uint8).max, type(uint16).max, type(uint32).max, type(uint256).max);
    }

    function getBlockInfo()
        external
        view
        returns (uint256, uint256, address)
    {
        return (block.timestamp, block.number, block.coinbase);
    }
}



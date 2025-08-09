// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title FunctionsVisibilityDemo
/// @notice Demonstrates function visibility: public, external, internal, private
contract FunctionsVisibilityDemo {
    function publicFunction() public pure returns (string memory) {
        return "public";
    }

    function externalFunction() external pure returns (string memory) {
        return "external";
    }

    function internalFunction() internal pure returns (string memory) {
        return "internal";
    }

    function privateFunction() private pure returns (string memory) {
        return "private";
    }

    function demonstrateVisibility()
        external
        view
        returns (string memory, string memory, string memory)
    {
        string memory a = publicFunction();
        string memory b = internalFunction();
        string memory c = privateFunction();
        return (a, b, c);
    }

    function callExternalFunction() external view returns (string memory) {
        return this.externalFunction();
    }
}



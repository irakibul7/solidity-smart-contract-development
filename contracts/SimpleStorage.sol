// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title SimpleStorage
/// @notice Minimal, focused storage contract used by scripts/tests
contract SimpleStorage {
    // Core storage
    uint256 private favoriteNumber; // defaults to 0

    // People storage kept intentionally simple for beginners
    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    Person[] private people;
    mapping(string => uint256) public nameToFavoriteNumber;

    // Core API
    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // People API
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(Person({favoriteNumber: _favoriteNumber, name: _name}));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    function getPeopleCount() public view returns (uint256) {
        return people.length;
    }

    function getPerson(uint256 index) public view returns (uint256, string memory) {
        if (index >= people.length) revert("Index out of bounds");
        Person memory p = people[index];
        return (p.favoriteNumber, p.name);
    }
}
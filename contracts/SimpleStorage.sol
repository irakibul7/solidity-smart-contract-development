// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title SimpleStorage
/// @notice Minimal, focused storage contract used by scripts/tests
contract SimpleStorage {
    // Core storage
    uint256 public favoriteNumber; // defaults to 0

    // People storage kept intentionally simple for beginners
    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    Person[] public listOfPeople;
    mapping(string => uint256) public nameToFavoriteNumber;

    // Core API
    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // People API
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        listOfPeople.push(Person(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    // Convenience getters for tests/scripts
    function getPeopleCount() public view returns (uint256) {
        return listOfPeople.length;
    }

    function getPerson(uint256 index) public view returns (uint256, string memory) {
        if (index >= listOfPeople.length) {
            revert("Index out of bounds");
        }
        Person storage person = listOfPeople[index];
        return (person.favoriteNumber, person.name);
    }
}
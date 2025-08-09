// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title StructsAndMappingsDemo
/// @notice Demonstrates structs, arrays, mappings, and simple CRUD
contract StructsAndMappingsDemo {
    struct Person {
        string name;
        uint256 age;
        bool isActive;
        address wallet;
    }

    Person[] private people;

    mapping(string => uint256) public nameToFavoriteNumber;
    mapping(address => Person) public addressToPerson;
    mapping(uint256 => bool) public numberExists;

    event PersonAdded(string name, uint256 favoriteNumber, address indexed personAddress);

    error InvalidPersonData(string reason);

    function addPerson(string memory _name, uint256 _favoriteNumber) external {
        if (bytes(_name).length == 0) revert InvalidPersonData("Name cannot be empty");

        Person memory newPerson = Person({
            name: _name,
            age: 0,
            isActive: true,
            wallet: msg.sender
        });

        people.push(newPerson);
        nameToFavoriteNumber[_name] = _favoriteNumber;
        addressToPerson[msg.sender] = newPerson;
        numberExists[_favoriteNumber] = true;

        emit PersonAdded(_name, _favoriteNumber, msg.sender);
    }

    function updateAge(uint256 _age) external {
        addressToPerson[msg.sender].age = _age;
        for (uint256 i = 0; i < people.length; i++) {
            if (people[i].wallet == msg.sender) {
                people[i].age = _age;
                break;
            }
        }
    }

    function getPeopleCount() external view returns (uint256) {
        return people.length;
    }
}



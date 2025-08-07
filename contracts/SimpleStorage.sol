// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SimpleStorage
 * @dev A simple contract for storing and retrieving a number
 * This is a basic contract for learning Solidity fundamentals
 */
contract SimpleStorage {
    // State variable to store a number
    uint256 private favoriteNumber;
    
    // Array to store people with their favorite numbers
    Person[] public people;
    
    // Mapping to associate names with favorite numbers
    mapping(string => uint256) public nameToFavoriteNumber;
    
    // Struct to represent a person
    struct Person {
        uint256 favoriteNumber;
        string name;
    }
    
    /**
     * @dev Store a number as the favorite number
     * @param _favoriteNumber The number to store
     */
    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }
    
    /**
     * @dev Retrieve the stored favorite number
     * @return The stored favorite number
     */
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
    
    /**
     * @dev Add a person with their favorite number
     * @param _name The person's name
     * @param _favoriteNumber The person's favorite number
     */
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(Person(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
    
    /**
     * @dev Get the total number of people stored
     * @return The number of people in the array
     */
    function getPeopleCount() public view returns (uint256) {
        return people.length;
    }
    
    /**
     * @dev Get a person by index
     * @param _index The index of the person in the array
     * @return The person's favorite number and name
     */
    function getPerson(uint256 _index) public view returns (uint256, string memory) {
        require(_index < people.length, "Index out of bounds");
        Person storage person = people[_index];
        return (person.favoriteNumber, person.name);
    }
}
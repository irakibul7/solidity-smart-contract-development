// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract FundMe {
    function fund() public payable {
        require(msg.value > 1 ether, "You need to send at least 1 ETH");
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] private storageDeck;

    function createStorage() public {
        storageDeck.push(new SimpleStorage());
    }

    function sfstore(uint256 index, uint256 num) public {
        SimpleStorage askedContract = storageDeck[index];
        askedContract.store(num);
    }

    function sfGet(uint256 index) public view returns(uint256){
        SimpleStorage askedContract = storageDeck[index];
        return askedContract.getData();
    }

}
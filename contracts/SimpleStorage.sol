//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 private favouriteNum;

    function store(uint256 _favNum) public {
        favouriteNum = _favNum;
    }

    function getData() public view returns(uint256){
        return favouriteNum;
    }
}
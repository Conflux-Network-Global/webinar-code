pragma solidity ^0.6.0;

contract Demo {
    uint256 public value;

    constructor() public {
        value = 10;
    }

    function setValue(uint256 _value) external {
        value = _value;
    }
}

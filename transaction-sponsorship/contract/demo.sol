pragma solidity ^0.6.0;

import "https://github.com/Conflux-Chain/conflux-rust/blob/master/internal_contract/contracts/SponsorWhitelistControl.sol";

contract Demo {
    uint256 public value;

    constructor() public {
        //setup contract so gas sponsored for anyone
        SponsorWhitelistControl cpc = SponsorWhitelistControl(0x0888000000000000000000000000000000000001);
        address[] memory a = new address[](1);
        a[0] = address(0);
        cpc.add_privilege(a);
    }

    function setValue(uint256 _value) external {
        value = _value;
    }
}

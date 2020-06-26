pragma solidity ^0.6.0;

import "https://github.com/Conflux-Chain/conflux-rust/blob/master/internal_contract/contracts/SponsorWhitelistControl.sol";

contract Demo {
    uint256 public value;

    constructor() public {
        //setup contract so gas sponsored for anyone
        SponsorWhitelistControl cpc = SponsorWhitelistControl(0x8ad036480160591706c831f0DA19D1a424e39469);
        address[] memory a = new address[](1);
        a[0] = address(0);
        cpc.add_privilege(a);
    }

    function setValue(uint256 _value) external {
        value = _value;
    }
}

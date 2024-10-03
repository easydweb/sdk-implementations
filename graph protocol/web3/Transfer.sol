// SPDX-License-Identifier: UNLICENSED
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Transfer{

    event TransferEvent(address from, address to, uint amount);

    event ChangeNameEvent(string name);

    string public name="SID";

    uint public id=1;

    function transfer(address payable to) public payable{
        to.transfer(msg.value);
        emit TransferEvent(msg.sender, to, msg.value);
        }

    function changeName(string calldata _name) public{
        name = _name;
        emit ChangeNameEvent(_name);
        }

    function changeId(string calldata _name) public{ 
        name = _name;
    }

    // Block ARB : 85733735
    // Address ARB : 0xdeef88ee36e885e2a75b0ec592b8bb9460e2152b
}
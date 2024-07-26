// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract Example {
    uint public num;

    event NumChanged(uint);

    function changeNum(uint _num) external {
        num = _num;
        emit NumChanged(_num);
    }
}

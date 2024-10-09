// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract TransferTokens {
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        string _name,
        string _blockchain
    );

    function transferEther(
        address payable _to,
        string memory _name,
        string memory _blockchain
    ) external payable {
        require(_to != address(0), "Invalid recipient address");
        payable(_to).transfer(msg.value);
        emit Transfer(msg.sender, _to, msg.value, _name, _blockchain);
    }

    function check() public pure returns (string memory) {
        return "Jash Doshi";
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

contract GenericFactory_shanghai
{
	event NewContract(address indexed addr);

	function predictAddress(bytes memory _code, bytes32 _salt)
	public view returns(address)
	{
		return predictAddressWithCall(_code, _salt, bytes(""));
	}

	function createContract(bytes memory _code, bytes32 _salt)
	public returns(address)
	{
		return createContractAndCall(_code, _salt, bytes(""));
	}

	function predictAddressWithCall(bytes memory _code, bytes32 _salt, bytes memory _call)
	public view returns(address)
	{
		return Create2.computeAddress(keccak256(abi.encodePacked(_salt, _call)), keccak256(_code));
	}

	function createContractAndCall(bytes memory _code, bytes32 _salt, bytes memory _call)
	public returns(address)
	{
		address addr = Create2.deploy(0, keccak256(abi.encodePacked(_salt, _call)), _code);
		emit NewContract(addr);
		if (_call.length > 0)
		{
			Address.functionCall(addr, _call);
		}
		return addr;
	}
}

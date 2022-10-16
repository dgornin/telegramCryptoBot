// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;


contract NoteConnector {
    mapping(address => address) public ownerToNote;

    modifier onlyNewRecords() {
        require(ownerToNote[msg.sender] == address(0), "You already have created note");
        _;
    }

    function createNote(string memory _note) public onlyNewRecords {
        Note note = new Note(msg.sender, _note);
        ownerToNote[msg.sender] = address(note);
    }
}

contract Note{
    address public owner;
    string public note;

    constructor(address _owner, string memory _note){
        owner = _owner;
        note = _note;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not an owner of this note");
        _;
    }

    function setNote(string memory _note) public onlyOwner {
        note = _note;
    }
}

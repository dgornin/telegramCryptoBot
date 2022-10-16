import { ethers } from "ethers";
import provider from "./provider";

const address = "0xF98Ca04B59b794EDf62dd76bDD9c44256bA99AD8";

const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_note",
          "type": "string"
        }
      ],
      "name": "createNote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "ownerToNote",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

const NoteConnector = new ethers.Contract(address, abi, provider);
export default NoteConnector;

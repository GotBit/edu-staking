/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Merkle, MerkleInterface } from "../Merkle";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "leaf",
        type: "bytes32",
      },
    ],
    name: "verify",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610663806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80635a9a49c714610030575b600080fd5b61004a6004803603810190610045919061049f565b610060565b6040516100579190610529565b60405180910390f35b600061008e7fa0899e7e2f091081d22b55464d932d781ab9aacaf6d1b1b4ab812918a652cce260001b6102f9565b6100ba7fcd2c5c9c0617fc8fe8df2e1aeae909c0e9bd440218ba6cb8503d09c14d333a1360001b6102f9565b6100e67fc6e4d15ce33c72820138ecc5f2355634d87b881e6d7f3160e31908c084ece3f960001b6102f9565b60008290506101177f99af21047b7e94bc6852cef1a30ba27c8e8cf6c53d20181eb4ff82d591a6844f60001b6102f9565b6101437f1180f1b6c53f136f5ce3b901c7681ce4b413579044c9b691ef7d0d618894107060001b6102f9565b60005b85518110156102935761017b7f4e34f02aa397427e715a8877884e0f0efcf98f03d0ab02fb53e64896b2a3d6f460001b6102f9565b6101a77f7eb954556d25f701197e79bfb5df656eb2fb8a5564b20e77e5e5a1ea543ea3a660001b6102f9565b60008682815181106101bc576101bb610544565b5b602002602001015190506101f27fc4128fe09cbab50a7244d751709b40b894b67349012d93e3b3bd477dc21f5d0e60001b6102f9565b61021e7fdf04a3c403c4e9e20427a83b4beba1119b8637f51a790c92d8ff359de6e7cba360001b6102f9565b808310610253578083604051602001610238929190610582565b6040516020818303038152906040528051906020012061027d565b8281604051602001610266929190610582565b604051602081830303815290604052805190602001205b925050808061028b906105e4565b915050610146565b506102c07f8a23a21ff88f4f05237482a77afaf0bc0f7b91ce8706730e9a1222188256bf7e60001b6102f9565b6102ec7f7a594641cfc75d9951e3ce5e5295d24191c7f4d87da60c207b2a3a27bcfe4cf460001b6102f9565b8381149150509392505050565b50565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61035e82610315565b810181811067ffffffffffffffff8211171561037d5761037c610326565b5b80604052505050565b60006103906102fc565b905061039c8282610355565b919050565b600067ffffffffffffffff8211156103bc576103bb610326565b5b602082029050602081019050919050565b600080fd5b6000819050919050565b6103e5816103d2565b81146103f057600080fd5b50565b600081359050610402816103dc565b92915050565b600061041b610416846103a1565b610386565b9050808382526020820190506020840283018581111561043e5761043d6103cd565b5b835b81811015610467578061045388826103f3565b845260208401935050602081019050610440565b5050509392505050565b600082601f83011261048657610485610310565b5b8135610496848260208601610408565b91505092915050565b6000806000606084860312156104b8576104b7610306565b5b600084013567ffffffffffffffff8111156104d6576104d561030b565b5b6104e286828701610471565b93505060206104f3868287016103f3565b9250506040610504868287016103f3565b9150509250925092565b60008115159050919050565b6105238161050e565b82525050565b600060208201905061053e600083018461051a565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b61057c816103d2565b82525050565b60006040820190506105976000830185610573565b6105a46020830184610573565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000819050919050565b60006105ef826105da565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610622576106216105ab565b5b60018201905091905056fea264697066735822122006f6126b3e25c756c82a1e21392ec6868abd7051a42a4a84fdc2efbb8c77c18e64736f6c634300080b0033";

export class Merkle__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Merkle> {
    return super.deploy(overrides || {}) as Promise<Merkle>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Merkle {
    return super.attach(address) as Merkle;
  }
  connect(signer: Signer): Merkle__factory {
    return super.connect(signer) as Merkle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MerkleInterface {
    return new utils.Interface(_abi) as MerkleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Merkle {
    return new Contract(address, _abi, signerOrProvider) as Merkle;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ChainlinkHelperInterface extends ethers.utils.Interface {
  functions: {
    "fee()": FunctionFragment;
    "feeETH()": FunctionFragment;
    "keyHash()": FunctionFragment;
    "rawFulfillRandomness(bytes32,uint256)": FunctionFragment;
    "router()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "fee", values?: undefined): string;
  encodeFunctionData(functionFragment: "feeETH", values?: undefined): string;
  encodeFunctionData(functionFragment: "keyHash", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rawFulfillRandomness",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "router", values?: undefined): string;

  decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "keyHash", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rawFulfillRandomness",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "router", data: BytesLike): Result;

  events: {
    "Fulfilled(uint256,bytes32)": EventFragment;
    "LinkSwaped(uint256,address,uint256,uint256,address,address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Fulfilled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LinkSwaped"): EventFragment;
}

export type FulfilledEvent = TypedEvent<
  [BigNumber, string] & { timestamp: BigNumber; requestId: string }
>;

export type LinkSwapedEvent = TypedEvent<
  [
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    timestamp: BigNumber;
    user: string;
    amountProvided: BigNumber;
    spinCost: BigNumber;
    addressIn: string;
    addressOut: string;
    amountIn: BigNumber;
    amountOut: BigNumber;
  }
>;

export class ChainlinkHelper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ChainlinkHelperInterface;

  functions: {
    fee(overrides?: CallOverrides): Promise<[BigNumber]>;

    feeETH(overrides?: CallOverrides): Promise<[BigNumber]>;

    keyHash(overrides?: CallOverrides): Promise<[string]>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    router(overrides?: CallOverrides): Promise<[string]>;
  };

  fee(overrides?: CallOverrides): Promise<BigNumber>;

  feeETH(overrides?: CallOverrides): Promise<BigNumber>;

  keyHash(overrides?: CallOverrides): Promise<string>;

  rawFulfillRandomness(
    requestId: BytesLike,
    randomness: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  router(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    fee(overrides?: CallOverrides): Promise<BigNumber>;

    feeETH(overrides?: CallOverrides): Promise<BigNumber>;

    keyHash(overrides?: CallOverrides): Promise<string>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    router(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Fulfilled(uint256,bytes32)"(
      timestamp?: BigNumberish | null,
      requestId?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { timestamp: BigNumber; requestId: string }
    >;

    Fulfilled(
      timestamp?: BigNumberish | null,
      requestId?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { timestamp: BigNumber; requestId: string }
    >;

    "LinkSwaped(uint256,address,uint256,uint256,address,address,uint256,uint256)"(
      timestamp?: BigNumberish | null,
      user?: string | null,
      amountProvided?: null,
      spinCost?: null,
      addressIn?: null,
      addressOut?: null,
      amountIn?: null,
      amountOut?: null
    ): TypedEventFilter<
      [
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        string,
        string,
        BigNumber,
        BigNumber
      ],
      {
        timestamp: BigNumber;
        user: string;
        amountProvided: BigNumber;
        spinCost: BigNumber;
        addressIn: string;
        addressOut: string;
        amountIn: BigNumber;
        amountOut: BigNumber;
      }
    >;

    LinkSwaped(
      timestamp?: BigNumberish | null,
      user?: string | null,
      amountProvided?: null,
      spinCost?: null,
      addressIn?: null,
      addressOut?: null,
      amountIn?: null,
      amountOut?: null
    ): TypedEventFilter<
      [
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        string,
        string,
        BigNumber,
        BigNumber
      ],
      {
        timestamp: BigNumber;
        user: string;
        amountProvided: BigNumber;
        spinCost: BigNumber;
        addressIn: string;
        addressOut: string;
        amountIn: BigNumber;
        amountOut: BigNumber;
      }
    >;
  };

  estimateGas: {
    fee(overrides?: CallOverrides): Promise<BigNumber>;

    feeETH(overrides?: CallOverrides): Promise<BigNumber>;

    keyHash(overrides?: CallOverrides): Promise<BigNumber>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    router(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    keyHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    router(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

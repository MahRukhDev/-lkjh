import { Percent } from '@pancakeswap/swap-sdk-core'

export enum ChainId {
  DEVNET = 32,
  TESTNET = 2,
}

const SWAP_MODULE_NAME = 'swap' as const
export const SWAP_ADDRESS = '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0' as const
export const SWAP_RESOURCE_ADDRESS = '0x72131a2ed362f7874bb7eceb0dbce48017f58224b18a3e9c262522b859ae1788' as const
export const SWAP_TYPE_TAG = `${SWAP_ADDRESS}::${SWAP_MODULE_NAME}` as const

export const PAIR_RESERVE_TYPE_TAG = `${SWAP_ADDRESS}::swap::TokenPairReserve` as const
export const PAIR_LP_TYPE_TAG = `${SWAP_RESOURCE_ADDRESS}::storage::LPToken` as const

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

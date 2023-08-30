import { ChainId } from '@pancakeswap/sdk'

export const DEFAULT_GAS_LIMIT = 25000000n

export const DEFAULT_GAS_LIMIT_BY_CHAIN: { [key in ChainId]?: bigint } = {
  [ChainId.BSC]: 150000000n,
}

export const DEFAULT_GAS_BUFFER = 3000000n

export const DEFAULT_GAS_BUFFER_BY_CHAIN: { [key in ChainId]?: bigint } = {
  [ChainId.BSC]: DEFAULT_GAS_BUFFER,
}

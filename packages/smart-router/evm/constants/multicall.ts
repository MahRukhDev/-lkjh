import { ChainId } from '@pancakeswap/sdk'

import { ChainMap, BatchMulticallConfigs } from '../types'

export const BATCH_MULTICALL_CONFIGS: ChainMap<BatchMulticallConfigs> = {
  [ChainId.BSC_TESTNET]: {
    defaultConfig: {
      multicallChunk: 150,
      gasLimitOverride: 1_000_000,
    },
    gasErrorFailureOverride: {
      gasLimitOverride: 1_000_000,
      multicallChunk: 30,
    },
    successRateFailureOverrides: {
      gasLimitOverride: 1_000_000,
      multicallChunk: 50,
    },
  },
  [ChainId.BSC]: {
    defaultConfig: {
      multicallChunk: 200,
      gasLimitOverride: 1_000_000,
    },
    gasErrorFailureOverride: {
      gasLimitOverride: 1_400_000,
      multicallChunk: 100,
    },
    successRateFailureOverrides: {
      gasLimitOverride: 1_200_000,
      multicallChunk: 110,
    },
  },
  [ChainId.ETHEREUM]: {
    defaultConfig: {
      multicallChunk: 150,
      gasLimitOverride: 1_000_000,
    },
    gasErrorFailureOverride: {
      gasLimitOverride: 1_000_000,
      multicallChunk: 30,
    },
    successRateFailureOverrides: {
      gasLimitOverride: 1_000_000,
      multicallChunk: 40,
    },
  },
  [ChainId.GOERLI]: {
    defaultConfig: {
      multicallChunk: 150,
      gasLimitOverride: 1_000_000,
    },
    gasErrorFailureOverride: {
      gasLimitOverride: 1_000_000,
      multicallChunk: 30,
    },
    successRateFailureOverrides: {
      gasLimitOverride: 1_000_000,
      multicallChunk: 40,
    },
  },
}

import { formatUnits } from '@ethersproject/units'
import { APTOS_COIN } from 'aptos'
import { fetchCoin } from '../coins/coin'
import { wrapCoinStoreTypeTag } from '../coins/coinStore'
import { getProvider } from '../provider'

export type FetchBalanceArgs = {
  /** Address or ANS name */
  address: string
  /** Chain id to use for provider */
  networkName?: string
  /** resource type */
  coin?: string
}

export type FetchBalanceResult = {
  decimals: number
  formatted: string
  symbol: string
  value: string
}

export async function fetchBalance({ address, networkName, coin }: FetchBalanceArgs): Promise<FetchBalanceResult> {
  const provider = getProvider({ networkName })

  const resource = await provider.getAccountResource(address, wrapCoinStoreTypeTag(coin || APTOS_COIN))

  const { value } = (resource.data as any).coin

  const { decimals, symbol } = await fetchCoin({ networkName, coin })

  return {
    decimals,
    symbol,
    formatted: formatUnits(value ?? '0', decimals),
    value,
  }
}

import { Currency } from '@pancakeswap/swap-sdk-core'
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { ONRAMP_API_BASE_URL } from 'config/constants/endpoints'
import qs from 'qs'
import { isNativeBtc } from '../constants'
import { createQueryKey, Evaluate, UseQueryParameters } from '../types'

export enum BtcNetwork {
  mainnet = 'mainnet',
  testnet = 'testnet',
  regtest = 'regtest',
}

export const GetBtcValidationQueryKey = createQueryKey<'onramp-limits', [GetBtcValidationParameters]>('onramp-limits')

type GetBtcValidationQueryKey = ReturnType<typeof GetBtcValidationQueryKey>

export type GetBtcAddrValidationReturnType = { code: number; result: boolean; error: boolean }

export type GetBtcValidationParameters = {
  address: string | undefined
  network: keyof typeof BtcNetwork | undefined
}

export type useBtcAddressValidatorParameters<selectData = GetBtcAddrValidationReturnType> = Evaluate<
  GetBtcValidationParameters &
    UseQueryParameters<Evaluate<GetBtcAddrValidationReturnType>, Error, selectData, GetBtcValidationQueryKey>
>

export type useBtcAddressValidatorReturnType<selectData = GetBtcAddrValidationReturnType> = UseQueryResult<
  selectData,
  Error
>

export const useBtcAddressValidator = <selectData = GetBtcAddrValidationReturnType>(
  parameters: useBtcAddressValidatorParameters<selectData> & { currency: Currency | undefined },
): useBtcAddressValidatorReturnType<selectData> => {
  const { address, network, currency, ...query } = parameters

  const isBtc = isNativeBtc(currency)
  const enabled = Boolean(address && address !== '' && network && isBtc)

  return useQuery({
    ...query,
    queryKey: GetBtcValidationQueryKey([
      {
        address,
        network,
      },
    ]),
    queryFn: async ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { address, network } = queryKey[1]

      if (!address || !network) {
        throw new Error('Invalid parameters')
      }
      const btcValidationResponse = await fetchBtcAddressValidationRes({
        address,
        network,
      })
      return btcValidationResponse
    },
    ...query,
    enabled,
  })
}

async function fetchBtcAddressValidationRes(
  payload: GetBtcValidationParameters,
): Promise<GetBtcAddrValidationReturnType> {
  const response = await fetch(
    `${ONRAMP_API_BASE_URL}/validate-btc-address?${qs.stringify({
      ...payload,
    })}`,
  )
  const result = await response.json()
  return result.result
}

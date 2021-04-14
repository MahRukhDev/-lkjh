import React from 'react'
import { Text, Flex, Box } from '@pancakeswap-libs/uikit'
import { PublicIfoData, PoolIds } from 'hooks/ifo/v2/types'
import useI18n from 'hooks/useI18n'
import { Ifo } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { useGetApiPrice } from 'state/hooks'
import { SkeletonCardDetails } from './Skeletons'

export interface IfoCardDetailsProps {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
}

export interface FooterEntryProps {
  label: string
  value: string | number
}

const FooterEntry: React.FC<FooterEntryProps> = ({ label, value }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text small color="textSubtle">
        {label}
      </Text>
      <Text small textAlign="right">
        {value}
      </Text>
    </Flex>
  )
}

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({ poolId, ifo, publicIfoData }) => {
  const TranslateString = useI18n()
  const { status } = publicIfoData
  const poolCharacteristic = publicIfoData[poolId]
  const tokenPriceUsd = useGetApiPrice(ifo.token.symbol)

  /* Format start */
  const maxLpTokens = getBalanceNumber(poolCharacteristic.limitPerUserInLP, ifo.currency.decimals)
  const tokenPriceFormatted = tokenPriceUsd
    ? `$${tokenPriceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '?'
  const taxRate = `${poolCharacteristic.taxRate}%`

  const totalCommittedPercent = poolCharacteristic.totalAmountPool
    .div(poolCharacteristic.raisingAmountPool)
    .times(100)
    .toFixed(2)
  const totalLPCommitted = getBalanceNumber(poolCharacteristic.totalAmountPool, ifo.currency.decimals)
  const totalCommitted = `${totalLPCommitted.toFixed(2)} (${totalCommittedPercent}%)`
  /* Format end */

  const renderBasedOnIfoSttatus = () => {
    if (status === 'coming_soon') {
      return (
        <>
          {poolId === PoolIds.poolBasic && (
            <FooterEntry label={TranslateString(999, 'Max. LP token entry')} value={maxLpTokens} />
          )}
          <FooterEntry label={TranslateString(999, 'Funds to raise:')} value={ifo.raiseAmount} />
          <FooterEntry label={TranslateString(999, 'CAKE to burn:')} value={ifo.cakeToBurn} />
          <FooterEntry label={`Price per ${ifo.token.symbol}: `} value={tokenPriceFormatted} />
        </>
      )
    }
    if (status === 'live') {
      return (
        <>
          {poolId === PoolIds.poolBasic && (
            <FooterEntry label={TranslateString(999, 'Max. LP token entry')} value={maxLpTokens} />
          )}
          {poolId === PoolIds.poolUnlimited && (
            <FooterEntry label={TranslateString(999, 'Additional fee:')} value={taxRate} />
          )}
          <FooterEntry label={TranslateString(999, 'Total committed:')} value={totalCommitted} />
        </>
      )
    }
    if (status === 'finished') {
      return (
        <>
          {poolId === PoolIds.poolBasic && (
            <FooterEntry label={TranslateString(999, 'Max. LP token entry')} value={maxLpTokens} />
          )}
          {poolId === PoolIds.poolUnlimited && (
            <FooterEntry label={TranslateString(999, 'Additional fee:')} value={taxRate} />
          )}
          <FooterEntry label={TranslateString(999, 'Total committed:')} value={totalCommitted} />
          <FooterEntry label={TranslateString(999, 'Funds raised:')} value="??" />
          <FooterEntry label={TranslateString(999, 'CAKE burned:')} value={ifo.cakeToBurn} />
          <FooterEntry label={`Price per ${ifo.token.symbol}: `} value={tokenPriceFormatted} />
        </>
      )
    }
    return <SkeletonCardDetails />
  }

  return <Box paddingTop="24px">{renderBasedOnIfoSttatus()}</Box>
}

export default IfoCardDetails

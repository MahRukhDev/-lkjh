import React from 'react'
import { Flex, Text } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import useWithdrawalFeeTimer from 'hooks/cakeVault/useWithdrawalFeeTimer'
import WithdrawalFeeTimer from './WithdrawalFeeTimer'

interface UnstakingFeeCountdownRowProps {
  account?: string
  withdrawalFee: string
  lastDepositedTime: string
  withdrawalFeePeriod?: string
}

const UnstakingFeeCountdownRow: React.FC<UnstakingFeeCountdownRowProps> = ({
  account = true,
  withdrawalFee,
  lastDepositedTime,
  withdrawalFeePeriod = '259200',
}) => {
  const TranslateString = useI18n()
  const { secondsRemaining, hasPerformanceFee } = useWithdrawalFeeTimer(
    parseInt(lastDepositedTime, 10),
    parseInt(withdrawalFeePeriod, 10),
  )
  // TODO: @HUTCH please rename the "account" prop above to something else. We use "account" everywhere in
  // the app to refer to the connected wallet address
  const { account: walletAddress } = useWeb3React()

  const shouldShowTimer = account && lastDepositedTime && hasPerformanceFee && walletAddress

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">
        {parseInt(withdrawalFee) / 100 || '-'}%{' '}
        {shouldShowTimer
          ? TranslateString(999, 'unstaking fee until')
          : TranslateString(999, 'unstaking fee if withdrawn within 72h')}
      </Text>
      {shouldShowTimer && <WithdrawalFeeTimer secondsRemaining={secondsRemaining} />}
    </Flex>
  )
}

export default UnstakingFeeCountdownRow

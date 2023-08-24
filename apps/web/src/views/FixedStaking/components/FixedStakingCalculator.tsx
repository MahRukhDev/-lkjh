import { useTranslation } from '@pancakeswap/localization'
import {
  ModalV2,
  useModalV2,
  Box,
  PreTitle,
  IconButton,
  CalculateIcon,
  RoiCard,
  CalculatorMode,
  Flex,
} from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import toNumber from 'lodash/toNumber'
import { useMemo } from 'react'
import StyledButton from '@pancakeswap/uikit/src/components/Button/StyledButton'

import { FixedStakingPool } from '../type'
import FixedStakingOverview from './FixedStakingOverview'
import { StakingModalTemplate } from './StakingModalTemplate'

export function FixedStakingCalculator({
  stakingToken,
  pools,
  initialLockPeriod,
  hideBackButton,
  isBoost,
}: {
  stakingToken: Token
  pools: FixedStakingPool[]
  initialLockPeriod: number
  hideBackButton?: boolean
  isBoost?: boolean
}) {
  const stakedPeriods = useMemo(() => pools.map((p) => p.lockPeriod), [pools])

  const { t } = useTranslation()
  const stakeModal = useModalV2()

  return (
    <>
      <IconButton
        height="24px"
        variant="text"
        scale="sm"
        onClick={(e) => {
          e.stopPropagation()
          stakeModal.onOpen()
        }}
      >
        <CalculateIcon color="textSubtle" ml="0.25em" width="24px" />
      </IconButton>
      <ModalV2
        {...stakeModal}
        onDismiss={() => {
          stakeModal.onDismiss()
        }}
        closeOnOverlayClick
      >
        <StakingModalTemplate
          title={t('ROI Calculator')}
          onBack={hideBackButton ? null : () => stakeModal.onDismiss()}
          hideStakeButton
          stakingToken={stakingToken}
          pools={pools}
          initialLockPeriod={initialLockPeriod}
          stakedPeriods={stakedPeriods}
          body={({
            setLockPeriod,
            stakeCurrencyAmount,
            projectedReturnAmount,
            formattedUsdProjectedReturnAmount,
            lockPeriod,
            boostAPR,
            lockAPR,
            unlockAPR,
            poolEndDay,
            lastDayAction,
          }) => (
            <>
              <PreTitle textTransform="uppercase" bold mb="8px">
                {t('Stake Duration')}
              </PreTitle>
              <Flex mb="16px">
                {pools.map((pool) => (
                  <StyledButton
                    key={pool.lockPeriod}
                    scale="md"
                    variant={pool.lockPeriod === lockPeriod ? 'subtle' : 'light'}
                    width="100%"
                    mx="2px"
                    onClick={(e) => {
                      e.stopPropagation()
                      setLockPeriod(pool.lockPeriod)
                    }}
                  >
                    {pool.lockPeriod}D
                  </StyledButton>
                ))}
              </Flex>
              <RoiCard
                earningTokenSymbol={stakingToken.symbol}
                calculatorState={{
                  data: {
                    roiUSD: formattedUsdProjectedReturnAmount || 0,
                    roiTokens: projectedReturnAmount ? toNumber(projectedReturnAmount?.toSignificant(2)) : 0,
                    roiPercentage: boostAPR ? toNumber(boostAPR?.toSignificant(2)) : 0,
                  },
                  controls: {
                    mode: CalculatorMode.ROI_BASED_ON_PRINCIPAL,
                  },
                }}
              />

              <Box mb="16px" mt="16px">
                <PreTitle textTransform="uppercase" bold mb="8px">
                  {t('Position Overview')}
                </PreTitle>
                <FixedStakingOverview
                  lastDayAction={lastDayAction}
                  isBoost={isBoost}
                  poolEndDay={poolEndDay}
                  stakeAmount={stakeCurrencyAmount}
                  lockAPR={lockAPR}
                  boostAPR={boostAPR}
                  unlockAPR={unlockAPR}
                  lockPeriod={lockPeriod}
                />
              </Box>
            </>
          )}
        />
      </ModalV2>
    </>
  )
}

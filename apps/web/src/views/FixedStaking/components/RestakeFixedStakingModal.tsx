import { useTranslation } from '@pancakeswap/localization'
import { ModalV2, useModalV2, Text, Box, PreTitle, Flex, Balance } from '@pancakeswap/uikit'
import { ReactNode } from 'react'
import { Token } from '@pancakeswap/sdk'
import { LightGreyCard } from '@pancakeswap/uikit/src/widgets/RoiCalculator/Card'

import ConnectWalletButton from 'components/ConnectWalletButton'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import toNumber from 'lodash/toNumber'

import { FixedStakingPool } from '../type'
import FixedStakingOverview from './FixedStakingOverview'
import { StakingModalTemplate } from './StakingModalTemplate'

export function FixedRestakingModal({
  stakingToken,
  pools,
  children,
  initialLockPeriod,
  stakedPeriods,
  setSelectedPeriodIndex,
}: {
  stakingToken: Token
  pools: FixedStakingPool[]
  children: (openModal: () => void) => ReactNode
  initialLockPeriod: number
  stakedPeriods: number[]
  setSelectedPeriodIndex?: (value: number | null) => void
}) {
  const { account } = useAccountActiveChain()

  const { t } = useTranslation()
  const stakeModal = useModalV2()

  return account ? (
    <>
      {children(stakeModal.onOpen)}
      <ModalV2
        {...stakeModal}
        onDismiss={() => {
          if (setSelectedPeriodIndex) setSelectedPeriodIndex(null)
          stakeModal.onDismiss()
        }}
        closeOnOverlayClick
      >
        <StakingModalTemplate
          stakingToken={stakingToken}
          pools={pools}
          initialLockPeriod={initialLockPeriod}
          stakedPeriods={stakedPeriods}
          body={({ stakeAmount, projectedReturnAmount, lockPeriod, boostAPR, lockAPR }) => (
            <>
              <Box mb="16px" mt="16px">
                <PreTitle textTransform="uppercase" bold mb="8px">
                  {t('Overview')}
                </PreTitle>
                <LightGreyCard>
                  <Flex justifyContent="space-between">
                    <Box>
                      <PreTitle>{t('New Staked Amount')}</PreTitle>
                      <Text bold>
                        <Balance
                          bold
                          fontSize="16px"
                          decimals={2}
                          unit={` ${stakingToken.symbol}`}
                          value={toNumber(stakeAmount)}
                        />{' '}
                      </Text>
                    </Box>
                    <Box style={{ textAlign: 'end' }}>
                      <PreTitle>{t('Stake Period')}</PreTitle>
                      <Text bold>{lockPeriod} Days</Text>
                    </Box>
                  </Flex>
                </LightGreyCard>
              </Box>

              <Box mb="16px" mt="16px">
                <PreTitle textTransform="uppercase" bold mb="8px">
                  {t('Position Details')}
                </PreTitle>
                <FixedStakingOverview
                  lockAPR={lockAPR}
                  boostAPR={boostAPR}
                  lockPeriod={lockPeriod}
                  stakingToken={stakingToken}
                  projectedReturnAmount={projectedReturnAmount}
                />
              </Box>
            </>
          )}
        />
      </ModalV2>
    </>
  ) : (
    <ConnectWalletButton />
  )
}

import { useMemo } from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import BigNumber from 'bignumber.js'
import { VaultKey, DeserializedLockedCakeVault } from 'state/types'
import { getVaultPosition, VaultPosition } from 'utils/cakePool'
import { useDeserializedPoolByVaultKey, useCakeVault } from 'state/pools/hooks'
import { useCakeVaultPool } from 'views/TradingReward/hooks/useCakeVaultPool'
import { Incentives } from 'views/TradingReward/hooks/useAllTradingRewardPair'
import { UserCampaignInfoDetail } from 'views/TradingReward/hooks/useAllUserCampaignInfo'
import NoConnected from 'views/TradingReward/components/YourTradingReward/NoConnected'
import { floatingStarsLeft, floatingStarsRight } from 'views/Lottery/components/Hero'
// import ViewEligiblePairs from 'views/TradingReward/components/YourTradingReward/ViewEligiblePairs'
import NoProfile from 'views/TradingReward/components/YourTradingReward/NoProfile'
import NoCakeLockedOrExtendLock from 'views/TradingReward/components/YourTradingReward/NoCakeLockedOrExtendLock'
// import NotQualified from 'views/TradingReward/components/YourTradingReward/NotQualified'
import ExpiringUnclaim from 'views/TradingReward/components/YourTradingReward/ExpiringUnclaim'

const BACKGROUND_COLOR = 'radial-gradient(55.22% 134.13% at 57.59% 0%, #F5DF8E 0%, #FCC631 33.21%, #FF9D00 79.02%)'

const StyledBackground = styled(Flex)<{ showBackgroundColor: boolean }>`
  position: relative;
  flex-direction: column;
  padding-top: 48px;
  background: ${({ showBackgroundColor }) => (showBackgroundColor ? BACKGROUND_COLOR : '')};
  z-index: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 88px;
  }
`

const StyledHeading = styled(Text)`
  position: relative;
  font-size: 40px;
  font-weight: 900;
  line-height: 98%;
  letter-spacing: 0.01em;
  background: linear-gradient(166.02deg, #ffb237 -5.1%, #ffeb37 75.24%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: auto;
  padding: 0 16px;
  text-align: center;

  &::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 16px;
    z-index: -1;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 8px rgb(101, 50, 205, 1);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 56px;
    padding: 0;

    &::after {
      padding: 0;
      -webkit-text-stroke: 10px rgb(101, 50, 205, 1);
    }
  }
`

const Container = styled(Box)<{ showBackgroundColor: boolean }>`
  position: relative;
  z-index: 1;
  margin: 48px auto;
  width: 100%;
  padding: 0 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ showBackgroundColor }) => (showBackgroundColor ? '760px' : '1140px')};
  }
`

const Decorations = styled(Box)<{ showBackgroundColor: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  pointer-events: none;
  overflow: hidden;
  > img {
    position: absolute;
  }
  & :nth-child(1) {
    top: 8%;
    left: 0%;
    animation: ${floatingStarsRight} 3.5s ease-in-out infinite;
  }
  & :nth-child(2) {
    bottom: 20%;
    right: 0;
    animation: ${floatingStarsRight} 2.5s ease-in-out infinite;
  }
  & :nth-child(3) {
    bottom: -5%;
    right: 5%;
    animation: ${floatingStarsLeft} 4.5s ease-in-out infinite;
  }
  & :nth-child(4) {
    top: -12%;
    left: 20%;
    animation: ${floatingStarsLeft} 3s ease-in-out infinite;
  }
  & :nth-child(5) {
    top: 2%;
    right: 0;
    animation: ${floatingStarsLeft} 3.5s ease-in-out infinite;
  }

  & :nth-child(4), & :nth-child(5) {
    display: ${({ showBackgroundColor }) => (showBackgroundColor ? 'block' : 'none')};
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    display: block;
  }

  @media screen and (min-width: 1440px) {
    & :nth-child(3) {
      right: 16%;
    }
  }
}`

interface YourTradingRewardProps {
  incentives: Incentives
  userCampaignInfoData: UserCampaignInfoDetail
}

const YourTradingReward: React.FC<React.PropsWithChildren<YourTradingRewardProps>> = ({
  incentives,
  userCampaignInfoData,
}) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { theme } = useTheme()

  const {
    isQualified,
    isActive,
    lockEndTime,
    lockStartTime,
    thresholdLockedPeriod,
    thresholdLockedAmount,
    currentCanClaim,
    totalVolume,
  } = userCampaignInfoData ?? {}

  useCakeVaultPool()

  const pool = useDeserializedPoolByVaultKey(VaultKey.CakeVault)
  const { userData } = useCakeVault() as DeserializedLockedCakeVault
  const vaultPosition = getVaultPosition(userData)

  const isLockPosition = useMemo(
    () => Boolean(userData?.locked) && vaultPosition === VaultPosition.Locked,
    [userData, vaultPosition],
  )

  const isValidLockDuration = useMemo(() => {
    const lockTime = new BigNumber(lockEndTime).minus(lockStartTime)
    return lockTime.gte(thresholdLockedPeriod)
  }, [lockEndTime, lockStartTime, thresholdLockedPeriod])

  const isValidTotalStakedBalance = useMemo(
    () => new BigNumber(userData.balance.cakeAsNumberBalance).gte(thresholdLockedAmount),
    [userData, thresholdLockedAmount],
  )

  const showBackgroundColor = useMemo(() => !account || true, [account])

  const showNoCakeLockedOrExtendLock = useMemo(() => {
    return account && isActive && (!isValidTotalStakedBalance || !isValidLockDuration || !isLockPosition)
  }, [account, isActive, isValidTotalStakedBalance, isValidLockDuration, isLockPosition])

  const isClaimable = useMemo(() => {
    return account && isQualified
  }, [account, isQualified])

  return (
    <StyledBackground showBackgroundColor={showBackgroundColor}>
      <StyledHeading data-text={t('Your Trading Reward')}>{t('Your Trading Reward')}</StyledHeading>
      {isClaimable ? (
        <ExpiringUnclaim
          currentCanClaim={currentCanClaim}
          currentTradingVolume={totalVolume}
          campaignClaimTime={incentives.campaignClaimTime}
        />
      ) : (
        <Container showBackgroundColor={showBackgroundColor}>
          <Flex
            width="100%"
            borderRadius={32}
            padding={['24px', '24px', '24px', '48px 0']}
            flexDirection="column"
            alignItems={['center']}
            style={{ background: showBackgroundColor ? theme.card.background : BACKGROUND_COLOR }}
          >
            {!account && <NoConnected />}
            {account && !isActive && <NoProfile />}
            {/* <ViewEligiblePairs /> */}
            {showNoCakeLockedOrExtendLock && (
              <NoCakeLockedOrExtendLock
                pool={pool}
                userData={userData}
                data={userCampaignInfoData}
                isLockPosition={isLockPosition}
                isValidLockDuration={isValidLockDuration}
                isValidTotalStakedBalance={isValidTotalStakedBalance}
              />
            )}
            {/* <NotQualified /> */}
          </Flex>
        </Container>
      )}
      <Decorations showBackgroundColor={showBackgroundColor}>
        <img src="/images/trading-reward/left-bunny.png" width="93px" height="242px" alt="left-bunny" />
        <img src="/images/trading-reward/right-bunny.png" width="161px" height="161px" alt="right-bunny" />
        <img src="/images/trading-reward/love-butter.png" width="306px" height="306px" alt="love-butter" />
        <img src="/images/trading-reward/butter.png" width="195px" height="191px" alt="butter" />
        <img src="/images/trading-reward/coin.png" width="183px" height="119px" alt="coin" />
      </Decorations>
    </StyledBackground>
  )
}

export default YourTradingReward

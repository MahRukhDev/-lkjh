import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { COMMUNITY_FARMS, BLOCKS_PER_YEAR } from 'sushi/lib/constants'
import Button from 'components/Button'
import HarvestButton from './HarvestButton'
import IconButton from 'components/IconButton'
import { AddIcon } from 'components/icons'
import Label from 'components/Label'
import { useTokenBalance2 } from 'hooks/useTokenBalance'
import { SUSHI_PER_BLOCK } from 'config'

import { useSousAllowance } from 'hooks/useAllowance'
import { useSousApprove } from 'hooks/useApprove'
import { useSousEarnings, useSousLeftBlocks } from 'hooks/useEarnings'
import useModal from 'hooks/useModal'
import { useSousStake } from 'hooks/useStake'
import useSushi from 'hooks/useSushi'
import {
  useSousStakedBalance,
  useSousTotalStaked,
} from 'hooks/useStakedBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { useSousUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousReward } from 'hooks/useReward'
import { getSyrupAddress } from 'sushi/utils'

import Balance from './Balance'
import SmallValue from './Value'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CardTitle from './CardTitle'
import CardTokenImg from './CardTokenImg'
import Card from './Card'

import WalletProviderModal from 'components/WalletProviderModal'
import { TranslateString } from 'utils/translateTextHelpers'
import CardFooter from './CardFooter'

interface HarvestProps {
  syrup: Contract
  tokenName: string
  sousId: number
  projectLink: string
  harvest: boolean
  tokenPerBlock: string
  cakePrice: BigNumber
  tokenPrice: BigNumber
  community?: boolean
  stakedValue: Array<any>
}

/**
 * Temporary code
 *
 * 1. Mark this pool as finished
 * 2. Do not let people stake
 *
 * TODO - when all CAKE is unstaked we can remove this
 */
const SYRUPIDS = [5, 6, 3, 1]

const PoolCardv2: React.FC<HarvestProps> = ({
  syrup,
  sousId,
  tokenName,
  projectLink,
  harvest,
  cakePrice,
  tokenPrice,
  tokenPerBlock,
  community,
  stakedValue,
}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { account } = useWallet()
  const allowance = useSousAllowance(syrup, sousId)
  const { onApprove } = useSousApprove(syrup, sousId)
  const { isFinished, farmStart, blocksRemaining } = useSousLeftBlocks(sousId)
  const tokenBalance = useTokenBalance(syrup.options.address)
  const stakedBalance = useSousStakedBalance(sousId)
  const totalStaked = useSousTotalStaked(sousId)
  const earnings = useSousEarnings(sousId)

  const sushi = useSushi()
  const syrupBalance = useTokenBalance(getSyrupAddress(sushi))

  const { onStake } = useSousStake(sousId)
  const { onUnstake } = useSousUnstake(sousId)

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useSousReward(sousId)
  const isCommunityFarm = COMMUNITY_FARMS.includes(tokenName)

  // /!\ Shit code
  // useTokenBalance2 and the calculateCommunityApy are part of temporary fix to display
  // the APY of certain pools (afaik only community pools). The problem is, that the usual method
  // to retrieve the balance of the LP contract give a value of 0 for these pools.
  // So here, we apply the same fix than on the FarmCards.tsx components.
  // This fix needs to be remove once we find a way to compute the APY with only function, for all the pools
  const staxBalance = useTokenBalance2(
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    '0x7cd05f8b960ba071fdf69c750c0e5a57c8366500',
  )
  const narBalance = useTokenBalance2(
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    '0x745c4fd226e169d6da959283275a8e0ecdd7f312',
  )
  const nyaBalance = useTokenBalance2(
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    '0x2730bf486d658838464a4ef077880998d944252d',
  )

  const apy = useMemo(() => {
    const calculateCommunityApy = (balance: BigNumber, tokenName: string) => {
      const stakedValueById = stakedValue.reduce((accum, value) => {
        return {
          ...accum,
          [value.tokenSymbol]: value,
        }
      }, {})
      const stakedValueItem = stakedValueById[tokenName]
      if (!stakedValueItem) {
        return null
      }

      return `${SUSHI_PER_BLOCK.times(BLOCKS_PER_YEAR)
        .times(stakedValueItem.poolWeight)
        .div(balance)
        .div(2)
        .times(100)
        .toFixed(2)}%`
    }

    if (!harvest || cakePrice.isLessThanOrEqualTo(0)) return '-'

    if (tokenName === 'STAX') {
      return calculateCommunityApy(new BigNumber(staxBalance), tokenName)
    } else if (tokenName === 'NAR') {
      return calculateCommunityApy(new BigNumber(narBalance), tokenName)
    } else if (tokenName === 'NYA') {
      return calculateCommunityApy(new BigNumber(nyaBalance), tokenName)
    }
    const a = tokenPrice.times(BLOCKS_PER_YEAR).times(tokenPerBlock)
    const b = cakePrice.times(getBalanceNumber(totalStaked))

    return `${a.div(b).times(100).toFixed(2)}%`
  }, [
    cakePrice,
    harvest,
    narBalance,
    nyaBalance,
    stakedValue,
    staxBalance,
    tokenName,
    tokenPerBlock,
    tokenPrice,
    totalStaked,
  ])

  const isUnstaked =
    account && !allowance.toNumber() && stakedBalance.toNumber() === 0

  // TODO - Remove this when pool removed
  const isOldSyrup = SYRUPIDS.includes(sousId)
  const isReallyFinished = isFinished || isOldSyrup
  const isCardActive = isReallyFinished && isUnstaked

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={isOldSyrup ? 'SYRUP' : 'CAKE'}
    />,
  )

  const max =
    sousId === 0
      ? stakedBalance.gt(syrupBalance)
        ? syrupBalance
        : stakedBalance
      : stakedBalance

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={max}
      onConfirm={onUnstake}
      tokenName={isOldSyrup ? 'SYRUP' : 'CAKE'}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )
  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <Card isActive={isCardActive} isFinished={isReallyFinished && sousId !== 0}>
      {isReallyFinished && sousId !== 0 && <PoolFinishedSash />}
      <div style={{ padding: '24px' }}>
        <CardTitle isFinished={isReallyFinished && sousId !== 0}>
          {isOldSyrup && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}
        </CardTitle>
        <div
          style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
        >
          <div style={{ flex: 1 }}>
            <CardTokenImg
              src={`/images/tokens/${tokenName}.png`}
              alt={tokenName}
            />
          </div>
          {account && harvest && !isOldSyrup && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          )}
        </div>
        {/* Dirty fix. @TODO this need to be move to the config file */}
        {!isOldSyrup ? (
          <Balance
            value={
              tokenName === 'CTK' || tokenName === 'HARD'
                ? getBalanceNumber(earnings, 6)
                : getBalanceNumber(earnings)
            }
            isFinished={isReallyFinished}
          />
        ) : (
          <CardTitle isFinished={true}>UNSTAKE NOW</CardTitle>
        )}
        <Label
          isFinished={isReallyFinished && sousId !== 0}
          text={TranslateString(330, `${tokenName} earned`)}
        />
        <StyledCardActions>
          {!account && (
            <div style={{ flex: 1 }}>
              <Button
                onClick={handleUnlockClick}
                size="md"
                text={TranslateString(292, 'Unlock Wallet')}
              />
            </div>
          )}
          {account &&
            (isUnstaked && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button
                  disabled={isFinished || requestedApproval}
                  onClick={handleApprove}
                  text={isOldSyrup ? 'Approve SYRUP' : 'Approve CAKE'}
                />
              </div>
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  text={isOldSyrup ? 'Unstake SYRUP' : 'Unstake CAKE'}
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }
                />
                <StyledActionSpacer />
                {!isOldSyrup && (
                  <IconButton
                    disabled={isReallyFinished && sousId !== 0}
                    onClick={onPresentDeposit}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </>
            ))}
        </StyledCardActions>
        <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(352, 'APY')}:</div>
          {isFinished || isOldSyrup ? (
            '-'
          ) : (
            <SmallValue isFinished={isReallyFinished} value={apy} />
          )}
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1 }}>
            <span role="img" aria-label="syrup">
              🍯{' '}
            </span>
            Your Stake:
          </div>
          <SmallValue
            isFinished={isReallyFinished}
            value={getBalanceNumber(stakedBalance)}
          />
        </StyledDetails>
      </div>
      <CardFooter
        projectLink={projectLink}
        totalStaked={totalStaked}
        blocksRemaining={blocksRemaining}
        isFinished={isReallyFinished}
        farmStart={farmStart}
        community={isCommunityFarm}
      />
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
`

export default PoolCardv2

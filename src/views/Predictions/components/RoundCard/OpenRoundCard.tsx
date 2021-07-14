import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import {
  CardBody,
  LinkExternal,
  PlayCircleOutlineIcon,
  Button,
  useTooltip,
  ArrowUpIcon,
  ArrowDownIcon, Text, Flex,
} from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { BetPosition, Round } from 'state/types'
import { useBlock, useGetIntervalBlocks } from 'state/hooks'
import { markPositionAsEntered } from 'state/predictions'
import useToast from 'hooks/useToast'
import CardFlip from '../CardFlip'
import { formatBnb, formatUsd, getBnbAmount } from '../../helpers'
import { RoundResultBox, PrizePoolRow } from '../RoundResult'
import MultiplierArrow from './MultiplierArrow'
import Card from './Card'
import CardHeader from './CardHeader'
import SetPositionCard from './SetPositionCard'

interface OpenRoundCardProps {
  round: Round
  betAmount?: number
  hasEnteredUp: boolean
  hasEnteredDown: boolean
  bullMultiplier: number
  bearMultiplier: number
}

interface State {
  isSettingPosition: boolean
  position: BetPosition
}

const OpenRoundCard: React.FC<OpenRoundCardProps> = ({
  round,
  betAmount,
  hasEnteredUp,
  hasEnteredDown,
  bullMultiplier,
  bearMultiplier,
}) => {
  const [state, setState] = useState<State>({
    isSettingPosition: false,
    position: BetPosition.BULL,
  })
  const { t } = useTranslation()
  const interval = useGetIntervalBlocks()
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { currentBlock } = useBlock()
  const { isSettingPosition, position } = state
  const isBufferPhase = currentBlock >= round.startBlock + interval
  const positionDisplay = position === BetPosition.BULL ? 'UP' : 'DOWN'
  const { targetRef, tooltipVisible, tooltip } = useTooltip(
    <div style={{ whiteSpace: 'nowrap' }}>{`${formatBnb(betAmount)} BNB`}</div>,
    { placement: 'top' },
  )

  // Bettable rounds do not have an lockBlock set so we approximate it by adding the block interval
  // to the start block
  const estimatedLockBlock = round.startBlock + interval

  const getCanEnterPosition = () => {
    if (hasEnteredUp || hasEnteredDown) {
      return false
    }

    if (round.lockPrice !== null) {
      return false
    }

    return true
  }

  const canEnterPosition = getCanEnterPosition()

  const handleBack = () =>
    setState((prevState) => ({
      ...prevState,
      isSettingPosition: false,
    }))

  const handleSetPosition = (newPosition: BetPosition) => {
    setState((prevState) => ({
      ...prevState,
      isSettingPosition: true,
      position: newPosition,
    }))
  }

  const togglePosition = () => {
    setState((prevState) => ({
      ...prevState,
      position: prevState.position === BetPosition.BULL ? BetPosition.BEAR : BetPosition.BULL,
    }))
  }

  const handleSuccess = async (decimalValue: BigNumber, hash: string) => {
    // Optimistically set the user bet so we see the entered position immediately.
    dispatch(
      markPositionAsEntered({
        account,
        roundId: round.id,
        partialBet: {
          hash,
          position,
          amount: getBnbAmount(decimalValue).toNumber(),
        },
      }),
    )

    handleBack()

    toastSuccess(
      'Success!',
      t(`${positionDisplay} position entered`, {
        position: positionDisplay,
      }),
    )
  }

  const getPositionEnteredIcon = () => {
    return position === BetPosition.BULL ? <ArrowUpIcon color="currentColor" /> : <ArrowDownIcon color="currentColor" />
  }

  return (
    <CardFlip isFlipped={isSettingPosition} height="404px">
      <Card>
        <CardHeader
          status="next"
          epoch={round.epoch}
          blockNumber={estimatedLockBlock}
          icon={<PlayCircleOutlineIcon color="white" mr="4px" width="21px" />}
          title={t('Next')}
        />
        <CardBody p="16px">
          <RoundResultBox isNext={canEnterPosition} isLive={!canEnterPosition}>
            {canEnterPosition ? (
              <>
                <PrizePoolRow totalAmount={round.totalAmount} mb="8px" />
                <Button
                  variant="success"
                  width="100%"
                  onClick={() => handleSetPosition(BetPosition.BULL)}
                  mb="4px"
                  disabled={!canEnterPosition || isBufferPhase}
                >
                  {t('Increase BID')}
                </Button>
                <Button
                  variant="danger"
                  width="100%"
                  onClick={() => handleSetPosition(BetPosition.BEAR)}
                  disabled={!canEnterPosition || isBufferPhase}
                >
                  {t('Decrease BID')}
                </Button>
                <Flex alignItems='center' justifyContent='center' className="indetails-title" paddingTop="10px">
                  <LinkExternal onClick={() => handleSetPosition(BetPosition.BULL)} fontSize='14px'>{t('Enter custom bid')}</LinkExternal>
                </Flex>
              </>
            ) : (
              <>
                <div ref={targetRef}>
                  <Button disabled startIcon={getPositionEnteredIcon()} width="100%" mb="8px">
                    {t('%position% Entered', { position: positionDisplay })}
                  </Button>
                </div>
                <PrizePoolRow totalAmount={round.totalAmount} />
                {tooltipVisible && tooltip}
              </>
            )}
          </RoundResultBox>
        </CardBody>
      </Card>
      <SetPositionCard
        onBack={handleBack}
        onSuccess={handleSuccess}
        position={position}
        togglePosition={togglePosition}
      />
    </CardFlip>
  )
}

export default OpenRoundCard

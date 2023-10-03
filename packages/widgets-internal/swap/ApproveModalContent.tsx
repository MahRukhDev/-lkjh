import { useTranslation } from '@pancakeswap/localization'
import { Currency } from '@pancakeswap/swap-sdk-core'
import { AutoColumn, Box, Column, ColumnCenter, Flex, Text, TooltipText, useTooltip } from '@pancakeswap/uikit'
import { ReactNode, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'
import { PaperIcon } from './Logos'
import TokenTransferInfo from './TokenTransferInfo'
import { AnimationType, slideInAnimation, slideOutAnimation } from './styles'
import { useUnmountingAnimation } from './useUnmountingAnimation'

enum ConfirmModalState {
  REVIEWING,
  WRAPPING,
  RESETTING_APPROVAL,
  APPROVING_TOKEN,
  PERMITTING,
  PENDING_CONFIRMATION,
}

export type PendingConfirmModalState = Extract<
  ConfirmModalState,
  | ConfirmModalState.APPROVING_TOKEN
  | ConfirmModalState.PERMITTING
  | ConfirmModalState.PENDING_CONFIRMATION
  | ConfirmModalState.WRAPPING
  | ConfirmModalState.RESETTING_APPROVAL
>

export function isInApprovalPhase(confirmModalState: ConfirmModalState) {
  return (
    confirmModalState === ConfirmModalState.APPROVING_TOKEN ||
    confirmModalState === ConfirmModalState.PERMITTING ||
    confirmModalState === ConfirmModalState.RESETTING_APPROVAL
  )
}

interface ApproveModalContentProps {
  title: any
  isMM: boolean
  isBonus: boolean
  currencyA: Currency
  currencyB: Currency
  amountA: string
  amountB: string
  addToWalletButtonContent: ReactNode
  confirmModalState: ConfirmModalState
  pendingModalSteps: PendingConfirmModalState[]
  attemptingTransaction: boolean
  txHash: string
}

export const StepTitleAnimationContainer = styled(Column)<{ disableEntranceAnimation?: boolean }>`
  align-items: center;
  transition: display 300ms ease-in-out;
  ${({ disableEntranceAnimation }) =>
    !disableEntranceAnimation &&
    css`
      ${slideInAnimation}
    `}

  &.${AnimationType.EXITING} {
    ${slideOutAnimation}
  }
`

export const ApproveModalContent: React.FC<ApproveModalContentProps> = ({
  title,
  isMM,
  isBonus,
  currencyA,
  currencyB,
  amountA,
  amountB,
  confirmModalState,
  pendingModalSteps,
  addToWalletButtonContent,
  attemptingTransaction,
}) => {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <Text>{t('Pancakeswap AMM includes V3, V2 and stable swap.')}</Text>,
    { placement: 'top' },
  )
  const symbolA = currencyA?.symbol
  const symbolB = currencyB?.symbol
  const isApproving = isInApprovalPhase(confirmModalState)

  const currentStepContainerRef = useRef<HTMLDivElement>(null)
  useUnmountingAnimation(currentStepContainerRef, () => AnimationType.EXITING)

  return useMemo(
    () => (
      <Box width="100%">
        <Flex height="160px" alignItems="center">
          <ColumnCenter>
            <PaperIcon
              currency={currencyA}
              asBadge={confirmModalState === ConfirmModalState.APPROVING_TOKEN}
              pendingConfirmation={confirmModalState === ConfirmModalState.PENDING_CONFIRMATION}
              isInApprovalPhase={isApproving}
              submitted={!attemptingTransaction}
            />
          </ColumnCenter>
        </Flex>
        <AutoColumn gap="12px" justify="center">
          {pendingModalSteps.map((step: PendingConfirmModalState) => {
            // We only render one step at a time, but looping through the array allows us to keep
            // the exiting step in the DOM during its animation.
            return (
              Boolean(step === confirmModalState) && (
                <StepTitleAnimationContainer
                  disableEntranceAnimation={pendingModalSteps[0] === confirmModalState}
                  gap="md"
                  key={step}
                  ref={step === confirmModalState ? currentStepContainerRef : undefined}
                >
                  <></>
                  <Text bold textAlign="center">
                    {title[step]}
                  </Text>
                  {confirmModalState !== ConfirmModalState.PENDING_CONFIRMATION ? (
                    <Flex>
                      <Text fontSize="14px">{t('Swapping thru:')}</Text>
                      {isMM ? (
                        <Text ml="4px" fontSize="14px">
                          {t('Pancakeswap MM')}
                        </Text>
                      ) : isBonus ? (
                        <Text ml="4px" fontSize="14px">
                          {t('Bonus Route')}
                        </Text>
                      ) : (
                        <>
                          <TooltipText ml="4px" fontSize="14px" color="textSubtle" ref={targetRef}>
                            {t('Pancakeswap AMM')}
                          </TooltipText>
                          {tooltipVisible && tooltip}
                        </>
                      )}
                    </Flex>
                  ) : (
                    <AutoColumn gap="12px" justify="center">
                      <TokenTransferInfo
                        symbolA={symbolA}
                        symbolB={symbolB}
                        amountA={amountA}
                        amountB={amountB}
                        currencyA={currencyA}
                        currencyB={currencyB}
                      />
                      {addToWalletButtonContent}
                    </AutoColumn>
                  )}
                </StepTitleAnimationContainer>
              )
            )
          })}
        </AutoColumn>
      </Box>
    ),
    [
      currencyA,
      currencyB,
      amountA,
      amountB,
      isBonus,
      isMM,
      pendingModalSteps,
      addToWalletButtonContent,
      confirmModalState,
      symbolA,
      symbolB,
      t,
      targetRef,
      title,
      tooltip,
      tooltipVisible,
      isApproving,
      attemptingTransaction,
    ],
  )
}

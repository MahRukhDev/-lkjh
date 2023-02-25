import { CommonBasesType } from 'components/SearchModal/types'

import { Currency, Percent } from '@pancakeswap/sdk'
import {
  AutoColumn,
  Button,
  Dots,
  RowBetween,
  Card,
  Text,
  AutoRow,
  Box,
  NumericalInput,
  ConfirmationModalContent,
  useModal,
  Message,
  MessageText,
  PreTitle,
} from '@pancakeswap/uikit'

import { CommitButton } from 'components/CommitButton'
import useLocalSelector from 'contexts/LocalRedux/useSelector'
import { useDerivedPositionInfo } from 'hooks/v3/useDerivedPositionInfo'
import useV3DerivedInfo from 'hooks/v3/useV3DerivedInfo'
import { NonfungiblePositionManager } from '@pancakeswap/v3-sdk'
import { LiquidityFormState } from 'hooks/v3/types'
import { useCallback, useEffect, useState } from 'react'
import _isNaN from 'lodash/isNaN'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import CurrencyInputPanel from 'components/CurrencyInputPanel'

// import { maxAmountSpend } from 'utils/maxAmountSpend'
import { Field } from 'state/mint/actions'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'

import { useIsExpertMode, useUserSlippageTolerance } from 'state/user/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
// import { TransactionResponse } from '@ethersproject/providers'
import { calculateGasMargin } from 'utils'
import currencyId from 'utils/currencyId'
import { useRouter } from 'next/router'
import { useIsTransactionUnsupported, useIsTransactionWarning } from 'hooks/Trades'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
// import useBUSDPrice from 'hooks/useBUSDPrice'
import { useSigner } from 'wagmi'
import styled from 'styled-components'
import { TransactionResponse } from '@ethersproject/providers'
import LiquidityChartRangeInput from 'components/LiquidityChartRangeInput'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import { Bound } from 'config/constants/types'

import RangeSelector from './components/RangeSelector'
import { PositionPreview } from './components/PositionPreview'
import RateToggle from './components/RateToggle'
import { DynamicSection } from './components/shared'
import LockedDeposit from './components/LockedDeposit'
import { useRangeHopCallbacks } from './form/hooks/useRangeHopCallbacks'
import { useV3MintActionHandlers } from './form/hooks/useV3MintActionHandlers'

export const BodyWrapper = styled(Card)`
  border-radius: 24px;
  max-width: 858px;
  width: 100%;
  z-index: 1;
`

const StyledInput = styled(NumericalInput)`
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme, error }) => theme.shadows[error ? 'warning' : 'inset']};
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 16px;
`

/* two-column layout where DepositAmount is moved at the very end on mobile. */
export const ResponsiveTwoColumns = styled.div`
  display: grid;
  grid-column-gap: 32px;
  grid-row-gap: 16px;
  grid-template-columns: 1fr;

  grid-template-rows: max-content;
  grid-auto-flow: row;

  padding-top: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
  }
`

export const HideMedium = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

export const MediumOnly = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: initial;
  }
`

export const RightContainer = styled(AutoColumn)`
  height: fit-content;

  grid-row: 2 / 3;
  grid-column: 1;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-row: 1 / 3;
    grid-column: 2;
  }
`

interface V3FormViewPropsType {
  baseCurrency: Currency
  quoteCurrency: Currency
  currencyIdA: string
  currencyIdB: string
  feeAmount: number
}

export default function V3FormView({
  feeAmount,
  baseCurrency,
  quoteCurrency,
  currencyIdA,
  currencyIdB,
}: V3FormViewPropsType) {
  const router = useRouter()
  const { data: signer } = useSigner()
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  const { minPrice, maxPrice } = router.query

  const { t } = useTranslation()
  const expertMode = useIsExpertMode()

  const positionManager = useV3NFTPositionManagerContract()
  const { account, chainId, isWrongNetwork } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const { position: existingPosition } = useDerivedPositionInfo(undefined)

  // mint state
  const formState = useLocalSelector<LiquidityFormState>((s) => s) as LiquidityFormState
  const { independentField, typedValue, startPriceTypedValue, rightRangeTypedValue, leftRangeTypedValue } = formState

  const {
    pool,
    ticks,
    dependentField,
    price,
    pricesAtTicks,
    parsedAmounts,
    // currencyBalances,
    position,
    noLiquidity,
    currencies,
    errorMessage,
    invalidPool,
    invalidRange,
    outOfRange,
    depositADisabled,
    depositBDisabled,
    invertPrice,
    ticksAtLimit,
  } = useV3DerivedInfo(
    baseCurrency ?? undefined,
    quoteCurrency ?? undefined,
    feeAmount,
    baseCurrency ?? undefined,
    existingPosition,
    formState,
  )
  const { onFieldAInput, onFieldBInput, onLeftRangeInput, onRightRangeInput, onStartPriceInput } =
    useV3MintActionHandlers(noLiquidity)

  const isValid = !errorMessage && !invalidRange
  // modal and loading
  // capital efficiency warning
  const [showCapitalEfficiencyWarning, setShowCapitalEfficiencyWarning] = useState<boolean>(false)

  useEffect(() => {
    setShowCapitalEfficiencyWarning(false)
  }, [baseCurrency, quoteCurrency, feeAmount, onLeftRangeInput, onRightRangeInput])

  useEffect(() => {
    if (feeAmount) {
      onLeftRangeInput('')
      onRightRangeInput('')
    }
    // NOTE: ignore exhaustive-deps to avoid infinite re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feeAmount])

  useEffect(() => {
    if (minPrice && typeof minPrice === 'string' && minPrice !== leftRangeTypedValue && !leftRangeTypedValue) {
      onLeftRangeInput(minPrice)
    }
    if (maxPrice && typeof maxPrice === 'string' && maxPrice !== rightRangeTypedValue && !rightRangeTypedValue) {
      onRightRangeInput(maxPrice)
    }
  }, [minPrice, maxPrice, onRightRangeInput, onLeftRangeInput, leftRangeTypedValue, rightRangeTypedValue])
  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [txHash, setTxHash] = useState<string>('')
  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }
  // const usdcValues = {
  //   [Field.CURRENCY_A]: useBUSDPrice(parsedAmounts[Field.CURRENCY_A]?.currency),
  //   [Field.CURRENCY_B]: useBUSDPrice(parsedAmounts[Field.CURRENCY_B]?.currency),
  // }
  //   // get the max amounts user can add
  // const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
  //   (accumulator, field) => {
  //     return {
  //       ...accumulator,
  //       [field]: maxAmountSpend(currencyBalances[field]),
  //     }
  //   },
  //   {},
  // )
  // const atMaxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
  //   (accumulator, field) => {
  //     return {
  //       ...accumulator,
  //       [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
  //     }
  //   },
  //   {},
  // )
  const nftPositionManagerAddress = useV3NFTPositionManagerContract()?.address
  //   // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], nftPositionManagerAddress)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], nftPositionManagerAddress)
  // Philip TODO: Add 'auto' allowedSlippage
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  // const allowedSlippage = useUserSlippageToleranceWithDefault(
  //   outOfRange ? ZERO_PERCENT : DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE,
  // )

  const onAdd = useCallback(async () => {
    if (!chainId || !signer || !account || !nftPositionManagerAddress) return

    if (!positionManager || !baseCurrency || !quoteCurrency) {
      return
    }

    if (position && account && deadline) {
      const useNative = baseCurrency.isNative ? baseCurrency : quoteCurrency.isNative ? quoteCurrency : undefined
      const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
        slippageTolerance: new Percent(allowedSlippage, 100),
        recipient: account,
        deadline: deadline.toString(),
        useNative,
        createPool: noLiquidity,
      })

      const txn: { to: string; data: string; value: string } = {
        to: nftPositionManagerAddress,
        data: calldata,
        value,
      }

      setAttemptingTxn(true)

      signer
        .estimateGas(txn)
        .then((estimate) => {
          const newTxn = {
            ...txn,
            gasLimit: calculateGasMargin(estimate),
          }

          return signer.sendTransaction(newTxn).then((response: TransactionResponse) => {
            setAttemptingTxn(false)
            addTransaction(response, {
              type: 'add-liquidity-v3',
              baseCurrencyId: currencyId(baseCurrency),
              quoteCurrencyId: currencyId(quoteCurrency),
              createPool: Boolean(noLiquidity),
              expectedAmountBaseRaw: parsedAmounts[Field.CURRENCY_A]?.quotient?.toString() ?? '0',
              expectedAmountQuoteRaw: parsedAmounts[Field.CURRENCY_B]?.quotient?.toString() ?? '0',
              feeAmount: position.pool.fee,
            })
            setTxHash(response.hash)
          })
        })
        .catch((error) => {
          console.error('Failed to send transaction', error)
          setAttemptingTxn(false)
          // we only care if the error is something _other_ than the user rejected the tx
          if (error?.code !== 4001) {
            console.error(error)
          }
        })
    }
  }, [
    account,
    addTransaction,
    allowedSlippage,
    baseCurrency,
    chainId,
    deadline,
    nftPositionManagerAddress,
    noLiquidity,
    parsedAmounts,
    position,
    positionManager,
    quoteCurrency,
    signer,
  ])

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
      // dont jump to pool page if creating
      router.replace(`pool`, undefined, {
        shallow: true,
      })
    }
    setTxHash('')
  }, [onFieldAInput, router, txHash])
  const addIsUnsupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  // get value and prices at ticks
  const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = ticks
  const { [Bound.LOWER]: priceLower, [Bound.UPPER]: priceUpper } = pricesAtTicks
  const { getDecrementLower, getIncrementLower, getDecrementUpper, getIncrementUpper, getSetFullRange } =
    useRangeHopCallbacks(baseCurrency ?? undefined, quoteCurrency ?? undefined, feeAmount, tickLower, tickUpper, pool)
  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA = approvalA !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_A]
  const showApprovalB = approvalB !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_B]

  const pendingText = `Supplying ${!depositADisabled ? parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) : ''} ${
    !depositADisabled ? currencies[Field.CURRENCY_A]?.symbol : ''
  } ${!outOfRange ? 'and' : ''} ${!depositBDisabled ? parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) : ''} ${
    !depositBDisabled ? currencies[Field.CURRENCY_B]?.symbol : ''
  }`

  const [onPresentAddLiquidityModal] = useModal(
    <TransactionConfirmationModal
      style={{
        width: '420px',
      }}
      title="Add Liquidity"
      onDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={() => (
        <ConfirmationModalContent
          topContent={() => <PositionPreview position={position} inRange={!outOfRange} ticksAtLimit={ticksAtLimit} />}
          bottomContent={() => (
            <Button width="100%" mt="16px" onClick={onAdd}>
              Add
            </Button>
          )}
        />
      )}
      pendingText={pendingText}
    />,
    true,
    true,
    'TransactionConfirmationModal',
  )

  const addIsWarning = useIsTransactionWarning(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  let buttons = null
  if (addIsUnsupported || addIsWarning) {
    buttons = (
      <Button disabled mb="4px">
        {t('Unsupported Asset')}
      </Button>
    )
  } else if (!account) {
    buttons = <ConnectWalletButton width="100%" />
  } else if (isWrongNetwork) {
    buttons = <CommitButton />
  } else {
    buttons = (
      <AutoColumn gap="md">
        {(approvalA === ApprovalState.NOT_APPROVED ||
          approvalA === ApprovalState.PENDING ||
          approvalB === ApprovalState.NOT_APPROVED ||
          approvalB === ApprovalState.PENDING) &&
          isValid && (
            <RowBetween style={{ gap: '8px' }}>
              {showApprovalA && (
                <Button onClick={approveACallback} disabled={approvalA === ApprovalState.PENDING} width="100%">
                  {approvalA === ApprovalState.PENDING ? (
                    <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Dots>
                  ) : (
                    t('Enable %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })
                  )}
                </Button>
              )}
              {showApprovalB && (
                <Button onClick={approveBCallback} disabled={approvalB === ApprovalState.PENDING} width="100%">
                  {approvalB === ApprovalState.PENDING ? (
                    <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Dots>
                  ) : (
                    t('Enable %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })
                  )}
                </Button>
              )}
            </RowBetween>
          )}
        <CommitButton
          variant={
            !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B] ? 'danger' : 'primary'
          }
          onClick={() => (expertMode ? onAdd() : onPresentAddLiquidityModal())}
          disabled={
            !isValid ||
            attemptingTxn ||
            (approvalA !== ApprovalState.APPROVED && !depositADisabled) ||
            (approvalB !== ApprovalState.APPROVED && !depositBDisabled)
          }
        >
          {errorMessage || t('Add')}
        </CommitButton>
      </AutoColumn>
    )
  }

  return (
    <>
      <DynamicSection disabled={!feeAmount || invalidPool || (noLiquidity && !startPriceTypedValue)}>
        <AutoColumn>
          <PreTitle mb="8px">Deposit Amount</PreTitle>

          <LockedDeposit locked={depositADisabled} mb="8px">
            <CurrencyInputPanel
              disableCurrencySelect
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onFieldAInput}
              showQuickInputButton
              showMaxButton
              currency={currencies[Field.CURRENCY_A]}
              id="add-liquidity-input-tokena"
              showCommonBases
              commonBasesType={CommonBasesType.LIQUIDITY}
            />
          </LockedDeposit>

          <LockedDeposit locked={depositBDisabled}>
            <CurrencyInputPanel
              disableCurrencySelect
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onFieldBInput}
              showQuickInputButton
              showMaxButton
              currency={currencies[Field.CURRENCY_B]}
              id="add-liquidity-input-tokenb"
              showCommonBases
              commonBasesType={CommonBasesType.LIQUIDITY}
            />
          </LockedDeposit>
        </AutoColumn>
      </DynamicSection>
      <HideMedium>{buttons}</HideMedium>

      <RightContainer>
        <AutoColumn>
          {noLiquidity ? (
            <Box>
              <PreTitle>Set Starting Price</PreTitle>
              <Message variant="warning" mb="16px">
                <MessageText>
                  This pool must be initialized before you can add liquidity. To initialize, select a starting price for
                  the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than
                  usual due to the initialization transaction.
                </MessageText>
              </Message>
              <StyledInput className="start-price-input" value={startPriceTypedValue} onUserInput={onStartPriceInput} />
              <AutoRow justifyContent="space-between" mb="24px">
                <Text>Current {baseCurrency?.symbol} Price:</Text>
                <Text>
                  {price ? (invertPrice ? price?.invert()?.toSignificant(5) : price?.toSignificant(5)) : '-'}
                  <span style={{ marginLeft: '4px' }}>{quoteCurrency?.symbol}</span>
                </Text>
              </AutoRow>
            </Box>
          ) : (
            <>
              <RowBetween mb="8px">
                <PreTitle>Set Price Range</PreTitle>
                <RateToggle
                  currencyA={baseCurrency}
                  handleRateToggle={() => {
                    if (!ticksAtLimit[Bound.LOWER] && !ticksAtLimit[Bound.UPPER]) {
                      onLeftRangeInput((invertPrice ? priceLower : priceUpper?.invert())?.toSignificant(6) ?? '')
                      onRightRangeInput((invertPrice ? priceUpper : priceLower?.invert())?.toSignificant(6) ?? '')
                      onFieldAInput(formattedAmounts[Field.CURRENCY_B] ?? '')
                    }

                    router.replace(`/add/${currencyIdA}/${currencyIdB}${feeAmount ? `/${feeAmount}` : ''}`, undefined, {
                      shallow: true,
                    })
                  }}
                />
              </RowBetween>

              {price && baseCurrency && quoteCurrency && !noLiquidity && (
                <AutoRow gap="4px" justifyContent="center" style={{ marginTop: '0.5rem' }}>
                  <Text fontWeight={500} textAlign="center" fontSize={12} color="text1">
                    Current Price:
                  </Text>
                  <Text fontWeight={500} textAlign="center" fontSize={12} color="text1">
                    {invertPrice ? price.invert().toSignificant(6) : price.toSignificant(6)}
                  </Text>
                  <Text color="text2" fontSize={12}>
                    {quoteCurrency?.symbol} per {baseCurrency.symbol}
                  </Text>
                </AutoRow>
              )}

              <LiquidityChartRangeInput
                currencyA={baseCurrency ?? undefined}
                currencyB={quoteCurrency ?? undefined}
                feeAmount={feeAmount}
                ticksAtLimit={ticksAtLimit}
                price={price ? parseFloat((invertPrice ? price.invert() : price).toSignificant(8)) : undefined}
                priceLower={priceLower}
                priceUpper={priceUpper}
                onLeftRangeInput={onLeftRangeInput}
                onRightRangeInput={onRightRangeInput}
                interactive
              />
            </>
          )}
          <DynamicSection disabled={!feeAmount || invalidPool || (noLiquidity && !startPriceTypedValue)}>
            <RangeSelector
              priceLower={priceLower}
              priceUpper={priceUpper}
              getDecrementLower={getDecrementLower}
              getIncrementLower={getIncrementLower}
              getDecrementUpper={getDecrementUpper}
              getIncrementUpper={getIncrementUpper}
              onLeftRangeInput={onLeftRangeInput}
              onRightRangeInput={onRightRangeInput}
              currencyA={baseCurrency}
              currencyB={quoteCurrency}
              feeAmount={feeAmount}
              ticksAtLimit={ticksAtLimit}
            />
            {showCapitalEfficiencyWarning ? (
              <Message variant="warning" mb="16px">
                <Box>
                  <Text fontSize="16px">Efficiency Comparison</Text>
                  <Text color="textSubtle">Full range positions may earn less fees than concentrated positions.</Text>
                  <Button
                    mt="16px"
                    onClick={() => {
                      setShowCapitalEfficiencyWarning(false)
                      getSetFullRange()
                    }}
                    scale="md"
                    variant="danger"
                  >
                    I understand
                  </Button>
                </Box>
              </Message>
            ) : (
              <Button
                onClick={() => {
                  setShowCapitalEfficiencyWarning(true)
                }}
                variant="secondary"
                mb="16px"
                scale="sm"
              >
                Full Range
              </Button>
            )}

            {outOfRange ? (
              <Message variant="warning">
                <RowBetween>
                  <Text ml="12px" fontSize="12px">
                    Your position will not earn fees or be used in trades until the market price moves into your range.
                  </Text>
                </RowBetween>
              </Message>
            ) : null}
          </DynamicSection>
          <MediumOnly>{buttons}</MediumOnly>
        </AutoColumn>
      </RightContainer>
    </>
  )
}

/* eslint-disable react/jsx-pascal-case */
import { useTranslation } from '@pancakeswap/localization'
import {
  AutoRow,
  CalculateIcon,
  Farm as FarmUI,
  IconButton,
  RoiCalculatorModalV2,
  Skeleton,
  Text,
  TooltipText,
  useModalV2,
  useRoi,
} from '@pancakeswap/uikit'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { useCakePriceAsBN } from '@pancakeswap/utils/useCakePrice'
import { encodeSqrtRatioX96, Position } from '@pancakeswap/v3-sdk'
import BigNumber from 'bignumber.js'
import { Bound } from 'config/constants/types'
import { usePoolAvgTradingVolume } from 'hooks/usePoolTradingVolume'
import { useAllV3Ticks } from 'hooks/v3/usePoolTickData'
import useV3DerivedInfo from 'hooks/v3/useV3DerivedInfo'
import { useMemo, useState } from 'react'
import { useFarmsV3 } from 'state/farmsV3/hooks'
import { Field } from 'state/mint/actions'
import LiquidityFormProvider from 'views/AddLiquidityV3/formViews/V3FormView/form/LiquidityFormProvider'
import { useV3FormState } from 'views/AddLiquidityV3/formViews/V3FormView/form/reducer'
import { V3Farm } from 'views/Farms/FarmsV3'
import { getDisplayApr } from '../../getDisplayApr'

type FarmV3ApyButtonProps = {
  farm: V3Farm
  existingPosition?: Position
  isPositionStaked?: boolean
}

export function FarmV3ApyButton(props: FarmV3ApyButtonProps) {
  return (
    <LiquidityFormProvider>
      <FarmV3ApyButton_ {...props} />
    </LiquidityFormProvider>
  )
}

function FarmV3ApyButton_({ farm, existingPosition: existingPosition_, isPositionStaked }: FarmV3ApyButtonProps) {
  const roiModal = useModalV2()
  const { t } = useTranslation()
  const { token: baseCurrency, quoteToken: quoteCurrency, feeAmount } = farm

  const { ticks: data } = useAllV3Ticks(baseCurrency, quoteCurrency, feeAmount)

  const formState = useV3FormState()

  // use state to prevent existing position from being updated from props after changes on roi modal
  const [existingPosition] = useState(existingPosition_)

  const { pool, ticks, price, pricesAtTicks, parsedAmounts, currencyBalances, outOfRange } = useV3DerivedInfo(
    baseCurrency ?? undefined,
    quoteCurrency ?? undefined,
    feeAmount,
    baseCurrency ?? undefined,
    existingPosition,
    formState,
  )

  const cakePrice = useCakePriceAsBN()

  const sqrtRatioX96 = price && encodeSqrtRatioX96(price.numerator, price.denominator)
  const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = ticks
  const { [Bound.LOWER]: priceLower, [Bound.UPPER]: priceUpper } = pricesAtTicks

  const { [Field.CURRENCY_A]: amountA, [Field.CURRENCY_B]: amountB } = parsedAmounts

  const currencyAUsdPrice = +farm.tokenPriceBusd
  const currencyBUsdPrice = +farm.quoteTokenPriceBusd

  const volume24H = usePoolAvgTradingVolume({
    address: farm.lpAddress,
    chainId: farm.token.chainId,
  })

  const balanceA = existingPosition_?.amount0 ?? currencyBalances[Field.CURRENCY_A]
  const balanceB = existingPosition_?.amount1 ?? currencyBalances[Field.CURRENCY_B]

  const depositUsdAsBN = useMemo(
    () =>
      balanceA &&
      balanceB &&
      currencyAUsdPrice &&
      currencyBUsdPrice &&
      new BigNumber(balanceA.toExact())
        .times(currencyAUsdPrice)
        .plus(new BigNumber(balanceB.toExact()).times(currencyBUsdPrice)),
    [balanceA, balanceB, currencyAUsdPrice, currencyBUsdPrice],
  )

  const { data: farmV3 } = useFarmsV3()

  const cakeAprFactor = useMemo(
    () =>
      new BigNumber(farm.poolWeight)
        .times(farmV3.cakePerSecond)
        .times(365 * 60 * 60 * 24)
        .times(cakePrice)
        .div(
          new BigNumber(farm.lmPoolLiquidity).plus(
            isPositionStaked ? BIG_ZERO : existingPosition_?.liquidity.toString() ?? BIG_ZERO,
          ),
        )
        .times(100),
    [
      cakePrice,
      existingPosition_?.liquidity,
      farm.lmPoolLiquidity,
      farm.poolWeight,
      farmV3.cakePerSecond,
      isPositionStaked,
    ],
  )

  const positionCakeApr = useMemo(
    () =>
      existingPosition_
        ? outOfRange
          ? 0
          : new BigNumber(existingPosition_.liquidity.toString()).times(cakeAprFactor).div(depositUsdAsBN).toNumber()
        : 0,
    [cakeAprFactor, depositUsdAsBN, existingPosition_, outOfRange],
  )

  const { apr } = useRoi({
    tickLower,
    tickUpper,
    sqrtRatioX96,
    fee: feeAmount,
    mostActiveLiquidity: pool?.liquidity,
    amountA,
    amountB,
    compoundOn: false,
    currencyAUsdPrice,
    currencyBUsdPrice,
    volume24H,
  })

  const displayApr = getDisplayApr(+farm.cakeApr, +apr.toSignificant(2))

  if (!displayApr) {
    return <Skeleton height={24} width={80} />
  }

  return (
    <>
      {existingPosition_ ? (
        <AutoRow width="auto" gap="2px">
          {outOfRange ? (
            <TooltipText decorationColor="failure" color="failure" fontSize="14px">
              {positionCakeApr.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
            </TooltipText>
          ) : (
            <Text fontSize="14px">{positionCakeApr.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</Text>
          )}
          <IconButton variant="text" style={{ height: 18, width: 18 }} scale="sm" onClick={roiModal.onOpen}>
            <CalculateIcon width="18px" color="textSubtle" />
          </IconButton>
        </AutoRow>
      ) : (
        <FarmUI.FarmApyButton
          variant="text-and-button"
          handleClickButton={(e) => {
            e.stopPropagation()
            e.preventDefault()
            roiModal.onOpen()
          }}
        >
          {displayApr}%
        </FarmUI.FarmApyButton>
      )}
      {cakePrice && cakeAprFactor && (
        <RoiCalculatorModalV2
          {...roiModal}
          maxLabel={existingPosition_ ? t('My Position') : undefined}
          closeOnOverlayClick
          depositAmountInUsd={depositUsdAsBN?.toString()}
          max={depositUsdAsBN?.toString()}
          balanceA={balanceA}
          balanceB={balanceB}
          price={price}
          currencyA={baseCurrency}
          currencyB={quoteCurrency}
          currencyAUsdPrice={currencyAUsdPrice}
          currencyBUsdPrice={currencyBUsdPrice}
          sqrtRatioX96={sqrtRatioX96}
          liquidity={pool?.liquidity}
          feeAmount={feeAmount}
          ticks={data}
          volume24H={volume24H}
          priceUpper={priceUpper}
          priceLower={priceLower}
          isFarm
          cakePrice={cakePrice.toString()}
          cakeAprFactor={cakeAprFactor}
        />
      )}
    </>
  )
}

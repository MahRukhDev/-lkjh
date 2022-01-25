import React from 'react'
import { Trade, TradeType } from 'peronio-sdk'
import { Text } from 'peronio-uikit'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Layout/Row'

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { t } = useTranslation()
  const markupRate = 5
  const markupAmount = 2.33
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <AutoColumn style={{ padding: '0 16px' }}>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {isExactIn ? t('Minimum received') : t('Maximum sold')}
          </Text>
        </RowFixed>
        <RowFixed>
          <Text fontSize="14px">
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ?? '-'}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {t('Markup (%markup%%)', { markup: markupRate })}
          </Text>
          <QuestionHelper
            text={
              <>
                <Text mb="12px">{t('The vault charges a fee for minting')}</Text>
                <Text>- {t('The markup is %amount% from the USDT amount', { amount: '5%' })}</Text>
                <Text>- {t('This is already included in total USDT input above')}</Text>
                <Text>- {t('This additional fee will increase the total Peronio collateral')}</Text>
              </>
            }
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <Text fontSize="14px">USDT {markupAmount.toFixed(2)}</Text>
      </RowBetween>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const [allowedSlippage] = useUserSlippageTolerance()

  return <AutoColumn gap="0px">{trade && <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />}</AutoColumn>
}

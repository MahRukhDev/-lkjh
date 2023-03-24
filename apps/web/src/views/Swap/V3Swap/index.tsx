import { SmartRouter } from '@pancakeswap/smart-router/evm'
import { useDerivedBestTradeWithMM } from '../MMLinkPools/hooks/useDerivedSwapInfoWithMM'

import { FormHeader, FormMain, MMTradeDetail, PricingAndSlippage, SwapCommitButton, TradeDetails } from './containers'
import { MMCommitButton } from './containers/MMCommitButton'
import { useSwapBestTrade } from './hooks'

export function V3SwapForm() {
  const { isLoading, trade, refresh, syncing, isStale } = useSwapBestTrade()

  const mm = useDerivedBestTradeWithMM(trade)

  const tradeLoaded = !isLoading && !!trade

  const finalTrade = mm.isMMBetter ? mm?.mmTradeInfo?.trade : trade

  return (
    <>
      <FormHeader onRefresh={refresh} refreshDisabled={!tradeLoaded || syncing || !isStale} />
      <FormMain
        tradeLoading={isLoading}
        pricingAndSlippage={
          <PricingAndSlippage priceLoading={isLoading} price={trade && SmartRouter.getExecutionPrice(trade)} />
        }
        inputAmount={finalTrade?.inputAmount}
        outputAmount={finalTrade?.outputAmount}
        swapCommitButton={mm?.isMMBetter ? <MMCommitButton {...mm} /> : <SwapCommitButton trade={trade} />}
      />

      {mm.isMMBetter ? (
        <MMTradeDetail loaded={!mm.mmOrderBookTrade.isLoading} mmTrade={mm.mmTradeInfo} />
      ) : (
        <TradeDetails loaded={tradeLoaded} trade={trade} />
      )}
    </>
  )
}

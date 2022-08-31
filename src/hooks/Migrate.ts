/* eslint-disable no-param-reassign */
// import { isTradeBetter } from 'utils/trades'
// import { formatUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { mainnetTokens } from 'config/constants/tokens'
import { Currency, CurrencyAmount, Mint, Percent, Price } from 'peronio-sdk'
import JSBI from 'jsbi'
import { MARKUP_DECIMALS } from 'config/constants'
import { useEffect, useMemo, useState } from 'react'
import { useMigratorContract, usePeronioContract } from './useContract'

// import useActiveWeb3React from 'hooks/useActiveWeb3React'

// import { useUserSingleHopOnly } from 'state/user/hooks'
// import { BETTER_TRADE_LESS_HOPS_THRESHOLD } from '../config/constants'
// import { wrappedCurrency } from '../utils/wrappedCurrency'

// import { useUnsupportedTokens } from './Tokens'

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

/**
 * Hook for Minting exact IN
 * @param currencyAmountIn
 * @param currencyOut
 * @returns
 */
export function useMigrateExactIn(currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): Mint | null {

  // MIGRATOR //

  const migratorContract = useMigratorContract()
   /* 
    
   0: {
    "type": "BigNumber",
    "hex": "0x02"
    }

  1: {
    "type": "BigNumber",
    "hex": "0x01e0"
    }
  
  pe: {
    "type": "BigNumber",
    "hex": "0x01e0"
    }

  usdc: {
    "type": "BigNumber",
    "hex": "0x02"
    }

   */

  // ----------------------------------------------------------------//

  const DECIMALS = mainnetTokens.pe.decimals
  const [quote, setQuote] = useState<Percent>()
  const [price, setPrice] = useState<Price>()

  // Get Markup
  useEffect(() => {
    async function fetchQuote() {
      return new Percent(
        (await migratorContract.quote(currencyAmountIn)).toString(), // quote aca?
        JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(MARKUP_DECIMALS + 2)),
      )
    }

    fetchQuote().then(setQuote)
  }, [currencyAmountIn, migratorContract])

  // Get Buying Price
  useEffect(() => {
    if (!currencyOut || !currencyAmountIn) {
      return
    }
    async function fetchBuyingPrice(): Promise<BigNumber> {
      return migratorContract.buyingPrice()
    }

    fetchBuyingPrice()
      .then((buyingPrice) => {
        setPrice(
          new Price(
            currencyAmountIn.currency,
            currencyOut,
            buyingPrice.toString(),
            JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(DECIMALS)),
          ),
        )
      })
      .catch((e) => {
        console.error(e)
      })
  }, [migratorContract, DECIMALS, currencyOut, currencyAmountIn])

  return useMemo(() => {
    // Needs Price
    if (!price || !quote || !currencyAmountIn) {
      return null
    }

    // return Mint.exactOut(currencyAmountOut: CurrencyAmount, price: Price, markup: Percent)
    return Mint.exactIn(currencyAmountIn, price, quote)
  }, [price, quote, currencyAmountIn])
}

/**
 * Hook for Minting exact OUT
 * @param currencyAmountOut
 * @param currencyIn
 * @returns
 */
export function useMigrateExactOut(currencyAmountOut?: CurrencyAmount, currencyIn?: Currency): Mint | null {
  const migratorContract = useMigratorContract()
  const DECIMALS = mainnetTokens.pe.decimals

  const [markup, setMarkup] = useState<Percent>()
  const [price, setPrice] = useState<Price>()

  // Get Markup
  useEffect(() => {
    async function fetchMarkup() {
      return new Percent(
        (await migratorContract.markup()).toString(),
        JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(MARKUP_DECIMALS + 2)),
      )
    }

    fetchMarkup().then(setMarkup)
  }, [migratorContract])

  // Get Buying Price
  useEffect(() => {
    if (!currencyIn || !currencyAmountOut) {
      return
    }
    async function fetchBuyingPrice(): Promise<BigNumber> {
      return migratorContract.buyingPrice()
    }

    fetchBuyingPrice()
      .then((buyingPrice) => {
        setPrice(
          new Price(
            currencyIn,
            currencyAmountOut.currency,
            buyingPrice.toString(),
            JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(DECIMALS)),
          ),
        )
      })
      .catch((e) => {
        console.error(e)
      })
  }, [migratorContract, DECIMALS, currencyIn, currencyAmountOut])

  return useMemo(() => {
    // Needs Price
    if (!price || !markup || !currencyAmountOut) {
      return null
    }

    // return Mint.exactOut(currencyAmountOut: CurrencyAmount, price: Price, markup: Percent)
    return Mint.exactOut(currencyAmountOut, price, markup)
  }, [price, currencyAmountOut, markup])
}

/* eslint-disable no-param-reassign */
// import { isTradeBetter } from 'utils/trades'
// import { formatUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { mainnetTokens } from 'config/constants/tokens'
import { Currency, CurrencyAmount, Mint, Percent, Price } from 'peronio-sdk'
import JSBI from 'jsbi'
import { MARKUP_DECIMALS } from 'config/constants'
import { useEffect, useMemo, useState } from 'react'
import { parseUnits } from 'ethers/lib/utils'
import { usePeronioContract } from './useContract'

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
export function useMintExactIn(currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): Mint | null {
  const peronioContract = usePeronioContract()
  const DECIMALS = mainnetTokens.pe.decimals

  const [markup, setMarkup] = useState<Percent>()
  const [price, setPrice] = useState<Price>()

  // Get Markup
  useEffect(() => {
    async function fetchMarkup() {
      return new Percent(
        (await peronioContract.markup()).toString(),
        JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(MARKUP_DECIMALS + 2)),
      )
    }

    fetchMarkup().then(setMarkup)
  }, [peronioContract])

  // Get Buying Price
  useEffect(() => {
    if (!currencyOut || !currencyAmountIn) {
      return
    }
    async function fetchBuyingPrice(): Promise<BigNumber> {
      const theAmount = parseUnits(currencyAmountIn.toFixed(), currencyAmountIn.currency.decimals)
      return peronioContract.quoteIn(theAmount.toNumber())
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
  }, [peronioContract, DECIMALS, currencyOut, currencyAmountIn])

  return useMemo(() => {
    // Needs Price
    if (!price || !markup || !currencyAmountIn) {
      return null
    }

    // return Mint.exactOut(currencyAmountOut: CurrencyAmount, price: Price, markup: Percent)
    return Mint.exactIn(currencyAmountIn, price, markup)
  }, [price, markup, currencyAmountIn])
}

/**
 * Hook for Minting exact OUT
 * @param currencyAmountOut
 * @param currencyIn
 * @returns
 */
export function useMintExactOut(currencyAmountOut?: CurrencyAmount, currencyIn?: Currency): Mint | null {
  const peronioContract = usePeronioContract()
  const DECIMALS = mainnetTokens.pe.decimals

  const [markup, setMarkup] = useState<Percent>()
  const [price, setPrice] = useState<Price>()

  // Get Markup
  useEffect(() => {
    async function fetchMarkup() {
      return new Percent(
        (await peronioContract.markup()).toString(),
        JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(MARKUP_DECIMALS + 2)),
      )
    }

    fetchMarkup().then(setMarkup)
  }, [peronioContract])

  // Get Buying Price
  useEffect(() => {
    if (!currencyIn || !currencyAmountOut) {
      return
    }
    async function fetchBuyingPrice(): Promise<BigNumber> {
      const theAmount = parseUnits(currencyAmountOut.toFixed(), currencyAmountOut.currency.decimals)
      return peronioContract.quoteIn(theAmount.toNumber())
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
  }, [peronioContract, DECIMALS, currencyIn, currencyAmountOut])

  return useMemo(() => {
    // Needs Price
    if (!price || !markup || !currencyAmountOut) {
      return null
    }

    // return Mint.exactOut(currencyAmountOut: CurrencyAmount, price: Price, markup: Percent)
    return Mint.exactOut(currencyAmountOut, price, markup)
  }, [price, currencyAmountOut, markup])
}

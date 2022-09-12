import { mainnetTokens } from 'config/constants/tokens'
import { useTranslation } from 'contexts/Localization'
import useENS from 'hooks/ENS/useENS'
import { useMigrateExactIn, useMigrateExactOut } from 'hooks/Migrate'
import { useCurrency } from 'hooks/Tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Currency, CurrencyAmount, Mint } from 'peronio-sdk'
import { tryParseAmount, useSwapState } from 'state/swap/hooks'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { isAddress } from 'utils'
import {
  Field,
} from './actions'

// TODO: Replace with functionality
export function useMigrateTokenInfo(): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount }
  parsedAmount: CurrencyAmount | undefined
  mint: Mint | undefined
  inputError?: string
} {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const {
    typedValue,
    recipient,
  } = useSwapState()
  const independentField = Field.INPUT
  const inputCurrencyId = mainnetTokens.pV1.address
  const outputCurrencyId = mainnetTokens.pe.address
  const intermediateCurrencyId = mainnetTokens.usdc.address
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const intermediateCurrency = useCurrency(intermediateCurrencyId)
  const recipientLookup = useENS(recipient ?? undefined)
  const to: string | null = (recipient === null ? account : recipientLookup.address) ?? null

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ])

  const isExactIn: boolean = independentField === Field.INPUT
  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)
  const mintOut = useMigrateExactOut(!isExactIn ? parsedAmount : null, outputCurrency)
  const mintIn = useMigrateExactIn(isExactIn ? parsedAmount : null, outputCurrency)

  const mint = isExactIn ? mintIn : mintOut

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
    [Field.INTERMEDIATE]: intermediateCurrency,
  }

  let inputError: string | undefined
  if (!account) {
    inputError = t('Connect Wallet')
  }

  if (!parsedAmount) {
    inputError = inputError ?? t('Enter an amount')
  }

  const formattedTo = isAddress(to)
  if (!to || !formattedTo) {
    inputError = inputError ?? t('Enter a recipient')
  }

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [currencyBalances[Field.INPUT], mint?.inputAmount]

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = t('Insufficient %symbol% balance', { symbol: amountIn.currency.symbol })
  }

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    mint: mint ?? undefined,
    inputError,
  }
}

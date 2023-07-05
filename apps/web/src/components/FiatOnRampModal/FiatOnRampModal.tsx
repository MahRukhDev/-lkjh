import { Trans, useTranslation } from '@pancakeswap/localization'
import {
  AutoColumn,
  CircleLoader,
  Flex,
  Heading,
  InjectedModalProps,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
  Text,
  useModal,
  ModalCloseButton,
} from '@pancakeswap/uikit'
import { LoadingDot } from '@pancakeswap/uikit/src/widgets/Liquidity'
import { CommitButton } from 'components/CommitButton'
import Script from 'next/script'
import { ReactNode, memo, useCallback, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ErrorText } from 'views/Swap/components/styleds'
import { useAccount } from 'wagmi'
import {
  chainIdToNetwork,
  ETHEREUM_TOKENS,
  ONRAMP_PROVIDERS,
  SUPPORTED_MERCURYO_FIAT_CURRENCIES,
  SUPPORTED_MONPAY_ETH_TOKENS,
  SUPPORTED_MOONPAY_BSC_TOKENS,
  mercuryoWhitelist,
} from 'views/BuyCrypto/constants'
import { MERCURYO_WIDGET_ID, MOONPAY_SIGN_URL, ONRAMP_API_BASE_URL } from 'config/constants/endpoints'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ChainId } from '@pancakeswap/sdk'

export const StyledIframe = styled.iframe<{ isDark: boolean }>`
  height: 550px;
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoaderWrapper = styled(Flex)`
  height: 90%;
  width: 100%;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => (theme.isDark ? '#27262C' : 'white')};
  position: absolute;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  z-index: 100;
`

interface FiatOnRampProps {
  provider: string
  inputCurrency: string
  outputCurrency: string
  amount: string
}

interface FetchResponse {
  urlWithSignature: string
}

const LoadingBuffer = () => {
  return (
    <LoaderWrapper justifyContent="center" alignItems="center">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LoadingDot />
        <CircleLoader />
      </div>
    </LoaderWrapper>
  )
}

const fetchMoonPaySignedUrl = async (
  inputCurrency: string,
  outputCurrency: string,
  amount: string,
  isDark: boolean,
  account: string,
  chainId: number,
) => {
  try {
    const baseCurrency = chainId === ChainId.BSC ? `${inputCurrency.toLowerCase()}_bsc` : inputCurrency.toLowerCase()

    const res = await fetch(`${MOONPAY_SIGN_URL}/generate-moonpay-sig`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        type: 'MOONPAY',
        defaultCurrencyCode: baseCurrency,
        baseCurrencyCode: outputCurrency.toLowerCase(),
        baseCurrencyAmount: amount,
        redirectUrl: 'https://pancakeswap.finance',
        theme: isDark ? 'dark' : 'light',
        showOnlyCurrencies: chainId === ChainId.ETHEREUM ? SUPPORTED_MONPAY_ETH_TOKENS : SUPPORTED_MOONPAY_BSC_TOKENS,
        walletAddress: account,
      }),
    })
    const result: FetchResponse = await res.json()

    return result.urlWithSignature
  } catch (error) {
    console.error('Error fetching signature:', error)
    return '' // Return an empty string in case of an error
  }
}

const fetchBinanceConnectSignedUrl = async (inputCurrency, outputCurrency, amount, account) => {
  try {
    const res = await fetch(`https://pcs-onramp-api.com/generate-binance-connect-sig`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        cryptoCurrency: inputCurrency.toUpperCase() === 'WBTC' ? 'BTC' : inputCurrency.toUpperCase(),
        fiatCurrency: outputCurrency.toUpperCase(),
        amount,
        walletAddress: account,
      }),
    })

    const result: FetchResponse = await res.json()
    return result.urlWithSignature
  } catch (error) {
    console.error('Error fetching signature:', error)
    return '' // Return an empty string in case of an error
  }
}

export const FiatOnRampModalButton = ({
  provider,
  inputCurrency,
  outputCurrency,
  amount,
  disabled,
}: FiatOnRampProps & { disabled: boolean }) => {
  const { t } = useTranslation()
  const [onPresentConfirmModal] = useModal(
    <FiatOnRampModal
      provider={provider}
      inputCurrency={inputCurrency}
      outputCurrency={outputCurrency}
      amount={amount}
    />,
  )

  let buttonText: ReactNode | string = t(`Buy with %provider%`, { provider })
  if (disabled) {
    buttonText = (
      <>
        <Flex alignItems="center">
          <Text px="4px" fontWeight="bold" color="white">
            {t('Fetching Quotes')}
          </Text>
          <CircleLoader stroke="white" />
        </Flex>
      </>
    )
  }
  return (
    <AutoColumn gap="md">
      <CommitButton onClick={onPresentConfirmModal} disabled={disabled} isLoading={disabled} mb="10px" mt="16px">
        {buttonText}
      </CommitButton>
    </AutoColumn>
  )
}

export const FiatOnRampModal = memo<InjectedModalProps & FiatOnRampProps>(function ConfirmSwapModalComp({
  onDismiss,
  inputCurrency,
  outputCurrency,
  amount,
  provider,
}) {
  const [scriptLoaded, setScriptOnLoad] = useState<boolean>(Boolean(window?.mercuryoWidget))

  const [error, setError] = useState<boolean | string | null>(false)
  const [signedIframeUrl, setSignedIframeUrl] = useState<string | null>(null)
  const [sig, setSig] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()

  const theme = useTheme()
  const account = useAccount()
  // const { t } = useTranslation()

  const handleDismiss = useCallback(() => {
    onDismiss?.()
  }, [onDismiss])

  const fetchSignedIframeUrl = useCallback(async () => {
    if (!account.address) {
      setError(t('Please connect an account before making a purchase.'))
      return
    }
    setLoading(true)
    setError(null)

    try {
      let result = ''
      if (provider === ONRAMP_PROVIDERS.MoonPay)
        result = await fetchMoonPaySignedUrl(
          inputCurrency,
          outputCurrency,
          amount,
          theme.isDark,
          account.address,
          chainId,
        )
      else result = await fetchBinanceConnectSignedUrl(inputCurrency, outputCurrency, amount, account.address)

      setSignedIframeUrl(result)
    } catch (e) {
      setError(e.toString())
    } finally {
      setTimeout(() => setLoading(false), 2000)
    }
  }, [account.address, theme.isDark, inputCurrency, outputCurrency, amount, provider, t, chainId])

  useEffect(() => {
    const fetchSig = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${ONRAMP_API_BASE_URL}/generate-mercuryo-sig?walletAddress=${account.address}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const signature = await res.json()
        setSig(signature.signature)
      } catch (e) {
        setError(e.toString())
      } finally {
        setTimeout(() => setLoading(false), 2000)
      }
    }
    fetchSig()
  }, [account.address])

  useEffect(() => {
    if (provider === ONRAMP_PROVIDERS.Mercuryo) {
      if (sig && window?.mercuryoWidget) {
        // @ts-ignore
        const MC_WIDGET = window?.mercuryoWidget
        MC_WIDGET.run({
          widgetId: MERCURYO_WIDGET_ID,
          fiatCurrency: outputCurrency.toUpperCase(),
          currency: inputCurrency.toUpperCase(),
          fiatAmount: amount,
          currencies: chainId === ChainId.ETHEREUM ? [ETHEREUM_TOKENS] : mercuryoWhitelist,
          fiatCurrencies: SUPPORTED_MERCURYO_FIAT_CURRENCIES,
          address: account.address,
          signature: sig,
          height: '600px',
          width: '360px',
          network: chainIdToNetwork[chainId],
          host: document.getElementById('mercuryo-widget'),
          theme: theme.isDark ? 'PCS_dark' : 'PCS_light',
        })
      }
    } else fetchSignedIframeUrl()
  }, [
    fetchSignedIframeUrl,
    provider,
    sig,
    account.address,
    amount,
    inputCurrency,
    outputCurrency,
    theme,
    scriptLoaded,
    chainId,
  ])

  return (
    <>
      <ModalWrapper minHeight="550px">
        <ModalHeader background={theme.colors.gradientCardHeader}>
          <ModalTitle>
            <Heading>{t('Buy Crypto In One Click')}</Heading>
          </ModalTitle>
          <ModalCloseButton onDismiss={handleDismiss} />
        </ModalHeader>
        {error ? (
          <Flex justifyContent="center" alignItems="center" alignContent="center">
            <ErrorText>
              <Trans>something went wrong!</Trans>
            </ErrorText>
          </Flex>
        ) : provider === ONRAMP_PROVIDERS.Mercuryo ? (
          <>
            {loading && <LoadingBuffer />}
            <div id="mercuryo-widget" style={{ paddingTop: '24px' }} />;
          </>
        ) : (
          <>
            {loading && <LoadingBuffer />}
            <StyledIframe
              id="moonpayIframe"
              src={signedIframeUrl ?? ''}
              title="fiat-onramp-iframe"
              isDark={theme.isDark}
            />
          </>
        )}
      </ModalWrapper>
      <Script
        src="https://widget.mercuryo.io/embed.2.0.js"
        onLoad={() => {
          setScriptOnLoad(true)
        }}
      />
    </>
  )
})

export default FiatOnRampModal

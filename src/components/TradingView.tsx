import { Box, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useScript from 'hooks/useScript'
import React, { useEffect, useRef } from 'react'
import { DefaultTheme, useTheme } from 'styled-components'

/**
 * When the script tag is injected the TradingView object is not immediately
 * available on the window. So we listen for when it gets set
 */
const tradingViewListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'TradingView', {
      configurable: true,
      set(value) {
        this.tv = value
        resolve(value)
      },
    }),
  )

const initializeTradingView = (TradingViewObj: any, theme: DefaultTheme, localeCode: string, opts: any) => {
  let timezone = 'Etc/UTC'
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch (e) {
    // noop
  }
  /* eslint-disable new-cap */
  /* eslint-disable no-new */
  // @ts-ignore
  return new TradingViewObj.widget({
    autosize: true,
    height: '100%',
    symbol: 'BINANCE:BNBUSDT',
    interval: '5',
    timezone,
    theme: theme.isDark ? 'dark' : 'light',
    style: '1',
    locale: localeCode,
    toolbar_bg: '#f1f3f6',
    enable_publishing: false,
    allow_symbol_change: true,
    hide_side_toolbar: false,
    enabled_features: ['header_fullscreen_button'],
    ...opts,
  })
}

interface TradingViewProps {
  id: string
  symbol: string
}

const TradingView = ({ id, symbol }: TradingViewProps) => {
  const { currentLanguage } = useTranslation()
  const theme = useTheme()
  const widgetRef = useRef<any>()
  const { isMobile } = useMatchBreakpoints()

  useScript('https://s3.tradingview.com/tv.js')

  useEffect(() => {
    const opts: any = {
      container_id: id,
      symbol,
    }

    if (isMobile) {
      opts.hide_side_toolbar = true
    }

    // @ts-ignore
    if (window.tv) {
      // @ts-ignore
      widgetRef.current = initializeTradingView(window.tv, theme, currentLanguage.code, opts)
    } else {
      tradingViewListener().then((tv) => {
        widgetRef.current = initializeTradingView(tv, theme, currentLanguage.code, opts)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, currentLanguage, id, symbol])

  return (
    <Box overflow="hidden" className="tradingview_container">
      <div id={id} />
    </Box>
  )
}

export default TradingView

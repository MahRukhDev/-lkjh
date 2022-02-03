import React from 'react'
import { useAppContext } from 'pages/_app'
import { useRouter } from 'next/router'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { Menu as UikitMenu } from '@pancakeswap/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import useTheme from 'hooks/useTheme'
// import { usePriceCakeBusd } from 'state/farms/hooks'
import { usePhishingBannerManager } from 'state/user/hooks'
import useTokenBalance from 'hooks/useTokenBalance'
import tokens from 'config/constants/tokens'
import { getFullDisplayBalance } from 'utils/formatBalance'
import config from './config/config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'
import { TOKEN_NAME } from 'config/constants'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const { balance: userCake } = useTokenBalance(tokens.cake.address)

  const { usdPrice } = useAppContext()
  // const cakePriceUsd = usePriceCakeBusd()
  const cakePriceUsd = userCake.times(usdPrice)
  const userCakeDisplayBalance = getFullDisplayBalance(cakePriceUsd, 18, 3)

  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()
  const [showPhishingWarningBanner] = usePhishingBannerManager()

  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  return (
    <UikitMenu
      linkComponent={(linkProps) => {
        return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
      }}
      userMenu={<UserMenu />}
      globalMenu={<GlobalSettings />}
      banner={showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={Number(userCakeDisplayBalance)}
      links={config(t)}
      subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      footerLinks={footerLinks(t)}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      buyCakeLabel={t(`Buy ${TOKEN_NAME}`)}
      {...props}
    />
  )
}

export default Menu

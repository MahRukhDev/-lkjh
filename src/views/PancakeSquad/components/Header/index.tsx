import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, lightColors, Spinner, Text, Timeline } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetCakeBalance } from 'hooks/useTokenBalance'
import useTheme from 'hooks/useTheme'
import { StyledWaveContainer } from 'views/PancakeSquad/styles'
import { formatBigNumber } from 'utils/formatBalance'
import { UserStatusEnum } from 'views/PancakeSquad/types'
import ConnectWalletButton from 'components/ConnectWalletButton'
import HeaderBottomWave from '../../assets/HeaderBottomWave'
import nftSaleConfigBuilder from '../../config'
import CtaButtons from './CtaButtons'
import MintText from './MintText'
import PreEventText from './PreEventText'
import SaleProgress from './SaleProgress'
import {
  StyledSquadEventBorder,
  StyledSquadEventContainer,
  StyledSquadHeaderContainer,
  StyledSquadTitle,
} from './styles'
import { PancakeSquadHeaderType } from './types'

const DEFAULT_CAKE_COST = 5
const DEFAULT_MAX_TICKETS = 20

const PancakeSquadHeader: React.FC<PancakeSquadHeaderType> = ({
  dynamicSaleInfo = {},
  fixedSaleInfo = {},
  account,
  userStatus,
  isLoading,
}) => {
  const { t } = useTranslation()
  const { theme, isDark } = useTheme()
  const { balance: cakeBalance } = useGetCakeBalance()
  const { maxPerAddress, maxPerTransaction, maxSupply, pricePerTicket } = fixedSaleInfo
  const {
    saleStatus,
    totalTicketsDistributed,
    canClaimForGen0,
    ticketsOfUser,
    numberTicketsUsedForGen0,
    numberTicketsOfUser,
    numberTicketsForGen0,
    totalSupplyMinted,
    numberTokensOfUser,
    startTimestamp,
  } = dynamicSaleInfo

  return (
    <StyledSquadHeaderContainer
      pt={['16px', null, null, '40px']}
      px={['16px', null, null, '80px']}
      flexDirection="column"
      alignItems="center"
    >
      <Flex width="100%">
        <Link to="/nfts">
          <Text color="primary" bold>{`< ${t('NFT Market')}`}</Text>
        </Link>
      </Flex>
      <StyledSquadTitle my="32px" color={lightColors.invertedContrast} bold textAlign="center">
        {t('Pancake Squad')}
      </StyledSquadTitle>
      <Text color={lightColors.warning} textAlign="center" bold>
        {t('Mint Cost: To Be Announced', {
          minCost: pricePerTicket ? formatBigNumber(pricePerTicket, 0) : DEFAULT_CAKE_COST,
        })}
        <br />
        {t('Max per wallet: %maxPerWallet%', { maxPerWallet: maxPerAddress ?? DEFAULT_MAX_TICKETS })}
      </Text>
      <Text color={lightColors.invertedContrast} mb="32px" textAlign="center">
        {t('PancakeSwap’s first official generative NFT collection.')}
        <br />
        {t('Join the squad.')}
      </Text>
      <StyledSquadEventBorder mb="56px">
        <StyledSquadEventContainer m="1px" p="32px">
          <Flex flexDirection={['column', null, 'row']}>
            {!isLoading && (
              <Box mr="100px">
                <Timeline events={nftSaleConfigBuilder({ t, saleStatus, startTimestamp })} useDark={false} />
              </Box>
            )}
            <Flex flexDirection="column">
              {isLoading ? (
                userStatus === UserStatusEnum.UNCONNECTED ? (
                  <ConnectWalletButton userStatus={userStatus} />
                ) : (
                  <Spinner />
                )
              ) : (
                <>
                  <PreEventText t={t} userStatus={userStatus} saleStatus={saleStatus} />
                  <SaleProgress
                    t={t}
                    userStatus={userStatus}
                    saleStatus={saleStatus}
                    totalTicketsDistributed={totalTicketsDistributed}
                    maxSupply={maxSupply}
                    totalSupplyMinted={totalSupplyMinted}
                  />
                  <MintText
                    t={t}
                    userStatus={userStatus}
                    saleStatus={saleStatus}
                    numberTicketsOfUser={numberTicketsOfUser}
                    numberTokensOfUser={numberTokensOfUser}
                  />
                  <CtaButtons
                    t={t}
                    account={account}
                    theme={theme}
                    userStatus={userStatus}
                    saleStatus={saleStatus}
                    numberTokensOfUser={numberTokensOfUser}
                    canClaimForGen0={canClaimForGen0}
                    maxPerAddress={maxPerAddress}
                    maxSupply={maxSupply}
                    numberTicketsOfUser={numberTicketsOfUser}
                    numberTicketsUsedForGen0={numberTicketsUsedForGen0}
                    totalSupplyMinted={totalSupplyMinted}
                    cakeBalance={cakeBalance}
                    maxPerTransaction={maxPerTransaction}
                    numberTicketsForGen0={numberTicketsForGen0}
                    pricePerTicket={pricePerTicket}
                    ticketsOfUser={ticketsOfUser}
                    startTimestamp={startTimestamp}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </StyledSquadEventContainer>
      </StyledSquadEventBorder>
      <StyledWaveContainer bottom="-2px">
        <HeaderBottomWave isDark={isDark} />
      </StyledWaveContainer>
    </StyledSquadHeaderContainer>
  )
}

export default PancakeSquadHeader

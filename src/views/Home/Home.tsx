import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, useMatchBreakpoints } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import AnnouncementCard from 'views/Home/components/AnnouncementCard'
import ZmbeStats from 'views/Home/components/ZmbeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import { useWeb3React } from '@web3-react/core'
import GraveStakingCard from './components/GraveStakingCard'
import * as fetch from '../../redux/fetch'
import store from '../../redux/store'
import { zombiePriceUsd } from '../../redux/get'
import WhatsNewCard from './components/WhatsNewCard'
import NFTBanner from './components/NFTBanner'
import Title from './components/Title'
import GraveyardCard from './components/GraveyardCard'
import EnterGravesCard from './components/EnterGravesCard'
import useEagerConnect from '../../hooks/useEagerConnect'
import web3 from '../../utils/web3'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/pan-bg-mobile.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('https://storage.googleapis.com/rug-zombie/running-zombie-2.png'), url('https://storage.googleapis.com/rug-zombie/running-zombie-1.png');
    background-position: left center, right center;
    background-size: 207px 142px, 207px 142px;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  & > div {
    grid-column: span 6;
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;
  & > div {
    grid-column: span 6;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  useEagerConnect()

  const {account} = useWeb3React()
  useEffect(() => {
    fetch.initialData(account)
  }, [account])

  const allocPoints = web3.eth.abi.encodeParameter('uint256', '0')
  const lpToken = web3.eth.abi.encodeParameter('address', '0xcaa139138557610fe00f581498f283a789355d14').replace('0x','')
  const minimumStakingTime = web3.eth.abi.encodeParameter('uint256', '259200').replace('0x','')
  // const ruggedToken = web3.eth.abi.encodeParameter('address', '0xFbD88E293e2c4263Be3A3dEeEd1939250E114985').replace('0x','')
  // // const nft = web3.eth.abi.encodeParameter('address', '0xFca723bd09664076c7011BA43ebee05BC38B8E7e').replace('0x','')
  // const minimumStake = web3.eth.abi.encodeParameter('uint256', '10000000000000000000').replace('0x','')
  // const unlockFee = web3.eth.abi.encodeParameter('uint256', '5000000000000000000').replace('0x','')
  // const nftRevivalTime = web3.eth.abi.encodeParameter('uint256', '2592000').replace('0x','')
  const withUpdate = web3.eth.abi.encodeParameter('bool', 'true').replace('0x','')
  console.log(`${allocPoints}${lpToken}${minimumStakingTime}${withUpdate}`)
  // const pid = web3.eth.abi.encodeParameter('uint256', '0')
  // const nft = web3.eth.abi.encodeParameter('address', '0x6209E17d98ba2089571476940751802AAc4249e8').replace('0x','')
  //
  // console.log(`${pid}${nft}`)

  return (
    <>
    <NFTBanner/>
    <Title/>
    <Page>
      <div>
        <Cards>
          <GraveStakingCard />
          <AnnouncementCard />
        </Cards>
        <Cards>
          <EnterGravesCard/>
          <TotalValueLockedCard/>
          <ZmbeStats />
          <WhatsNewCard/>
        </Cards>
      </div>
    </Page>
    </>
  )
}

export default Home
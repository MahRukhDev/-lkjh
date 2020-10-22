import React, {useEffect, useCallback, useState} from 'react'
import styled from 'styled-components'

import {NavLink, Route, Switch, useParams, useRouteMatch} from 'react-router-dom'
import {useWallet} from 'use-wallet'

import Page from '../../components/Page'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
import useSushi from '../../hooks/useSushi'
import useBlock from '../../hooks/useBlock'
import Prize from "./components/prize";
import Ticket from "./components/ticket";
import Time from "./components/time";
import Winning from "./components/winning";
import { getBalanceNumber } from '../../utils/formatBalance'
import {useTotalRewards} from '../../hooks/useTickets'
import { getLotteryContract, getLotteryIssueIndex, getLotteryStatus } from '../../sushi/lotteryUtils'

import PurchasedTickets from './components/purchasedTickets'
import { LotteryStates} from "../../lottery/types";

const Farm: React.FC = () => {
    const {account, ethereum} = useWallet()
    const [onPresentWalletProviderModal] = useModal(<WalletProviderModal/>)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const sushi = useSushi()
    const block = useBlock()
    const lotteryContract = getLotteryContract(sushi)

    const [index, setIndex] = useState(0)
    const [state, setStates] = useState(true)

    const fetchIndex = useCallback(async () => {
      const issueIndex = await getLotteryIssueIndex(lotteryContract)
      setIndex(issueIndex)
    }, [lotteryContract])

    const fetchStatus = useCallback(async () => {
      const state = await getLotteryStatus(lotteryContract)
      setStates(state)
    }, [lotteryContract])

    useEffect(() => {
      if (account && lotteryContract &&  sushi) {
        fetchIndex()
        fetchStatus()
      }
    }, [account, block, lotteryContract, sushi])

    const lotteryPrizeAmount = useTotalRewards()

    const subtitleText = 'Spend CAKE to buy tickets, contributing to the lottery pot. Ticket purchases end approx. 30 minutes before lottery. Win prizes if 2, 3, or 4 of your ticket numbers match the winning numbers and their positions! Good luck!'

    return (
        <Switch>
            <Page>
                第{index}轮: {!state?'进行中':'兑奖等待下一轮'}
                <Title style={{marginTop: '0.5em'}}>
                    💰
                    <br/>
                    WIN
                </Title>
                <Title2>{getBalanceNumber(lotteryPrizeAmount)} CAKE</Title2>
                <Subtitle>{subtitleText}</Subtitle>
                <StyledFarm>
                    <StyledCardWrapper>
                      {state === LotteryStates.WINNERS_ANNOUNCED && <Prize state={state} />}
                      {state === LotteryStates.BUY_TICKETS_OPEN && <Ticket state={state} />}
                    </StyledCardWrapper>
                </StyledFarm>
                <Time state={state}/>
                <Winning></Winning>
            </Page>
        </Switch>
    )

    // return (
    //     <StyledFarm>
    //         <div>
    //             |-----------------|<br/>
    //             | COMING&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
    //             | SOON&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
    //             |-----------------|<br/>
    //             (\__/) ||<br/>
    //             (•ㅅ•) ||<br/>
    //             / 　 づ<br/>

    //         </div>
    //     </StyledFarm>
    // )

}


const Title = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size:56px;
  width: 50vw;
  text-align: center;
  font-weight: 1000;
  margin-top:0.5em;

   @media (max-width: 600px) {
     font-size:40px;
   }
`


const Title2 = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size:56px;
  width: 50vw;
  text-align: center;
  font-weight: 1000;

   @media (max-width: 600px) {
     font-size:38px;
   }
`

const Subtitle = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size:20px;
  width: 50vw;
  text-align: center;
  font-weight: 600;
  margin-top: 0.8em;

   @media (max-width: 600px) {
     font-size:16px;
     width: 80vw;
   }
`
// width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
const StyledCardWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

const StyledFarm = styled.div`
  margin-top: 2.5em;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export default Farm

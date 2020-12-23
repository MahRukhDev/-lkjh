import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import { PastLotteryDataContext } from 'contexts/PastLotteryDataContext'
import Hero from './components/Hero'
import Divider from './components/Divider'
import LotteryPageToggle from './components/LotteryPageToggle'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'

const Lottery: React.FC = () => {
  const [nextDrawActive, setNextDrawActive] = useState(true)
  const [historyData, setHistoryData] = useState([])
  const [historyError, setHistoryError] = useState(false)

  useEffect(() => {
    const getHistoryChartData = () => {
      fetch(`https://api.pancakeswap.com/api/lotteryHistory`)
        .then((response) => response.json())
        .then((data) => setHistoryData(data))
        .catch(() => {
          setHistoryError(true)
        })
    }
    getHistoryChartData()
  }, [])

  return (
    <Switch>
      <Page>
        <Hero />
        <Container>
          <LotteryPageToggle nextDrawActive={nextDrawActive} setNextDrawActive={setNextDrawActive} />
          <Divider />
          <PastLotteryDataContext.Provider value={{ historyError, historyData }}>
            {nextDrawActive ? <NextDrawPage /> : <PastDrawsPage />}
          </PastLotteryDataContext.Provider>
        </Container>
      </Page>
    </Switch>
  )
}

export default Lottery

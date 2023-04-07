import { Box } from '@pancakeswap/uikit'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Banner from 'views/TradingReward/components/Banner'
import YourTradingReward from 'views/TradingReward/components/YourTradingReward'
import CurrentRewardPool from 'views/TradingReward/components/CurrentRewardPool'
import HowToEarn from 'views/TradingReward/components/HowToEarn'
import RewardsBreakdown from 'views/TradingReward/components/RewardsBreakdown'
import Questions from 'views/TradingReward/components/Questions'

import useCampaignIdInfo from 'views/TradingReward/hooks/useCampaignIdInfo'
import useUserCampaignInfo from 'views/TradingReward/hooks/useUserCampaignInfo'

const TradingReward = () => {
  const [showPage, setShowPage] = useState(false)
  const router = useRouter()
  const campaignId = router?.query?.campaignId?.toString() ?? ''
  const { data: campaignInfoData, isFetching: isCampaignInfoFetching } = useCampaignIdInfo(campaignId)
  const { data: userCampaignInfoData, isFetching: isUserCampaignInfoFetching } = useUserCampaignInfo(campaignId)

  useEffect(() => {
    if (campaignId) setShowPage(true)
  }, [campaignId])

  if (!showPage) {
    return null
  }

  return (
    <Box>
      <Banner data={campaignInfoData} isFetching={isCampaignInfoFetching} />
      <YourTradingReward data={userCampaignInfoData} isFetching={isUserCampaignInfoFetching} />
      <CurrentRewardPool />
      <HowToEarn />
      <RewardsBreakdown />
      <Questions />
    </Box>
  )
}

TradingReward.chains = []

export default TradingReward

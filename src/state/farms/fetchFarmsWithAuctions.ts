import { AuctionStatus } from 'config/constants/types'
import { FARM_AUCTION_HOSTING_IN_DAYS } from 'config/constants'
import { add } from 'date-fns'
import { getFarmAuctionContract } from '../../utils/contractHelpers'
import { AuctionsResponse } from '../../utils/types'
import { processAuctionData, sortAuctionBidders } from '../../views/FarmAuction/helpers'

const fetchFarmsWithAuctions = async (
  currentBlock: number,
): Promise<{ winnerFarms: string[]; auctionHostingEndDate: string }> => {
  const now = Date.now()
  const farmAuctionContract = getFarmAuctionContract()
  const currentAuctionId = await farmAuctionContract.currentAuctionId()
  const auctionData: AuctionsResponse = await farmAuctionContract.auctions(currentAuctionId)
  const currentAuction = await processAuctionData(currentAuctionId.toNumber(), auctionData, currentBlock)
  if (currentAuction.status === AuctionStatus.Closed) {
    if (
      Math.abs(now - add(currentAuction.endDate, { days: FARM_AUCTION_HOSTING_IN_DAYS }).getTime()) /
        (24 * 3600 * 1000) >
      FARM_AUCTION_HOSTING_IN_DAYS
    ) {
      return { winnerFarms: [], auctionHostingEndDate: null }
    }
    const [auctionBidders] = await farmAuctionContract.viewBidsPerAuction(currentAuctionId, 0, 500)
    const sortedBidders = sortAuctionBidders(auctionBidders)
    const { leaderboardThreshold } = currentAuction
    const winnerFarms = sortedBidders
      .filter((bidder) => leaderboardThreshold.lte(bidder.amount))
      .map((bidder) => bidder.lpAddress)
    return {
      winnerFarms,
      auctionHostingEndDate: add(currentAuction.endDate, {
        days: FARM_AUCTION_HOSTING_IN_DAYS,
      }).toJSON(),
    }
  }

  return { winnerFarms: [], auctionHostingEndDate: null }
}

export default fetchFarmsWithAuctions

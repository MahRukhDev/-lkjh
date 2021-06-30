import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { LotteryStatus, LotteryTicket, LotteryTicketClaimData } from 'config/constants/types'
import { LotteryUserGraphEntity, LotteryRoundGraphEntity, UserTicketsResponse, UserRound } from 'state/types'
import { multicallv2 } from 'utils/multicall'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import { getLotteryV2Address } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import {
  getViewUserTicketInfoCalls,
  mergeViewUserTicketInfoMulticallResponse,
  processRawTicketsResponse,
} from './helpers'

interface RoundDataAndUserTickets {
  roundId: string
  userTickets: LotteryTicket[]
  finalNumber: string
}

const lotteryAddress = getLotteryV2Address()

const fetchCakeRewardsForTickets = async (
  winningTickets: LotteryTicket[],
): Promise<{ ticketsWithRewards: LotteryTicket[]; cakeTotal: BigNumber }> => {
  const calls = winningTickets.map((winningTicket) => {
    const { roundId, id, rewardBracket } = winningTicket
    return {
      name: 'viewRewardsForTicketId',
      address: lotteryAddress,
      params: [roundId, id, rewardBracket],
    }
  })
  const cakeRewards = await multicallv2(lotteryV2Abi, calls)

  const cakeTotal = cakeRewards.reduce((a: BigNumber, b: ethers.BigNumber[]) => {
    return a.plus(new BigNumber(b[0].toString()))
  }, BIG_ZERO)
  const ticketsWithRewards = winningTickets.map((winningTicket, index) => {
    return { ...winningTicket, cakeReward: cakeRewards[index] }
  })
  // TODO: Remove log. To help in testing when verifying winning tickets.
  console.log('winning tickets: ', ticketsWithRewards)
  return { ticketsWithRewards, cakeTotal }
}

const getRewardBracket = (ticketNumber: string, finalNumber: string): number => {
  // Winning numbers are evaluated right-to-left in the smart contract, so we reverse their order for validation here:
  // i.e. '1123456' should be evaluated as '6543211'
  const ticketNumAsArray = ticketNumber.split('').reverse()
  const winningNumsAsArray = finalNumber.split('').reverse()
  const matchingNumbers = []

  // The number at index 6 in all tickets is 1 and will always match, so finish at index 5
  for (let index = 0; index < winningNumsAsArray.length - 1; index++) {
    if (ticketNumAsArray[index] !== winningNumsAsArray[index]) {
      break
    }
    matchingNumbers.push(ticketNumAsArray[index])
  }

  // Reward brackets refer to indexes, 0 = 1 match, 5 = 6 matches. Deduct 1 from matchingNumbers' length to get the reward bracket
  const rewardBracket = matchingNumbers.length - 1
  return rewardBracket
}

const getWinningTickets = async (roundDataAndUserTickets: RoundDataAndUserTickets): Promise<LotteryTicketClaimData> => {
  const { roundId, userTickets, finalNumber } = roundDataAndUserTickets

  const ticketsWithRewardBrackets = userTickets.map((ticket) => {
    return {
      roundId,
      id: ticket.id,
      number: ticket.number,
      status: ticket.status,
      rewardBracket: getRewardBracket(ticket.number, finalNumber),
    }
  })
  // TODO: Remove log. To help in testing when verifying winning tickets.
  console.log(`all tickets round #${roundId}`, ticketsWithRewardBrackets)

  // A rewardBracket of -1 means no matches. 0 and above means there has been a match
  // If ticket.status is true, the ticket has already been claimed
  const winningTickets = ticketsWithRewardBrackets.filter((ticket) => {
    return ticket.rewardBracket >= 0 && !ticket.status
  })

  if (winningTickets.length > 0) {
    const { ticketsWithRewards, cakeTotal } = await fetchCakeRewardsForTickets(winningTickets)
    return { ticketsWithRewards, cakeTotal, roundId }
  }
  return null
}

const getWinningNumbersForRound = (targetRoundId: string, lotteriesData: LotteryRoundGraphEntity[]) => {
  const targetRound = lotteriesData.find((pastLottery) => pastLottery.id === targetRoundId)
  return targetRound?.finalNumber
}

const fetchUserTicketsForMultipleRounds = async (roundsToCheck: UserRound[], account: string) => {
  // Build calls with data to help with merging multicall responses
  const callsWithRoundData = roundsToCheck.map((round) => {
    const totalTickets = parseInt(round.totalTickets, 10)
    const calls = getViewUserTicketInfoCalls(totalTickets, account, round.lotteryId)
    return { calls, lotteryId: round.lotteryId, count: calls.length }
  })

  // Batch all calls across all rounds
  const multicalls = [].concat(...callsWithRoundData.map((callWithRoundData) => callWithRoundData.calls))

  try {
    const multicallRes = await multicallv2(lotteryV2Abi, multicalls, { requireSuccess: false })

    // Use callsWithRoundData to slice multicall responses by round
    const multicallResPerRound = []
    let resCount = 0
    for (let i = 0; i < callsWithRoundData.length; i += 1) {
      const callOptions = callsWithRoundData[i]

      multicallResPerRound.push(multicallRes.slice(resCount, resCount + callOptions.count))
      resCount += callOptions.count
    }
    const mergedMulticallResponse = multicallResPerRound.map((res) => mergeViewUserTicketInfoMulticallResponse(res))

    return mergedMulticallResponse
  } catch (error) {
    console.error(error)
    return []
  }
}

const fetchUnclaimedUserRewards = async (
  account: string,
  currentLotteryId: string,
  userLotteryData: LotteryUserGraphEntity,
  lotteriesData: LotteryRoundGraphEntity[],
): Promise<LotteryTicketClaimData[]> => {
  const { rounds } = userLotteryData

  // If there is no user round history - return an empty array
  if (rounds.length === 0) {
    return []
  }

  // If the web3 provider account doesn't equal the userLotteryData account, return an empty array - this is effectively a loading state as the user switches accounts
  if (userLotteryData.account.toLowerCase() !== account.toLowerCase()) {
    return []
  }

  // Filter out the current round unless it's claimable
  const filteredForLiveRound = rounds.filter((round) => {
    if (round.lotteryId === currentLotteryId) {
      return round.status === LotteryStatus.CLAIMABLE
    }
    return round.lotteryId !== currentLotteryId
  })

  // If there are any rounds tickets haven't been claimed for, OR a user has over 100 tickets in a round - check user tickets for those rounds
  const roundsToCheck = filteredForLiveRound.filter((round) => {
    return !round.claimed || parseInt(round.totalTickets, 10) > 100
  })

  if (roundsToCheck.length > 0) {
    const rawUserTicketData = await fetchUserTicketsForMultipleRounds(roundsToCheck, account)

    if (rawUserTicketData.length === 0) {
      // In case of error with ticket calls, return empty array
      return []
    }

    const roundIds = roundsToCheck.map((round) => round.lotteryId)
    const roundDataAndUserTickets = rawUserTicketData.map((rawRoundTicketData, index) => {
      return {
        roundId: roundIds[index],
        userTickets: processRawTicketsResponse(rawRoundTicketData),
        finalNumber: getWinningNumbersForRound(roundIds[index], lotteriesData),
      }
    })

    const winningTicketsForPastRounds = await Promise.all(
      roundDataAndUserTickets.map((roundData) => getWinningTickets(roundData)),
    )
    // Remove null values (returned when no winning tickets found for past round)
    return winningTicketsForPastRounds.filter((winningTicketData) => winningTicketData !== null)
  }
  // All rounds claimed, return empty array
  return []
}

export default fetchUnclaimedUserRewards

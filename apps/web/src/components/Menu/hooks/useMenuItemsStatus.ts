import { ChainId } from '@pancakeswap/sdk'
import { useActiveIfoWithBlocks } from 'hooks/useActiveIfoWithBlocks'
import { useIsUserLockedEnd } from 'hooks/useLockedEndNotification'
import { useMemo } from 'react'
import { useChainCurrentBlock } from 'state/block/hooks'
import { PotteryDepositStatus } from 'state/types'
import { getStatus } from 'views/Ifos/hooks/helpers'
import { useCompetitionStatus } from './useCompetitionStatus'
import { usePotteryStatus } from './usePotteryStatus'
import { useVotingStatus } from './useVotingStatus'

export const useMenuItemsStatus = (): Record<string, string> => {
  const currentBlock = useChainCurrentBlock(ChainId.BSC)
  const activeIfo = useActiveIfoWithBlocks()
  const competitionStatus = useCompetitionStatus()
  const potteryStatus = usePotteryStatus()
  const votingStatus = useVotingStatus()
  const isUserLocked = useIsUserLockedEnd()

  const ifoStatus =
    currentBlock && activeIfo && activeIfo.endBlock > currentBlock
      ? getStatus(currentBlock, activeIfo.startBlock, activeIfo.endBlock)
      : null

  return useMemo(() => {
    return {
      '/competition': competitionStatus,
      '/ifo': ifoStatus === 'coming_soon' ? 'soon' : ifoStatus,
      ...(potteryStatus === PotteryDepositStatus.BEFORE_LOCK && {
        '/pottery': 'pot_open',
      }),
      ...(votingStatus && {
        '/voting': 'vote_now',
      }),
      ...(isUserLocked && {
        '/voting': 'lock_end',
        '/ifo': 'lock_end',
        '/pools': 'lock_end',
        '/farms': 'lock_end',
      }),
    }
  }, [competitionStatus, ifoStatus, potteryStatus, votingStatus, isUserLocked])
}

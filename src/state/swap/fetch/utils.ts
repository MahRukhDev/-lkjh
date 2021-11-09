import times from 'lodash/times'
import { PairDataTimeWindowEnum } from '../types'
import { timeWindowGapMapping } from './constants'

type getPairSequentialIdParams = {
  id: string
  pairId: string
}
export const getPairSequentialId = ({ id, pairId }: getPairSequentialIdParams) => id.replace(`${pairId}-`, '')

type getPairHoursIdsByTimeWindowParams = {
  pairAddress: string
  pairLastId: string
  timeWindow: PairDataTimeWindowEnum
  idsCount: number
}

export const getIdsByTimeWindow = ({
  pairAddress,
  pairLastId,
  timeWindow,
  idsCount,
}: getPairHoursIdsByTimeWindowParams) => {
  const pairLastIdParsed = Number(pairLastId)
  if (timeWindow === PairDataTimeWindowEnum.DAY) {
    return []
  }
  return times(idsCount).map((value) => `${pairAddress}-${pairLastIdParsed - value * timeWindowGapMapping[timeWindow]}`)
}

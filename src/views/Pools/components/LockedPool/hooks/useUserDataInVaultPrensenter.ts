import format from 'date-fns/format'
import { convertTimeToSeconds, distanceToNowStrict } from 'utils/timeHelper'
import formatSecondsToWeeks from '../utils/formatSecondsToWeeks'

interface UserData {
  lockEndTime: string
  lockStartTime: string
}

interface UserDataInVaultPrensenter {
  weekDuration: string
  remainingWeeks: string
  lockEndDate: string
  secondDuration: number
}

type UserDataInVaultPrensenterFn = (args: UserData) => UserDataInVaultPrensenter

const useUserDataInVaultPrensenter: UserDataInVaultPrensenterFn = ({ lockEndTime, lockStartTime }) => {
  const secondDuration = Number(lockEndTime) - Number(lockStartTime)

  const lockEndTimeSeconds = convertTimeToSeconds(lockEndTime)

  return {
    weekDuration: formatSecondsToWeeks(secondDuration),
    remainingWeeks: distanceToNowStrict(lockEndTime),
    lockEndDate: format(lockEndTimeSeconds, 'MMM do, yyyy HH:mm'),
    secondDuration,
  }
}

export default useUserDataInVaultPrensenter

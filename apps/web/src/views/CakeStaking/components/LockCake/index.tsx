import { Grid } from '@pancakeswap/uikit'
import { stringify } from 'viem'
import { useLockModal } from 'views/CakeStaking/hooks/useLockModal'
import { useCakeLockStatus, useVeCakeUserInfo } from 'views/CakeStaking/hooks/useVeCakeUserInfo'
import { CakeLockStatus } from '../../types'
import { ApproveAndLockModal } from '../ApproveAndLockModal'
import { LockedVeCakeStatus } from '../LockedVeCakeStatus'
import { Expired } from './Expired'
import { Migrate } from './Migrate'
import { NotLocking } from './NotLocking'
import { Staking } from './Staking'

const customCols = {
  [CakeLockStatus.NotLocked]: '1fr',
  [CakeLockStatus.Expired]: 'auto 1fr',
}

export const LockCake = () => {
  const { data: veCakeUserInfo } = useVeCakeUserInfo()
  const { status } = useCakeLockStatus()

  const { modal, modalData } = useLockModal()

  return (
    <>
      <pre>{stringify(veCakeUserInfo, null, 2)}</pre>
      <ApproveAndLockModal {...modal} {...modalData} />
      <Grid
        gridGap="24px"
        gridTemplateColumns={customCols[status] ?? '1fr 2fr'}
        maxWidth={status === CakeLockStatus.Expired ? '78%' : '100%'}
        justifyItems={status === CakeLockStatus.Expired ? 'end' : 'start'}
        mx="auto"
      >
        <LockedVeCakeStatus status={status} />
        {status === CakeLockStatus.NotLocked ? <NotLocking /> : null}
        {status === CakeLockStatus.Locking ? <Staking /> : null}
        {status === CakeLockStatus.Expired ? <Expired /> : null}
        {status === CakeLockStatus.Migrate ? <Migrate /> : null}
      </Grid>
    </>
  )
}
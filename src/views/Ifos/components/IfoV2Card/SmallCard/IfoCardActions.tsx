import React from 'react'
import BigNumber from 'bignumber.js'
import { Button } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'
import { Token } from 'config/constants/types'
import { WalletIfoData, PublicIfoData, PoolIds } from 'hooks/ifo/v2/types'
import UnlockButton from 'components/UnlockButton'
import ContributeButton from './ContributeButton'
import ClaimButton from './ClaimButton'
import { SkeletonCardActions } from './Skeletons'

interface Props {
  poolId: PoolIds
  currency: Token
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  hasProfile: boolean
  isLoading: boolean
}

const IfoCardActions: React.FC<Props> = ({ currency, poolId, publicIfoData, walletIfoData, hasProfile, isLoading }) => {
  const { account } = useWeb3React()
  const userPoolCharacteristics = walletIfoData[poolId]

  if (isLoading) {
    return <SkeletonCardActions />
  }

  if (!account) {
    return <UnlockButton width="100%" />
  }

  if (!hasProfile) {
    return (
      <Button as={Link} to="/profile" width="100%">
        Activate your profile
      </Button>
    )
  }

  return (
    <>
      {publicIfoData.status === 'live' && (
        <ContributeButton
          poolId={poolId}
          currency={currency}
          contract={walletIfoData.contract}
          isPendingTx={userPoolCharacteristics.isPendingTx}
          addUserContributedAmount={(amount: BigNumber) => walletIfoData.addUserContributedAmount(amount, poolId)}
          userContribution={userPoolCharacteristics.amountTokenCommittedInLP}
          limitContributionPerUser={publicIfoData[poolId].limitPerUserInLP}
        />
      )}
      {publicIfoData.status === 'finished' &&
        !userPoolCharacteristics.hasClaimed &&
        (userPoolCharacteristics.offeringAmountInToken.isGreaterThan(0) ||
          userPoolCharacteristics.refundingAmountInLP.isGreaterThan(0)) && (
          <ClaimButton
            poolId={poolId}
            contract={walletIfoData.contract}
            isPendingTx={userPoolCharacteristics.isPendingTx}
            setPendingTx={(isPending: boolean) => walletIfoData.setPendingTx(isPending, poolId)}
            setIsClaimed={() => walletIfoData.setIsClaimed(poolId)}
          />
        )}
    </>
  )
}

export default IfoCardActions

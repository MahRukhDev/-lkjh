import useSWR from 'swr'
import { useModal } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import useVCake from 'views/Pools/hooks/useVCake'
import JoinRevenueModal from 'views/Pools/components/RevenueSharing/JoinRevenueModal'
import useCakeBenefits from 'components/Menu/UserMenu/hooks/useCakeBenefits'
import { VaultPosition } from 'utils/cakePool'
import { FetchStatus } from 'config/constants/types'

const useVCakeModal = () => {
  const { account, chainId } = useAccountActiveChain()
  const { isInitialization, refresh } = useVCake()
  const { data: cakeBenefits, status: cakeBenefitsFetchStatus } = useCakeBenefits()
  const [onPresentViewJoinRevenueModal] = useModal(
    <JoinRevenueModal refresh={refresh} />,
    true,
    true,
    'joinRevenueModal',
  )

  useSWR(
    account &&
      chainId === ChainId.BSC && [
        '/use-v-cake-modal',
        account,
        chainId,
        isInitialization,
        cakeBenefitsFetchStatus,
        cakeBenefits?.lockPosition,
      ],
    () => {
      if (
        isInitialization === false &&
        cakeBenefitsFetchStatus === FetchStatus.Fetched &&
        cakeBenefits?.lockPosition === VaultPosition.Locked
      ) {
        onPresentViewJoinRevenueModal()
      }
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    },
  )
}

export default useVCakeModal

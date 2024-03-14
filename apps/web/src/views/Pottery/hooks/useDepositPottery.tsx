import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import useCatchTxError from 'hooks/useCatchTxError'
import { usePotterytVaultContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { fetchPotteryUserDataAsync } from 'state/pottery'
import { Address } from 'wagmi'

export const useDepositPottery = (amount: string, potteryVaultAddress: Address) => {
  const { t } = useTranslation()
  const { account, chain } = useWeb3React()
  const dispatch = useAppDispatch()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: isPending } = useCatchTxError()
  const contract = usePotterytVaultContract(potteryVaultAddress)

  const handleDeposit = useCallback(async () => {
    const amountDeposit = new BigNumber(amount).multipliedBy(DEFAULT_TOKEN_DECIMAL).toString()
    const receipt = await fetchWithCatchTxError(async () =>
      account
        ? contract.write.deposit([BigInt(amountDeposit), account], {
            account,
            chain,
          })
        : undefined,
    )

    if (receipt?.status) {
      toastSuccess(
        t('Success!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your funds have been staked in the pool')}
        </ToastDescriptionWithTx>,
      )
      if (account) dispatch(fetchPotteryUserDataAsync(account))
    }
  }, [amount, fetchWithCatchTxError, contract.write, account, chain, toastSuccess, t, dispatch])

  return { isPending, handleDeposit }
}

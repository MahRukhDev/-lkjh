// import { MaxUint256 } from '@ethersproject/constants'
// import { parseUnits } from '@ethersproject/units'
// import { useAccount } from '@pancakeswap/awgmi'
import { useTranslation } from '@pancakeswap/localization'
// import { bscTokens } from '@pancakeswap/tokens'
import {
  BalanceInput,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Message,
  Modal,
  ModalBody,
  Text,
  TooltipText,
  // useToast,
  useTooltip,
} from '@pancakeswap/uikit'
import { formatNumber, getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import ApproveConfirmButtons from 'components/ApproveConfirmButtons'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { Ifo, PoolIds } from 'config/constants/types'
// import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
// import { useERC20 } from 'hooks/useContract'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
// import { requiresApproval } from 'utils/requiresApproval'
import { PublicIfoData, WalletIfoData } from 'views/Ifos/types'

const MessageTextLink = styled(Link)`
  display: inline;
  text-decoration: underline;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
`
interface Props {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  userCurrencyBalance: BigNumber
  creditLeft: BigNumber
  onSuccess: (amount: BigNumber, txHash: string) => void
  onDismiss?: () => void
}

const multiplierValues = [0.1, 0.25, 0.5, 0.75, 1]

// Default value for transaction setting, tweak based on BSC network congestion.
// const gasPrice = parseUnits('10', 'gwei').toString()

const SmallAmountNotice: React.FC<React.PropsWithChildren<{ url: string }>> = ({ url }) => {
  const { t } = useTranslation()

  return (
    <Box maxWidth="350px">
      <Message variant="warning" mb="16px">
        <Box>
          <Text fontSize="14px" color="#D67E0A">
            {t('This IFO has token vesting. Purchased tokens are released over a period of time.')}
          </Text>
          <MessageTextLink external href={url} color="#D67E0A" display="inline">
            {t('Learn more in the vote proposal')}
          </MessageTextLink>
        </Box>
      </Message>
    </Box>
  )
}

const ContributeModal: React.FC<React.PropsWithChildren<Props>> = ({
  poolId,
  ifo,
  publicIfoData,
  walletIfoData,
  userCurrencyBalance,
  onDismiss,
  // onSuccess,
}) => {
  const publicPoolCharacteristics = publicIfoData[poolId]
  const userPoolCharacteristics = walletIfoData[poolId]

  const { currency, articleUrl } = ifo
  // const { toastSuccess } = useToast()
  const { limitPerUserInLP, vestingInformation } = publicPoolCharacteristics
  const { amountTokenCommittedInLP } = userPoolCharacteristics
  // const { contract } = walletIfoData
  // const { account } = useAccount()
  // const { callWithGasPrice } = useCallWithGasPrice()
  // const raisingTokenContractReader = useERC20(currency.address, false)
  // const raisingTokenContractApprover = useERC20(currency.address)
  const { t } = useTranslation()

  const [value, setValue] = useState('')

  const valueWithTokenDecimals = new BigNumber(value).times(DEFAULT_TOKEN_DECIMAL)
  // const label = currency === bscTokens.cake ? t('Max. CAKE entry') : t('Max. token entry')
  const label = t('Max. token entry')

  const maximumTokenEntry = useMemo(() => {
    // No concept of credit initially, max is the user's balance.
    return userCurrencyBalance
  }, [userCurrencyBalance])

  // include user balance for input
  const maximumTokenCommittable = useMemo(() => {
    return maximumTokenEntry.isLessThanOrEqualTo(userCurrencyBalance) ? maximumTokenEntry : userCurrencyBalance
  }, [maximumTokenEntry, userCurrencyBalance])

  const isWarning =
    valueWithTokenDecimals.isGreaterThan(userCurrencyBalance) || valueWithTokenDecimals.isGreaterThan(maximumTokenEntry)
  const isConfirmed = false
  const isConfirming = false
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleApprove = () => {} // TODO: Aptos doesn't have approval.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleConfirm = () => {}

  return (
    <Modal title={t('Contribute %symbol%', { symbol: currency.symbol })} onDismiss={onDismiss}>
      <ModalBody maxWidth="360px">
        <Box p="2px">
          <Flex justifyContent="space-between" mb="16px">
            <Text>{label}:</Text>
            <Text>{`${formatNumber(getBalanceAmount(maximumTokenEntry, currency.decimals).toNumber(), 3, 3)} ${
              ifo.currency.symbol
            }`}</Text>
          </Flex>
          <Flex justifyContent="space-between" mb="8px">
            <Text>{t('Commit')}:</Text>
            <Flex flexGrow={1} justifyContent="flex-end">
              <Image
                src={
                  ifo.currency.symbol === 'CAKE'
                    ? '/images/cake.svg'
                    : `/images/farms/${currency.symbol.split(' ')[0].toLowerCase()}.svg`
                }
                width={24}
                height={24}
              />
              <Text ml="4px">{currency.symbol}</Text>
            </Flex>
          </Flex>
          <BalanceInput
            value={value}
            currencyValue={`${publicIfoData.currencyPriceInUSD.times(value || 0).toFixed(2)} USD`}
            onUserInput={setValue}
            isWarning={isWarning}
            decimals={currency.decimals}
            onBlur={() => {
              if (isWarning) {
                // auto adjust to max value
                setValue(getBalanceAmount(maximumTokenCommittable).toString())
              }
            }}
            mb="8px"
          />
          {isWarning && (
            <Text
              color={valueWithTokenDecimals.isGreaterThan(userCurrencyBalance) ? 'failure' : 'warning'}
              textAlign="right"
              fontSize="12px"
              mb="8px"
            >
              {valueWithTokenDecimals.isGreaterThan(userCurrencyBalance)
                ? t('Insufficient Balance')
                : t('Exceeded max CAKE entry')}
            </Text>
          )}
          <Text color="textSubtle" textAlign="right" fontSize="12px" mb="16px">
            {t('Balance: %balance%', {
              balance: getBalanceAmount(userCurrencyBalance, currency.decimals).toString(),
            })}
          </Text>
          <Flex justifyContent="space-between" mb="16px">
            {multiplierValues.map((multiplierValue, index) => (
              <Button
                key={multiplierValue}
                scale="xs"
                variant="tertiary"
                onClick={() => setValue(getBalanceAmount(maximumTokenCommittable.times(multiplierValue)).toString())}
                mr={index < multiplierValues.length - 1 ? '8px' : 0}
              >
                {multiplierValue * 100}%
              </Button>
            ))}
          </Flex>
          {(vestingInformation?.percentage ?? 0) > 0 && <SmallAmountNotice url={articleUrl} />}
          <Text color="textSubtle" fontSize="12px" mb="24px">
            {t(
              'If you don’t commit enough CAKE, you may not receive a meaningful amount of IFO tokens, or you may not receive any IFO tokens at all.',
            )}
            <Link
              fontSize="12px"
              display="inline"
              href="https://docs.pancakeswap.finance/products/ifo-initial-farm-offering"
              external
            >
              {t('Read more')}
            </Link>
          </Text>
          <ApproveConfirmButtons
            isApproveDisabled
            isApproving={false}
            isConfirmDisabled={
              isConfirmed || valueWithTokenDecimals.isNaN() || valueWithTokenDecimals.eq(0) || isWarning
            }
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
          />
        </Box>
      </ModalBody>
    </Modal>
  )
}

export default ContributeModal

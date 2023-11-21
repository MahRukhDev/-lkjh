import { useTranslation } from '@pancakeswap/localization'
import {
  AutoColumn,
  Balance,
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  FlexGap,
  Heading,
  InfoFilledIcon,
  Link,
  Message,
  RowBetween,
  Tag,
  Text,
  WarningIcon,
} from '@pancakeswap/uikit'
import { formatBigInt, getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useCakePrice } from 'hooks/useCakePrice'
import { useVeCakeBalance } from 'hooks/useTokenBalance'
import { useMemo } from 'react'
import styled from 'styled-components'
import { formatTime } from 'utils/formatTime'
import { CakeLockStatus } from 'views/CakeStaking/types'
import { useCakeLockStatus } from '../hooks/useVeCakeUserInfo'
import { useWriteMigrateCallback } from '../hooks/useContractWrite/useWriteMigrateCallback'
import { Tooltips } from './Tooltips'
import { useProxyVeCakeBalance } from '../hooks/useProxyVeCakeBalance'
import { useCurrentBlockTimestamp } from '../hooks/useCurrentBlockTimestamp'

dayjs.extend(relativeTime)

export const LockedVeCakeStatus: React.FC<{
  status: CakeLockStatus
}> = ({ status }) => {
  const { balance } = useVeCakeBalance()
  const { balance: proxyBalance } = useProxyVeCakeBalance()
  const balanceBN = useMemo(() => getBalanceNumber(balance), [balance])
  const proxyCake = useMemo(() => getBalanceNumber(proxyBalance), [proxyBalance])
  if (status === CakeLockStatus.NotLocked) return null

  console.debug('debug balance', getBalanceNumber(proxyBalance))
  const balanceText =
    balanceBN < 0.01 ? (
      <UnderlineText fontSize="20px" bold color={balance.eq(0) ? 'failure' : 'secondary'}>
        {`< 0.01`}
      </UnderlineText>
    ) : (
      <UnderlinedBalance
        fontSize="20px"
        bold
        color={balance.eq(0) ? 'failure' : 'secondary'}
        value={getBalanceNumber(balance)}
        decimals={2}
      />
    )
  return (
    <Box maxWidth={['100%', '100%', '369px']} width="100%">
      <Card isActive>
        <CardHeader>
          <RowBetween>
            <AutoColumn>
              <Heading color="text">My VeCAKE</Heading>
              {proxyBalance.gt(0) ? (
                <Tooltips content={<FromProxyTooltip proxyCake={proxyCake} />}>{balanceText}</Tooltips>
              ) : (
                balanceText
              )}
            </AutoColumn>
            <img srcSet="/images/cake-staking/token-vecake.png 2x" alt="token-vecake" />
          </RowBetween>
        </CardHeader>
        <LockedInfo />
      </Card>
    </Box>
  )
}

export const StyledLockedCard = styled(AutoColumn)`
  padding: 12px;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
`

const CUSTOM_WARNING_COLOR = '#D67E0A'

const LockedInfo = () => {
  const { t } = useTranslation()
  const migrate = useWriteMigrateCallback()
  const {
    cakeUnlockTime,
    shouldMigrate,
    nativeCakeLockedAmount,
    proxyCakeLockedAmount,
    cakePoolLocked,
    cakePoolUnlockTime,
    cakeLocked,
    cakeLockExpired,
    cakePoolLockExpired,
  } = useCakeLockStatus()
  return (
    <FlexGap flexDirection="column" gap="24px" margin={24}>
      {shouldMigrate ? (
        <RowBetween>
          <Text color="textSubtle" bold fontSize={12} textTransform="uppercase">
            {t('my cake staking')}
          </Text>
          <Tag variant="failure" scale="sm" startIcon={<WarningIcon color="white" />} px="8px">
            {t('Migration Needed')}
          </Tag>
        </RowBetween>
      ) : null}
      <StyledLockedCard gap="16px">
        <RowBetween>
          <AutoColumn>
            <Text fontSize={12} color="textSubtle" textTransform="uppercase" bold>
              {t('cake locked')}
            </Text>
            <CakeLocked nativeCakeLocked={nativeCakeLockedAmount} proxyCakeLocked={proxyCakeLockedAmount} />
          </AutoColumn>
          <AutoColumn>
            <Text fontSize={12} color="textSubtle" textTransform="uppercase" bold>
              {t('unlocks in')}
            </Text>
            <CakeUnlockAt
              proxyCakeLocked={proxyCakeLockedAmount}
              nativeLocked={cakeLocked}
              nativeExpired={cakeLockExpired}
              proxyLocked={cakePoolLocked}
              proxyExpired={cakePoolLockExpired}
              nativeUnlockTime={cakeUnlockTime}
              proxyUnlockTime={cakePoolUnlockTime}
            />
          </AutoColumn>
        </RowBetween>
        {shouldMigrate ? (
          <Button width="100%" onClick={migrate}>
            {t('Migrate to veCAKE')}
          </Button>
        ) : null}
      </StyledLockedCard>
      {cakePoolLockExpired ? (
        <>
          <Message variant="primary" icon={<InfoFilledIcon color="secondary" />}>
            <AutoColumn gap="8px">
              <Text as="p">
                {t(
                  'Position migrated from CAKE Pool can not be extended or topped up. To extend or add more CAKE, set up a native veCAKE position.',
                )}
              </Text>
              <Link href="https://@todo" color="text">
                {t('Learn More >>')}
              </Link>
            </AutoColumn>
          </Message>
          <Link external style={{ textDecoration: 'none', width: '100%' }} href="https://@todo">
            <Button width="100%" variant="secondary">
              {t('View CAKE Pool Position')}
            </Button>
          </Link>
        </>
      ) : null}
      {cakeLockExpired ? (
        <Message variant="warning" icon={<InfoFilledIcon color={CUSTOM_WARNING_COLOR} />}>
          <Text as="p" color={CUSTOM_WARNING_COLOR}>
            {t(
              'Renew your veCAKE position to continue enjoying the benefits of weekly CAKE yield, revenue share, gauges voting, farm yield boosting, participating in IFOs, and so much more!',
            )}
          </Text>
        </Message>
      ) : null}
      {shouldMigrate ? (
        <Message variant="warning" icon={<InfoFilledIcon color={CUSTOM_WARNING_COLOR} />}>
          <Text as="p" color={CUSTOM_WARNING_COLOR}>
            {t(
              'Migrate your CAKE staking position to veCAKE and enjoy the benefits of weekly CAKE yield, revenue share, gauges voting, farm yield boosting, participating in IFOs, and so much more!',
            )}
          </Text>
        </Message>
      ) : null}
      {!cakeLockExpired && !shouldMigrate ? (
        <Flex justifyContent="center">
          <img src="/images/cake-staking/my-cake-bunny.png" alt="my-cake-bunny" width="254px" />
        </Flex>
      ) : null}
    </FlexGap>
  )
}

const FromProxyTooltip: React.FC<{
  proxyCake: number
}> = ({ proxyCake }) => {
  const { t } = useTranslation()

  return (
    <>
      {t('%amount% veCAKE from CAKE Pool migrated position.', { amount: proxyCake })}
      <Link href="http://@todo">
        {t('Learn More')} {'>>'}
      </Link>
    </>
  )
}

const ProxyUnlockTooltip: React.FC<{
  proxyExpired: boolean
  proxyCake: number
  proxyUnlockTime: number
}> = ({ proxyExpired, proxyCake, proxyUnlockTime }) => {
  const { t } = useTranslation()

  return (
    <>
      {t(
        proxyExpired
          ? '%amount% CAKE from CAKE Pool migrated position is already unlocked. Go to the pool page to withdraw these CAKE.'
          : '%amount% CAKE from CAKE Pool migrated position will unlock on %expiredAt%.',
        {
          amount: proxyCake,
          expiredAt: formatTime(Number(dayjs.unix(proxyUnlockTime))),
        },
      )}
      <Link href="http://@todo">
        {t('Learn More')} {'>>'}
      </Link>
    </>
  )
}

export const CakeLocked: React.FC<{
  nativeCakeLocked: bigint
  proxyCakeLocked: bigint
}> = ({ nativeCakeLocked, proxyCakeLocked }) => {
  const cakePrice = useCakePrice()
  const nativeCake = useMemo(() => Number(formatBigInt(nativeCakeLocked, 18)), [nativeCakeLocked])
  const nativeCakeUsdValue: number = useMemo(() => {
    return cakePrice.times(nativeCake).toNumber()
  }, [cakePrice, nativeCake])
  const proxyCake = useMemo(() => Number(formatBigInt(proxyCakeLocked, 18)), [proxyCakeLocked])
  const totalCake = useMemo(
    () => Number(formatBigInt(nativeCakeLocked + proxyCakeLocked, 18)),
    [nativeCakeLocked, proxyCakeLocked],
  )
  const totalCakeUsdValue: number = useMemo(() => {
    return cakePrice.times(totalCake).toNumber()
  }, [cakePrice, totalCake])

  if (!proxyCakeLocked && nativeCakeLocked) {
    return (
      <>
        <Balance value={nativeCake} decimals={2} fontWeight={600} fontSize={20} />
        <Balance prefix="~" value={nativeCakeUsdValue} decimals={2} unit="USD" fontSize={12} />
      </>
    )
  }

  return (
    <>
      <Tooltips content={<FromProxyTooltip proxyCake={proxyCake} />}>
        <UnderlinedBalance value={totalCake} decimals={2} fontWeight={600} fontSize={20} />
      </Tooltips>
      <Balance prefix="~" value={totalCakeUsdValue} decimals={2} unit="USD" fontSize={12} />
    </>
  )
}

const CakeUnlockAt: React.FC<{
  proxyCakeLocked: bigint
  nativeLocked: boolean
  nativeExpired: boolean
  proxyLocked: boolean
  proxyExpired: boolean
  nativeUnlockTime: number
  proxyUnlockTime: number
}> = ({
  proxyCakeLocked,
  nativeLocked,
  nativeExpired,
  nativeUnlockTime,
  proxyLocked,
  proxyExpired,
  proxyUnlockTime,
}) => {
  const { t } = useTranslation()
  const proxyCake = useMemo(() => Number(formatBigInt(proxyCakeLocked, 18)), [proxyCakeLocked])
  const now = useCurrentBlockTimestamp()
  const [unlocked, unlockTime, unlockTimeToNow] = useMemo(() => {
    const nowDay = dayjs.unix(Number(now || 0))
    if (!nativeLocked && proxyLocked) {
      return [proxyExpired, proxyUnlockTime, proxyUnlockTime ? dayjs.unix(proxyUnlockTime).from(nowDay, true) : '']
    }
    return [nativeExpired, nativeUnlockTime, nativeUnlockTime ? dayjs.unix(nativeUnlockTime).from(nowDay, true) : '']
  }, [nativeExpired, nativeLocked, nativeUnlockTime, now, proxyExpired, proxyLocked, proxyUnlockTime])

  const TextComp = proxyLocked ? UnderlineText : Text

  const unlockText = (
    <>
      {unlocked ? (
        <TextComp fontWeight={600} fontSize={20} color={CUSTOM_WARNING_COLOR}>
          {t('Unlocked')}
        </TextComp>
      ) : (
        <TextComp fontWeight={600} fontSize={20}>
          {unlockTimeToNow}
        </TextComp>
      )}

      {unlockTime ? (
        <Text fontSize={12} color={unlocked ? CUSTOM_WARNING_COLOR : undefined}>
          {t('on')} {formatTime(Number(dayjs.unix(unlockTime)))}
        </Text>
      ) : null}
    </>
  )

  if (!proxyLocked) return unlockText

  return (
    <Tooltips
      content={
        <ProxyUnlockTooltip proxyExpired={proxyExpired} proxyCake={proxyCake} proxyUnlockTime={proxyUnlockTime} />
      }
    >
      {unlockText}
    </Tooltips>
  )
}

const UnderlinedBalance = styled(Balance)`
  text-decoration: underline dotted;
  text-decoration-color: ${({ theme }) => theme.colors.textSubtle};
  text-underline-offset: 0.1em;
`

const UnderlineText = styled(Text)`
  text-decoration: underline dotted;
  text-decoration-color: currentColor;
  text-underline-offset: 0.1em;
`

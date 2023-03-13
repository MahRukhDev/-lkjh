import {
  AutoRow,
  Button,
  Card,
  CardBody,
  Flex,
  NextLinkFromReactRouter,
  Text,
  Box,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import { AppHeader } from 'components/App'
import { useMemo } from 'react'

import { useRouter } from 'next/router'
import { CHAIN_IDS } from 'utils/wagmi'
import Page from 'views/Page'
import styled from 'styled-components'
import { useStableSwapPairs } from 'state/swap/useStableSwapPairs'
import stableSwapInfoABI from 'config/abi/infoStableSwap.json'

import { CurrencyAmount } from '@pancakeswap/sdk'
import { LightGreyCard } from 'components/Card'
import { CurrencyLogo } from 'components/Logo'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useContract } from 'hooks/useContract'
import { usePoolTokenPercentage, useTotalUSDValue } from 'components/PositionCard'
import { useAccount } from 'wagmi'
import { useTokenBalance } from 'state/wallet/hooks'
import { useGetRemovedTokenAmountsNoContext } from 'views/RemoveLiquidity/RemoveStableLiquidity/hooks/useStableDerivedBurnInfo'
import useTotalSupply from 'hooks/useTotalSupply'

export const BodyWrapper = styled(Card)`
  border-radius: 24px;
  max-width: 858px;
  width: 100%;
  z-index: 1;
`

export default function StablePoolPage() {
  const router = useRouter()
  const { address: account } = useAccount()

  const { address: poolAddress } = router.query

  const lpTokens = useStableSwapPairs()

  const selectedLp = lpTokens.find(({ liquidityToken }) => liquidityToken.address === poolAddress)

  const stableSwapInfoContract = useContract(selectedLp?.infoStableSwapAddress, stableSwapInfoABI)

  const { result } = useSingleCallResult(stableSwapInfoContract, 'balances', [selectedLp?.stableSwapAddress])

  const reserves = useMemo(() => (result ? result[0] : ['0', '0']), [result])

  const stableLp = useMemo(() => {
    return selectedLp
      ? [selectedLp].map((lpToken) => ({
          ...lpToken,
          tokenAmounts: [],
          reserve0: CurrencyAmount.fromRawAmount(lpToken?.token0, reserves[0]),
          reserve1: CurrencyAmount.fromRawAmount(lpToken?.token1, reserves[1]),
          getLiquidityValue: () => CurrencyAmount.fromRawAmount(lpToken?.token0, '0'),
        }))[0]
      : null
  }, [reserves, selectedLp])

  const totalLiquidityUSD = useTotalUSDValue({
    currency0: selectedLp?.token0,
    currency1: selectedLp?.token1,
    token0Deposited: stableLp?.reserve0,
    token1Deposited: stableLp?.reserve1,
  })

  const userPoolBalance = useTokenBalance(account ?? undefined, selectedLp?.liquidityToken)

  const [token0Deposited, token1Deposited] = useGetRemovedTokenAmountsNoContext({
    lpAmount: userPoolBalance?.quotient?.toString(),
    token0: selectedLp?.token0.wrapped,
    token1: selectedLp?.token1.wrapped,
    stableSwapInfoContract,
    stableSwapAddress: selectedLp?.stableSwapAddress,
  })

  const totalUSDValue = useTotalUSDValue({
    currency0: selectedLp?.token0,
    currency1: selectedLp?.token1,
    token0Deposited,
    token1Deposited,
  })

  const totalPoolTokens = useTotalSupply(selectedLp?.liquidityToken)

  const poolTokenPercentage = usePoolTokenPercentage({ totalPoolTokens, userPoolBalance })

  const { isMobile } = useMatchBreakpoints()

  if (!selectedLp) return null

  return (
    <Page>
      <BodyWrapper>
        <AppHeader
          title={`${stableLp?.token0?.symbol}-${stableLp?.token1?.symbol} LP`}
          backTo="/liquidity"
          noConfig
          buttons={
            !isMobile && (
              <>
                <NextLinkFromReactRouter
                  to={`/add/${stableLp?.token0?.wrapped.address}/${stableLp?.token1?.wrapped.address}?stable=1`}
                >
                  <Button width="100%">Add</Button>
                </NextLinkFromReactRouter>
                <NextLinkFromReactRouter
                  to={`/v2/remove/${stableLp?.token0?.wrapped.address}/${stableLp?.token1?.wrapped.address}?stable=1`}
                >
                  <Button ml="16px" variant="secondary" width="100%">
                    Remove
                  </Button>
                </NextLinkFromReactRouter>
              </>
            )
          }
        />
        <CardBody>
          {isMobile && (
            <>
              <NextLinkFromReactRouter
                to={`/add/${stableLp?.token0?.wrapped.address}/${stableLp?.token1?.wrapped.address}?stable=1`}
              >
                <Button mb="8px" width="100%">
                  Add
                </Button>
              </NextLinkFromReactRouter>
              <NextLinkFromReactRouter
                to={`/v2/remove/${stableLp?.token0?.wrapped.address}/${stableLp?.token1?.wrapped.address}?stable=1`}
              >
                <Button mb="8px" variant="secondary" width="100%">
                  Remove
                </Button>
              </NextLinkFromReactRouter>
            </>
          )}
          <AutoRow>
            <Flex alignItems="center" justifyContent="space-between" width="100%" flexWrap={['wrap', 'wrap', 'nowrap']}>
              <Box width="100%" mr="4px" mb="16px">
                <Text fontSize="12px" color="secondary" bold textTransform="uppercase">
                  Liquidity
                </Text>
                <Text fontSize="24px" fontWeight={500}>
                  $
                  {totalUSDValue
                    ? totalUSDValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : '-'}
                </Text>
                <LightGreyCard mr="4px">
                  <AutoRow justifyContent="space-between" mb="8px">
                    <Flex>
                      <CurrencyLogo currency={stableLp?.token0} />
                      <Text small color="textSubtle" id="remove-liquidity-tokenb-symbol" ml="4px">
                        {stableLp?.token0?.symbol}
                      </Text>
                    </Flex>
                    <Flex justifyContent="center">
                      <Text mr="4px">{token0Deposited?.toSignificant(6)}</Text>
                    </Flex>
                  </AutoRow>
                  <AutoRow justifyContent="space-between" mb="8px">
                    <Flex>
                      <CurrencyLogo currency={stableLp?.token1} />
                      <Text small color="textSubtle" id="remove-liquidity-tokenb-symbol" ml="4px">
                        {stableLp?.token1?.symbol}
                      </Text>
                    </Flex>
                    <Flex justifyContent="center">
                      <Text mr="4px">{token1Deposited?.toSignificant(6)}</Text>
                    </Flex>
                  </AutoRow>
                </LightGreyCard>
              </Box>
              <Box width="100%" mr="4px" mb="16px">
                <Text fontSize="12px" color="secondary" bold textTransform="uppercase">
                  Pool reserves
                </Text>
                <Text fontSize="24px" fontWeight={500}>
                  $
                  {totalLiquidityUSD
                    ? totalLiquidityUSD.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : '-'}
                </Text>
                <LightGreyCard mr="4px">
                  <AutoRow justifyContent="space-between" mb="8px">
                    <Flex>
                      <CurrencyLogo currency={stableLp?.token0} />
                      <Text small color="textSubtle" id="remove-liquidity-tokenb-symbol" ml="4px">
                        {stableLp?.token0?.symbol}
                      </Text>
                    </Flex>
                    <Flex justifyContent="center">
                      <Text mr="4px">{stableLp?.reserve0?.toSignificant(6)}</Text>
                    </Flex>
                  </AutoRow>
                  <AutoRow justifyContent="space-between" mb="8px">
                    <Flex>
                      <CurrencyLogo currency={stableLp?.token1} />
                      <Text small color="textSubtle" id="remove-liquidity-tokenb-symbol" ml="4px">
                        {stableLp?.token1?.symbol}
                      </Text>
                    </Flex>
                    <Flex justifyContent="center">
                      <Text mr="4px">{stableLp?.reserve1?.toSignificant(6)}</Text>
                    </Flex>
                  </AutoRow>
                </LightGreyCard>
              </Box>
            </Flex>
          </AutoRow>
          <Text color="textSubtle">
            Your share in pool: {poolTokenPercentage ? `${poolTokenPercentage.toFixed(8)}%` : '-'}
          </Text>
        </CardBody>
      </BodyWrapper>
    </Page>
  )
}

StablePoolPage.chains = CHAIN_IDS

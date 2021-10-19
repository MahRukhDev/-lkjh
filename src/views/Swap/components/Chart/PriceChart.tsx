import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  ButtonMenu,
  ButtonMenuItem,
  Flex,
  Skeleton,
  SyncAltIcon,
  Text,
} from '@pancakeswap/uikit'
import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'
import { format } from 'date-fns'
import React, { useState } from 'react'
import SwapLineChart from './SwapLineChart'
import { StyledExpandButton, StyledPriceChart, StyledSwapButton } from './styles'
import { getTimewindowChange } from './utils'

const PriceChart = ({
  lineChartData = [],
  setTimeWindow,
  timeWindow,
  inputCurrency,
  outputCurrency,
  onSwitchTokens,
  isDark,
  isChartExpanded,
  setIsChartExpanded,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const [hoverDate, setHoverDate] = useState<string | undefined>()
  const currentDate = format(new Date(), 'MMM d, yyyy')
  const valueToDisplay = hoverValue || lineChartData[lineChartData.length - 1]?.value
  const { changePercentage, changeValue } = getTimewindowChange(lineChartData)
  const isChangePositive = changeValue >= 0

  const toggleExpanded = () => setIsChartExpanded((currentIsExpanded) => !currentIsExpanded)

  return (
    <StyledPriceChart $isDark={isDark} $isExpanded={isChartExpanded} p="24px">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          {outputCurrency ? (
            <DoubleCurrencyLogo currency0={inputCurrency} currency1={outputCurrency} size={24} margin />
          ) : (
            inputCurrency && <CurrencyLogo currency={inputCurrency} size="24px" style={{ marginRight: '8px' }} />
          )}
          {inputCurrency && (
            <Text color="text" bold>
              {outputCurrency ? `${inputCurrency.symbol}/${outputCurrency.symbol}` : inputCurrency.symbol}
            </Text>
          )}
          <StyledSwapButton type="button" onClick={onSwitchTokens}>
            <SyncAltIcon ml="6px" color="primary" />
          </StyledSwapButton>
        </Flex>
        {setIsChartExpanded && (
          <Flex>
            <StyledExpandButton type="button" onClick={toggleExpanded}>
              {isChartExpanded ? <ArrowUpIcon color="text" /> : <ArrowDownIcon color="text" />}
            </StyledExpandButton>
          </Flex>
        )}
      </Flex>
      <Flex
        flexDirection={['column', null, null, null, 'row']}
        alignItems={['flex-start', null, null, null, 'center']}
        justifyContent="space-between"
      >
        <Flex flexDirection="column" pt="12px">
          {lineChartData?.length > 0 ? (
            <Flex alignItems="flex-end">
              <Text fontSize="40px" mr="8px" bold>
                {valueToDisplay}
              </Text>
              <Text color="textSubtle" fontSize="20px" mb="8px" bold>
                {outputCurrency?.symbol}
              </Text>
              <Text color={isChangePositive ? 'success' : 'failure'} fontSize="20px" mb="8px" bold>
                {`${changeValue} (${changePercentage}%)`}
              </Text>
            </Flex>
          ) : (
            <Skeleton height="36px" width="128px" />
          )}
          <Text small color="secondary">
            {hoverDate || currentDate}
          </Text>
        </Flex>
        <Box mr="40px">
          <ButtonMenu activeIndex={timeWindow} onItemClick={setTimeWindow} scale="sm">
            <ButtonMenuItem>24H</ButtonMenuItem>
            <ButtonMenuItem>1W</ButtonMenuItem>
            <ButtonMenuItem>1M</ButtonMenuItem>
            <ButtonMenuItem>1Y</ButtonMenuItem>
            <ButtonMenuItem>All time</ButtonMenuItem>
          </ButtonMenu>
        </Box>
      </Flex>
      <Box height={isChartExpanded ? 'calc(100% - 120px)' : '516px'} width="100%">
        <SwapLineChart
          data={lineChartData}
          setHoverValue={setHoverValue}
          setHoverDate={setHoverDate}
          isChangePositive={isChangePositive}
          timeWindow={timeWindow}
        />
      </Box>
    </StyledPriceChart>
  )
}

export default PriceChart

import styled from 'styled-components'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { Tag, Flex, Heading, Skeleton, Farm as FarmUI, AutoRow } from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import { TokenPairImage } from 'components/TokenImage'
import { v3PromotionFarms, V3SwapPromotionIcon } from 'components/V3SwapPromotionIcon'
import BoostedTag from '../YieldBooster/components/BoostedTag'

const { FarmAuctionTag, StableFarmTag, V2Tag, V3FeeTag } = FarmUI.Tags

type ExpandableSectionProps = {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
  boosted?: boolean
  isStable?: boolean
  version: 3 | 2
  feeAmount?: FeeAmount
  pid?: number
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<React.PropsWithChildren<ExpandableSectionProps>> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  token,
  quoteToken,
  boosted,
  isStable,
  version,
  feeAmount,
  pid,
}) => {
  const isReady = multiplier !== undefined

  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      {isReady ? (
        <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} />
      ) : (
        <Skeleton mr="8px" width={63} height={63} variant="circle" />
      )}
      <Flex flexDirection="column" alignItems="flex-end">
        {isReady ? (
          <Heading mb="4px">
            {v3PromotionFarms[pid] && <V3SwapPromotionIcon />} {lpLabel.split(' ')[0]}
          </Heading>
        ) : (
          <Skeleton mb="4px" width={60} height={18} />
        )}
        <AutoRow gap="4px" justifyContent="flex-end">
          {isReady && isStable ? <StableFarmTag /> : version === 2 ? <V2Tag /> : null}
          {isReady && version === 3 && <V3FeeTag feeAmount={feeAmount} />}
          {isReady && boosted && <BoostedTag />}
          {isReady && isCommunityFarm && <FarmAuctionTag />}
          {isReady ? (
            <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
          ) : (
            <Skeleton ml="4px" width={42} height={28} />
          )}
        </AutoRow>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading

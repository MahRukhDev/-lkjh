import React from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, LinkExternal, PlayCircleOutlineIcon, Text, useTooltip } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { RoundResult } from '../RoundResult'
import Card from './Card'
import CardHeader from './CardHeader'

interface LiveRoundCardProps {
  bid: any
}

const LeaderRoundCard: React.FC<LiveRoundCardProps> = ({
  bid
}) => {
  const { t } = useTranslation()
  const StyledExpiredRoundCard = styled(Card)`
  opacity: 0.7;
  transition: opacity 300ms;

  &:hover {
    opacity: 1;
  }
`

  const tooltipContent = (
    <Box width="256px">
      {t('The final price at the end of a round may be different from the price shown on the live feed.')}
    </Box>
  )

  return (
      <StyledExpiredRoundCard>
        <CardHeader
          status="outbid"
          icon={<PlayCircleOutlineIcon mr="4px" width="24px" color="secondary" />}
          title={t('Leader')}
          bid={bid}
        />
        <CardBody p="16px" style={{ position: 'relative' }}>
          <RoundResult bid={bid} />
        </CardBody>
      </StyledExpiredRoundCard>
  )
}

export default LeaderRoundCard

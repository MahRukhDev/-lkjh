import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Box } from '@pancakeswap/uikit'

const StyledCard = styled(Card)<{ background: string; borderColor: string; rotation?: string }>`
  height: fit-content;
  flex: 1;
  background: ${({ background }) => background};
  border: 2px solid ${({ borderColor }) => borderColor};
  box-sizing: border-box;
  box-shadow: 0px 4px 0px ${({ borderColor }) => borderColor};
  ${({ rotation }) => (rotation ? `transform: rotate(${rotation});` : '')}
`

const IconWrapper = styled(Box)<{ rotation?: string }>`
  position: absolute;
  top: 24px;
  right: 24px;
  ${({ rotation }) => (rotation ? `transform: rotate(${rotation});` : '')}
`

interface IconCardProps extends IconCardData {
  children: ReactNode
}

export interface IconCardData {
  icon: ReactNode
  background: string
  borderColor: string
  rotation?: string
}

const IconCard: React.FC<IconCardProps> = ({ icon, background, borderColor, rotation, children }) => {
  return (
    <StyledCard background={background} borderColor={borderColor} rotation={rotation}>
      <CardBody>
        <IconWrapper rotation={rotation}>{icon}</IconWrapper>
        {children}
      </CardBody>
    </StyledCard>
  )
}

export default IconCard

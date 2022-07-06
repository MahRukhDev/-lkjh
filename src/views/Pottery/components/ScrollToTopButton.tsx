import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Button, ArrowUpIcon } from '@pancakeswap/uikit'
import throttle from 'lodash/throttle'

const FixedContainer = styled.div`
  position: fixed;
  right: 5%;
  bottom: 110px;
`

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }, [])

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop
      if (scrolled > 500) {
        setVisible(true)
      } else if (scrolled <= 500) {
        setVisible(false)
      }
    }

    const throttledToggleVisible = throttle(toggleVisible, 200)

    window.addEventListener('scroll', throttledToggleVisible)

    return () => window.removeEventListener('scroll', throttledToggleVisible)
  }, [])

  return (
    <FixedContainer style={{ display: visible ? 'inline' : 'none' }}>
      <Button
        width={48}
        height={48}
        endIcon={<ArrowUpIcon color="white" style={{ marginLeft: 0 }} />}
        onClick={scrollToTop}
      />
    </FixedContainer>
  )
}

export default ScrollToTopButton

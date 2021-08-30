import { BigNumber } from 'ethers'
import { formatBnbv2, formatUsdv2 } from './helpers'

describe('formatUsdv2', () => {
  it.each`
    price           | expectedPriceFormatted
    ${10}           | ${'<$0.001'}
    ${100}          | ${'<$0.001'}
    ${1000}         | ${'<$0.001'}
    ${10000}        | ${'<$0.001'}
    ${100000}       | ${'$0.001'}
    ${1000000}      | ${'$0.010'}
    ${10000000}     | ${'$0.100'}
    ${100000000}    | ${'$1.000'}
    ${1000000000}   | ${'$10.000'}
    ${10000000000}  | ${'$100.000'}
    ${-10000000000} | ${'$-100.000'}
    ${-1000000000}  | ${'$-10.000'}
    ${-100000000}   | ${'$-1.000'}
    ${-10000000}    | ${'$-0.100'}
    ${-1000000}     | ${'$-0.010'}
    ${-100000}      | ${'$-0.001'}
    ${-10000}       | ${'<$-0.001'}
    ${-1000}        | ${'<$-0.001'}
    ${-100}         | ${'<$-0.001'}
    ${-10}          | ${'<$-0.001'}
  `('should format $price to $expectedPriceFormatted', ({ price, expectedPriceFormatted }) =>
    expect(formatUsdv2(BigNumber.from(price))).toEqual(expectedPriceFormatted),
  )
})

describe('formatBnbv2', () => {
  it.each`
    price                       | expectedPriceFormatted
    ${'1000000000000'}          | ${'<0.001'}
    ${'10000000000000'}         | ${'<0.001'}
    ${'100000000000000'}        | ${'<0.001'}
    ${'1000000000000000'}       | ${'0.001'}
    ${'10000000000000000'}      | ${'0.010'}
    ${'100000000000000000'}     | ${'0.100'}
    ${'1000000000000000000'}    | ${'1.000'}
    ${'10000000000000000000'}   | ${'10.000'}
    ${'100000000000000000000'}  | ${'100.000'}
    ${'-100000000000000000000'} | ${'-100.000'}
    ${'-10000000000000000000'}  | ${'-10.000'}
    ${'-1000000000000000000'}   | ${'-1.000'}
    ${'-100000000000000000'}    | ${'-0.100'}
    ${'-10000000000000000'}     | ${'-0.010'}
    ${'-1000000000000000'}      | ${'-0.001'}
    ${'-100000000000000'}       | ${'<-0.001'}
    ${'-10000000000000'}        | ${'<-0.001'}
    ${'-1000000000000'}         | ${'<-0.001'}
    ${'-100000000000'}          | ${'<-0.001'}
  `('should format $price to $expectedPriceFormatted', ({ price, expectedPriceFormatted }) =>
    expect(formatBnbv2(BigNumber.from(price))).toEqual(expectedPriceFormatted),
  )
})

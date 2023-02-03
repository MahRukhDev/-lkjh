import { getIFOUID, IFO_POOL_STORE_TAG } from 'views/Ifos/constants'
import { mainnetTokens } from './tokens/1'
import { Ifo } from './types'

export const ifos: Ifo[] = [
  {
    id: 'USDC',
    cIFO: false,
    address: `${IFO_POOL_STORE_TAG}<${mainnetTokens.cake.address}, ${mainnetTokens.lzusdc.address}, ${getIFOUID(1)}>`,
    isActive: true,
    name: 'USDC',
    poolUnlimited: {
      saleAmount: '10 USDC',
      raiseAmount: '$10',
      cakeToBurn: '$0',
      distributionRatio: 1,
    },
    campaignId: '1',
    currency: mainnetTokens.cake,
    token: mainnetTokens.lzusdc,
    releaseTime: 1675396687,
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/0x06598b682d9f33ec5ea0c2acf8eba13dea7c63fa08dd2c4dfd7bc7af16920d51',
    tokenOfferingPrice: 1,
    version: 3.2,
    twitterUrl: '',
    description: 'USDC description',
    vestingTitle: '$USDC - USDC vesting title.',
  },
]

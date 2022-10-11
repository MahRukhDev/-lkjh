import { Token, ChainId } from '@pancakeswap/sdk'
import { bscTokens } from '@pancakeswap/tokens'
import { CAKE_BNB_LP_MAINNET } from './lp'
import { Ifo } from './types'

export const cakeBnbLpToken = new Token(ChainId.BSC, CAKE_BNB_LP_MAINNET, 18, 'CAKE-BNB LP')

const ifos: Ifo[] = [
  {
    id: 'krs',
    cIFO: true,
    address: '0x4CCB9960dEF2f9a55D1a0454a134a8Adb0047B8e',
    isActive: true,
    name: 'KRS',
    poolBasic: {
      saleAmount: '12,000,000 KRS',
      raiseAmount: '$420,000',
      cakeToBurn: '$0',
      distributionRatio: 0.4,
    },
    poolUnlimited: {
      saleAmount: '18,000,000 KRS',
      raiseAmount: '$630,000',
      cakeToBurn: '$0',
      distributionRatio: 0.6,
    },
    currency: bscTokens.cake,
    token: bscTokens.krs,
    releaseBlockNumber: 21970879,
    campaignId: '511700000',
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/bafkreicqqvgqpwtnhmlfdwz3ya3hnjm6nvgqbf3fpi4vbxmvqyv6yi3enu',
    tokenOfferingPrice: 0.035,
    version: 3.2,
    twitterUrl: 'https://twitter.com/KingdomRaids',
    description: 'Kingdom Raids is a blockchain-based strategy role-playing game (RPG) game with a NFT metaverse',
    vestingTitle: '$KRS - utility token for Kingdom Raids, a role-playing game (RPG) game.',
  },
  {
    id: 'co',
    address: '0x8baeee7d68cb332c63b3e4a8740072121070a2df',
    isActive: false,
    name: 'CO',
    poolBasic: {
      saleAmount: '10,500,000 CO',
      raiseAmount: '$367,500',
      cakeToBurn: '$0',
      distributionRatio: 0.25,
    },
    poolUnlimited: {
      saleAmount: '31,500,000 CO',
      raiseAmount: '$1,102,500',
      cakeToBurn: '$0',
      distributionRatio: 0.75,
    },
    currency: bscTokens.cake,
    token: bscTokens.co,
    releaseBlockNumber: 21615380,
    campaignId: '511600000',
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/bafkreiddual5o7vzfcwuazw3lgckis66hka4xytqkttqg2wjtea5pywohy',
    tokenOfferingPrice: 0.035,
    version: 3.2,
    twitterUrl: 'https://twitter.com/Coritecom',
    description:
      'Corite is a blockchain-based music platform jointly powered by fans and artists to finance and promote music in a unique Engage-to-Earn (E2E) model.',
    vestingTitle: '$CO - utility token for the Corite Experience!',
  },
  {
    id: 'hoop',
    address: '0x326e9E1B685C7F366fb320e7eC59599F3d88b1a2',
    isActive: false,
    cIFO: true,
    name: 'HOOP',
    poolBasic: {
      saleAmount: '6,499,500 HOOP',
      raiseAmount: '$357,472.50',
      cakeToBurn: '$0',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '15,165,500 HOOP',
      raiseAmount: '$834,102.50',
      cakeToBurn: '$0',
      distributionRatio: 0.7,
    },
    currency: bscTokens.cake,
    token: bscTokens.hoop,
    releaseBlockNumber: 21525900,
    campaignId: '511500000',
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/bafkreicsc2nevwvyp7ot5ewkmujvor3bcafh372kuxzncojqbuabnpwupe',
    tokenOfferingPrice: 0.055,
    version: 3.2,
    twitterUrl: 'https://twitter.com/DinosChibi',
    description: `Chibi Dinos is a basketball and dinosaur themed metaverse with games such as Primal Hoop, an arcade basketball game with an adventure role-playing game (RPG) mode and Primal Pick'em, a predictive play-to earn game (P2E).`,
    vestingTitle: '$HOOP - In-game currency for the Chibi Dinos Gaming Universe',
  },
  {
    id: 'wom',
    address: '0x98828e9D69E49104a62ecb4FA3d6F9e06A295CBA',
    isActive: false,
    name: 'WOM',
    poolBasic: {
      saleAmount: '2,800,000 WOM',
      raiseAmount: '$210,000',
      cakeToBurn: '$0',
      distributionRatio: 0.1,
    },
    poolUnlimited: {
      saleAmount: '25,200,000 WOM',
      raiseAmount: '$1,890,000',
      cakeToBurn: '$0',
      distributionRatio: 0.9,
    },
    currency: bscTokens.cake,
    token: bscTokens.wom,
    releaseBlockNumber: 20685666,
    campaignId: '511400000',
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/bafkreieqv7mbzmumyftstt6l32x6okfzq4syrea7k5zbqgohhcekcvbduu',
    tokenOfferingPrice: 0.075,
    version: 3.2,
    twitterUrl: 'https://twitter.com/WombatExchange',
    description: 'Wombat Exchange is a next generation multi-chain stableswap native to BNB Chain.',
    vestingTitle: 'Earn $WOM by staking stablecoins; Lock $WOM to maximize stablecoin yields',
  },
  {
    id: 'peel',
    address: '0x35Bb6Dd4E8C63491057c32621c8cDdE43BabE201',
    isActive: false,
    name: 'Meta Apes ($PEEL)',
    poolBasic: {
      saleAmount: '10,000,000 PEEL',
      raiseAmount: '$400,000',
      cakeToBurn: '$0',
      distributionRatio: 0.2,
    },
    poolUnlimited: {
      saleAmount: '40,000,000 PEEL',
      raiseAmount: '$1,600,000',
      cakeToBurn: '$0',
      distributionRatio: 0.8,
    },
    currency: bscTokens.cake,
    token: bscTokens.peel,
    releaseBlockNumber: 19964276,
    campaignId: '511300000',
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/bafkreibomj5nilvyckdro7ztmm62syt55dcfnonxs63ji6hm2ijq35lru4',
    tokenOfferingPrice: 0.04,
    version: 3.2,
    twitterUrl: 'https://twitter.com/MetaApesGame',
    description:
      'Meta Apes is a free-to-play, play-and-earn massively multiplayer online (MMO) strategy game designed for mobile and the first game to launch on the BNB Sidechain with their own dedicated chain, Ape Chain.',
    vestingTitle: 'Utilize $PEEL for gas and governance in the Meta Apes ecosystem!',
  },
  {
    id: 'trivia',
    address: '0x23C520d8227524E2cDD00360358864fF3fFC36b4',
    isActive: false,
    name: 'TRIVIA',
    poolBasic: {
      saleAmount: '10,000,000 TRIVIA',
      raiseAmount: '$350,000',
      cakeToBurn: '$0',
      distributionRatio: 0.2,
    },
    poolUnlimited: {
      saleAmount: '40,000,000 TRIVIA',
      raiseAmount: '$1,400,000',
      cakeToBurn: '$0',
      distributionRatio: 0.8,
    },
    currency: bscTokens.cake,
    token: bscTokens.trivia,
    releaseBlockNumber: 19273145,
    campaignId: '511200000',
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/bafkreihrc2d55vrowbn2oajzs77ffv73g4hzch2e7wulnuccmbwl5u4hvq',
    tokenOfferingPrice: 0.035,
    version: 3.2,
    telegramUrl: 'https://t.me/TriviansGlobal',
    twitterUrl: 'https://twitter.com/PlayTrivians',
    description:
      'Trivian is a trivia gaming platform with different game modes such as multiplayer mode, single player mode, 1v1 games, instant play, scheduled tournaments, and live shows … all while earning TRIVIA tokens!',
    vestingTitle: 'Earn $TRIVIA For Each Question You Answer Correctly',
  },
  {
    id: 'duet',
    address: '0xDF24BE326af4c1fb888f567f41D9a981A4752cf1',
    isActive: false,
    name: 'DUET',
    poolBasic: {
      saleAmount: '1,200,000 DUET',
      raiseAmount: '$360,000',
      cakeToBurn: '$0',
      distributionRatio: 0.2,
    },
    poolUnlimited: {
      saleAmount: '4,800,000 DUET',
      raiseAmount: '$1,440,000',
      cakeToBurn: '$0',
      distributionRatio: 0.8,
    },
    currency: bscTokens.cake,
    token: bscTokens.duet,
    releaseBlockNumber: null,
    campaignId: '511190000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmXwoYYd8rkahVbxiGKsTa4rYRRFWPxhRGAHy3hVwK3Q2z',
    tokenOfferingPrice: 0.3,
    version: 3.1,
    telegramUrl: 'https://t.me/duetprotocol',
    twitterUrl: 'https://twitter.com/duetprotocol',
    description:
      'DUET Protocol is a multi-chain synthetic assets ecosystem, enabling pegged assets from various markets – from individual stocks, to indexes, ETFs, and commodities.',
  },
  {
    id: 'era',
    address: '0x527201a43f8da24ce9b7c21744a0706942f41fa3',
    isActive: false,
    name: 'ERA (Game of Truth)',
    poolBasic: {
      saleAmount: '4,000,000 ERA',
      raiseAmount: '$360,000',
      cakeToBurn: '$0',
      distributionRatio: 0.2,
    },
    poolUnlimited: {
      saleAmount: '16,000,000 ERA',
      raiseAmount: '$1,440,000',
      cakeToBurn: '$0',
      distributionRatio: 0.8,
    },
    currency: bscTokens.cake,
    token: bscTokens.era,
    releaseBlockNumber: 15156634,
    campaignId: '511180000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmTfN1SKnFidF6XCDcpga7zAf69mFfhb26Zy9b85dYskxW',
    tokenOfferingPrice: 0.09,
    version: 3.1,
    telegramUrl: 'https://t.me/Era7_Official',
    twitterUrl: 'https://twitter.com/Era7_official',
    description:
      'Drawing from their experience in traditional games such as Awakening of Dragon, Era7: Game of Truth combines elements of DeFi, NFTs, and Trading Cards into a play-to-earn game steeped in mythology and magic.',
  },
  {
    id: 'froyo',
    address: '0xE0d6c91860a332068bdB59275b0AAC8769e26Ac4',
    isActive: false,
    name: 'Froyo Games (FROYO)',
    poolBasic: {
      saleAmount: '20,000,000 FROYO',
      raiseAmount: '$1,200,000',
      cakeToBurn: '$0',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '46,666,668 FROYO',
      raiseAmount: '$2,800,000',
      cakeToBurn: '$0',
      distributionRatio: 0.7,
    },
    currency: bscTokens.cake,
    token: bscTokens.froyo,
    releaseBlockNumber: 14297000,
    campaignId: '511170000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmRhc4oC73jk4zxU4YkP1kudKHeq6qamgYA1sWoh6XJnks',
    tokenOfferingPrice: 0.06,
    version: 3,
    telegramUrl: 'https://t.me/froyogames',
    twitterUrl: 'https://twitter.com/realfroyogames',
    description: `Froyo Games is a game publisher and decentralized GameFi platform, with a NFT Marketplace that integrates NFTs with their games.\n \n FROYO tokens can be used to buy NFTs and participate in Froyo games`,
  },
  {
    id: 'dpt',
    address: '0x63914805A0864e9557eA3A5cC86cc1BA054ec64b',
    isActive: false,
    name: 'Diviner Protocol (DPT)',
    poolBasic: {
      saleAmount: '7,200,000 DPT',
      raiseAmount: '$180,000',
      cakeToBurn: '$0',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '16,800,000 DPT',
      raiseAmount: '$420,000',
      cakeToBurn: '$0',
      distributionRatio: 0.7,
    },
    currency: bscTokens.cake,
    token: bscTokens.dpt,
    releaseBlockNumber: 13491500,
    campaignId: '511160000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmQqpknHvuQwshVP259qFxfQsxiWbQ9SLMebohDeRwRzKg',
    tokenOfferingPrice: 0.025,
    version: 3,
  },
  {
    id: 'santos',
    address: '0x69B5D2Ab0cf532a0E22Fc0dEB0c5135639892468',
    isActive: false,
    name: 'FC Santos Fan Token (SANTOS)',
    poolBasic: {
      saleAmount: '120,000 SANTOS',
      raiseAmount: '$300,000',
      cakeToBurn: '$0',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '280,000 SANTOS',
      raiseAmount: '$700,000',
      cakeToBurn: '$0',
      distributionRatio: 0.7,
    },
    currency: bscTokens.cake,
    token: bscTokens.santos,
    releaseBlockNumber: 13097777,
    campaignId: '511150000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmUqRxjwZCWeZWEdgV2vHJ6hex7jMW7i247NKFas73xc8j',
    tokenOfferingPrice: 2.5,
    version: 2,
  },
  {
    id: 'porto',
    address: '0xFDFf29dD0b4DD49Bf5E991A30b8593eaA34B4580',
    isActive: false,
    name: 'FC Porto Fan Token (PORTO)',
    poolBasic: {
      saleAmount: '250,000 PORTO',
      raiseAmount: '$500,000',
      cakeToBurn: '$0',
      distributionRatio: 0.5,
    },
    poolUnlimited: {
      saleAmount: '250,000 PORTO',
      raiseAmount: '$500,000',
      cakeToBurn: '$0',
      distributionRatio: 0.5,
    },
    currency: bscTokens.cake,
    token: bscTokens.porto,
    releaseBlockNumber: 12687500,
    campaignId: '511140000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmaakXYpydAwCgTuSPe3R2ZNraRtkCbK6iBRqBCCdzqKEG',
    tokenOfferingPrice: 2,
    version: 2,
  },
  {
    id: 'dar',
    address: '0xb6eF1f36220397c434A6B15dc5EA616CFFDF58CE',
    isActive: false,
    name: 'Mines of Dalarnia (DAR)',
    poolBasic: {
      saleAmount: '6,000,000 DAR',
      raiseAmount: '$450,000',
      cakeToBurn: '$0',
      distributionRatio: 0.5,
    },
    poolUnlimited: {
      saleAmount: '6,000,000 DAR',
      raiseAmount: '$450,000',
      cakeToBurn: '$0',
      distributionRatio: 0.5,
    },
    currency: bscTokens.cake,
    token: bscTokens.dar,
    releaseBlockNumber: 12335455,
    campaignId: '511130000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmeJenHcbY45eQxLRebzvpNk5qSCrj2wM1t4EAMHotFoJL',
    tokenOfferingPrice: 0.075,
    version: 2,
  },
  {
    id: 'dkt',
    address: '0x89ab9852155A794e371095d863aEAa2DF198067C',
    isActive: false,
    name: 'Duelist King (DKT)',
    poolBasic: {
      saleAmount: '75,000 DKT',
      raiseAmount: '$131,250',
      cakeToBurn: '$65,625',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '175,000 DKT',
      raiseAmount: '$306,250',
      cakeToBurn: '$153,125',
      distributionRatio: 0.7,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.dkt,
    releaseBlockNumber: 12130750,
    campaignId: '511120000',
    articleUrl: 'https://pancakeswap.finance/voting/proposal/QmTRWdW9a65fAkyJy1wrAJRU548fNMAZhRUDrSxzMDLmwk',
    tokenOfferingPrice: 1.75,
    version: 2,
  },
  {
    id: 'kalmar',
    address: '0x1aFB32b76696CdF05593Ca3f3957AEFB23a220FB',
    isActive: false,
    name: 'Kalmar (KALM)',
    poolBasic: {
      saleAmount: '375,000 KALM',
      raiseAmount: '$750,000',
      cakeToBurn: '$375,000',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '875,000 KALM',
      raiseAmount: '$2,500,000',
      cakeToBurn: '$1,250,000',
      distributionRatio: 0.7,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.kalm,
    releaseBlockNumber: 7707736,
    campaignId: '511110000',
    articleUrl: 'https://pancakeswap.medium.com/kalmar-kalm-ifo-to-be-hosted-on-pancakeswap-4540059753e4',
    tokenOfferingPrice: 2.0,
    version: 2,
  },
  {
    id: 'hotcross',
    address: '0xb664cdbe385656F8c54031c0CB12Cea55b584b63',
    isActive: false,
    name: 'Hot Cross (HOTCROSS)',
    poolBasic: {
      saleAmount: '15,000,000 HOTCROSS',
      raiseAmount: '$750,000',
      cakeToBurn: '$375,000',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '35,000,000 HOTCROSS',
      raiseAmount: '$1,750,000',
      cakeToBurn: '$875,000',
      distributionRatio: 0.7,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.hotcross,
    releaseBlockNumber: 7477900,
    campaignId: '511100000',
    articleUrl: 'https://pancakeswap.medium.com/hot-cross-hotcross-ifo-to-be-hosted-on-pancakeswap-10e70f1f6841',
    tokenOfferingPrice: 0.05,
    version: 2,
  },
  {
    id: 'horizon',
    address: '0x6137B571f7F1E44839ae10310a08be86D1A4D03B',
    isActive: false,
    name: 'Horizon Protocol (HZN)',
    poolBasic: {
      saleAmount: '3,000,000 HZN',
      raiseAmount: '$750,000',
      cakeToBurn: '$375,000',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '7,000,000 HZN',
      raiseAmount: '$1,750,000',
      cakeToBurn: '$875,000',
      distributionRatio: 0.7,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.hzn,
    releaseBlockNumber: 6581111,
    campaignId: '511090000',
    articleUrl: 'https://pancakeswap.medium.com/horizon-protocol-hzn-ifo-to-be-hosted-on-pancakeswap-51f79601c9d8',
    tokenOfferingPrice: 0.25,
    version: 2,
  },
  {
    id: 'belt',
    address: '0xc9FBedC033a1c479a6AD451ffE463025E92a1d38',
    isActive: false,
    name: 'Belt (BELT)',
    poolUnlimited: {
      saleAmount: '150,000 BELT',
      raiseAmount: '$3,000,000',
      cakeToBurn: '$1,500,000',
      distributionRatio: 1,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.belt,
    releaseBlockNumber: 5493919,
    campaignId: '511080000',
    articleUrl: 'https://pancakeswap.medium.com/belt-fi-belt-ifo-to-be-hosted-on-pancakeswap-353585117e32',
    tokenOfferingPrice: null,
    version: 1,
  },
  {
    id: 'watch',
    address: '0x55344b55C71Ad8834C397E6e08dF5195cF84fe6d',
    isActive: false,
    name: 'Yieldwatch (WATCH)',
    poolUnlimited: {
      saleAmount: '8,000,000 WATCH',
      raiseAmount: '$800,000',
      cakeToBurn: '$400,000',
      distributionRatio: 1,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.watch,
    releaseBlockNumber: 5294924,
    campaignId: '511070000',
    articleUrl: 'https://pancakeswap.medium.com/yieldwatch-watch-ifo-to-be-hosted-on-pancakeswap-d24301f17241',
    tokenOfferingPrice: null,
    version: 1,
  },
  {
    id: 'berry',
    address: '0x5d028cE3435B2bB9AceBfaC599EEbA1ccD63d7dd',
    isActive: false,
    name: 'Berry (BRY)',
    poolUnlimited: {
      saleAmount: '2,000,000 BRY',
      raiseAmount: '$1,000,000',
      cakeToBurn: '$500,000',
      distributionRatio: 1,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.bry,
    releaseBlockNumber: 4750968,
    campaignId: '511060000',
    articleUrl: 'https://pancakeswap.medium.com/berry-bry-ifo-to-be-hosted-on-pancakeswap-b4f9095e9cdb',
    tokenOfferingPrice: null,
    version: 1,
  },
  {
    id: 'soteria',
    address: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
    isActive: false,
    name: 'Soteria (wSOTE)',
    poolUnlimited: {
      saleAmount: '1,500,000 wSOTE',
      raiseAmount: '$525,000',
      cakeToBurn: '$262,500',
      distributionRatio: 1,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.wsote,
    releaseBlockNumber: 4086064,
    campaignId: '511050000',
    articleUrl: 'https://pancakeswap.medium.com/soteria-sota-ifo-to-be-hosted-on-pancakeswap-64b727c272ae',
    tokenOfferingPrice: null,
    version: 1,
  },
  {
    id: 'helmet',
    address: '0xa32509d760ee47Eb2Be96D338b5d69B5FBa4eFEB',
    isActive: false,
    name: 'Helmet.insure (Helmet)',
    poolUnlimited: {
      saleAmount: '10,000,000 Helmet',
      raiseAmount: '$1,000,000',
      cakeToBurn: '$500,000',
      distributionRatio: 1,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.helmet,
    releaseBlockNumber: 3771926,
    campaignId: '511040000',
    articleUrl: 'https://pancakeswap.medium.com/1-000-000-helmet-helmet-ifo-to-be-hosted-on-pancakeswap-3379a2a89a67',
    tokenOfferingPrice: null,
    version: 1,
  },
  {
    id: 'tenet',
    address: '0xB922aA19A2603A07C6C9ED6c236618C9bac51f06',
    isActive: false,
    name: 'Tenet (TEN)',
    poolUnlimited: {
      saleAmount: '1,000,000 TEN',
      raiseAmount: '$1,000,000',
      cakeToBurn: '$500,000',
      distributionRatio: 1,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.ten,
    releaseBlockNumber: 3483883,
    campaignId: '511030000',
    articleUrl: 'https://pancakeswap.medium.com/tenet-ten-ifo-to-be-hosted-on-pancakeswap-b7e1eb4cb272',
    tokenOfferingPrice: null,
    version: 1,
  },
  {
    id: 'ditto',
    address: '0x570c9eB19553526Fb35895a531928E19C7D20788',
    isActive: false,
    name: 'Ditto (DITTO)',
    poolUnlimited: {
      saleAmount: '700,000 DITTO',
      raiseAmount: '$630,000',
      cakeToBurn: '$315,000',
      distributionRatio: 1,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.ditto,
    releaseBlockNumber: 3279767,
    campaignId: '511020000',
    articleUrl: 'https://pancakeswap.medium.com/ditto-money-ditto-ifo-to-be-hosted-on-pancakeswap-342da3059a66',
    tokenOfferingPrice: null,
    version: 1,
  },
  {
    id: 'blink',
    address: '0x44a9Cc8463EC00937242b660BF65B10365d99baD',
    isActive: false,
    name: 'BLINk (BLK)',
    poolUnlimited: {
      saleAmount: '100,000,000 BLINK',
      raiseAmount: '$1,000,000',
      cakeToBurn: '$500,000',
      distributionRatio: 1,
    },
    currency: cakeBnbLpToken,
    token: bscTokens.blink,
    releaseBlockNumber: 3279767,
    campaignId: '511010000',
    articleUrl: 'https://medium.com/pancakeswap/1-000-000-ifo-blink-joins-pancakeswap-15841800bdd8',
    tokenOfferingPrice: null,
    version: 1,
  },
]

export default ifos

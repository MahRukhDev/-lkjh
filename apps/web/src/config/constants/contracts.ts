import { ChainId } from '@pancakeswap/chains'
import { masterChefV3Addresses } from '@pancakeswap/farms'
import { GAUGES_ADDRESS, GAUGES_CALC_ADDRESS } from '@pancakeswap/gauges'
import { ICAKE } from '@pancakeswap/ifos'
import { CAKE_VAULT } from '@pancakeswap/pools'
import { V3_QUOTER_ADDRESSES } from '@pancakeswap/smart-router/evm'
import { DEPLOYER_ADDRESSES } from '@pancakeswap/v3-sdk'

export default {
  masterChef: {
    [ChainId.BSC_TESTNET]: '0xB4A466911556e39210a6bB2FaECBB59E4eB7E43d',
    [ChainId.BSC]: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
  },
  masterChefV3: masterChefV3Addresses,
  masterChefV1: {
    [ChainId.BSC_TESTNET]: '0x1d32c2945C8FDCBc7156c553B7cEa4325a17f4f9',
    [ChainId.BSC]: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
  },
  sousChef: {
    [ChainId.BSC_TESTNET]: '0xD3af5Fe61DBaF8f73149bfcFa9FB653ff096029A',
    [ChainId.BSC]: '0x6Ab8463a4185b80905E05A9ff80A2d6b714B9e95',
  },
  lotteryV2: {
    [ChainId.BSC_TESTNET]: '0x5790c3534F30437641541a0FA04C992799602998',
    [ChainId.BSC]: '0x5aF6D33DE2ccEC94efb1bDF8f92Bd58085432d2c',
  },
  multiCall: {
    [ChainId.ETHEREUM]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.GOERLI]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.BSC]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.BSC_TESTNET]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.ZKSYNC_TESTNET]: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
    [ChainId.ZKSYNC]: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
    [ChainId.ARBITRUM_ONE]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.ARBITRUM_GOERLI]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.POLYGON_ZKEVM]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.POLYGON_ZKEVM_TESTNET]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.OPBNB]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.OPBNB_TESTNET]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.BASE_TESTNET]: '0xcA11bde05977b3631167028862bE2a173976CA11',
    [ChainId.SCROLL_SEPOLIA]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  },
  pancakeProfile: {
    [ChainId.BSC]: '0xDf4dBf6536201370F95e06A0F8a7a70fE40E388a',
    [ChainId.BSC_TESTNET]: '0x4B683C7E13B6d5D7fd1FeA9530F451954c1A7c8A',
  },
  pancakeBunnies: {
    [ChainId.BSC]: '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07',
    [ChainId.BSC_TESTNET]: '0x60935F36e4631F73f0f407e68642144e07aC7f5E',
  },
  bunnyFactory: {
    [ChainId.BSC]: '0xfa249Caa1D16f75fa159F7DFBAc0cC5EaB48CeFf',
    [ChainId.BSC_TESTNET]: '0x707CBF373175fdB601D34eeBF2Cf665d08f01148',
  },
  claimRefund: {
    [ChainId.BSC]: '0xE7e53A7e9E3Cf6b840f167eF69519175c497e149',
    [ChainId.BSC_TESTNET]: '0x',
  },
  pointCenterIfo: {
    [ChainId.BSC]: '0x3C6919b132462C1FEc572c6300E83191f4F0012a',
    [ChainId.BSC_TESTNET]: '0xd2Ac1B1728Bb1C11ae02AB6e75B76Ae41A2997e3',
  },
  bunnySpecial: {
    [ChainId.BSC]: '0xFee8A195570a18461146F401d6033f5ab3380849',
    [ChainId.BSC_TESTNET]: '0x7b7b1583De1DeB32Ce6605F6deEbF24A0671c17C',
  },
  tradingCompetitionEaster: {
    [ChainId.BSC]: '0xd718baa0B1F4f70dcC8458154042120FFE0DEFFA',
    [ChainId.BSC_TESTNET]: '0xC787F45B833721ED3aC46E99b703B3E1E01abb97',
  },
  tradingCompetitionFanToken: {
    [ChainId.BSC]: '0xA8FECf847e28aa1Df39E995a45b7FCfb91b676d4',
    [ChainId.BSC_TESTNET]: '0x',
  },
  tradingCompetitionMobox: {
    [ChainId.BSC]: '0x1C5161CdB145dE35a8961F82b065fd1F75C3BaDf',
    [ChainId.BSC_TESTNET]: '0x',
  },
  tradingCompetitionMoD: {
    [ChainId.BSC]: '0xbDd9a61c67ee16c10f5E37b1D0c907a9EC959f33',
    [ChainId.BSC_TESTNET]: '0x',
  },
  easterNft: {
    [ChainId.BSC]: '0x23c41D28A239dDCAABd1bb1deF8d057189510066',
    [ChainId.BSC_TESTNET]: '0x24ec6962dbe874F6B67B5C50857565667fA0854F',
  },
  cakeVault: CAKE_VAULT,
  cakeFlexibleSideVault: {
    [ChainId.BSC]: '0x615e896A8C2CA8470A2e9dc2E9552998f8658Ea0',
    [ChainId.BSC_TESTNET]: '0x1088Fb24053F03802F673b84d16AE1A7023E400b',
  },
  predictionsBNB: {
    [ChainId.BSC]: '0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA',
    [ChainId.BSC_TESTNET]: '0x',
  },
  predictionsCAKE: {
    [ChainId.BSC]: '0x0E3A8078EDD2021dadcdE733C6b4a86E51EE8f07',
    [ChainId.BSC_TESTNET]: '0x',
  },
  chainlinkOracleBNB: {
    [ChainId.BSC]: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
    [ChainId.BSC_TESTNET]: '0x',
  },
  chainlinkOracleCAKE: {
    [ChainId.BSC]: '0xB6064eD41d4f67e353768aA239cA86f4F73665a1',
    [ChainId.BSC_TESTNET]: '0x',
  },
  predictionsV1: {
    [ChainId.BSC]: '0x516ffd7D1e0Ca40b1879935B2De87cb20Fc1124b',
    [ChainId.BSC_TESTNET]: '0x',
  },
  bunnySpecialCakeVault: {
    [ChainId.BSC]: '0x5B4a770Abe7Eafb2601CA4dF9d73EA99363E60a4',
    [ChainId.BSC_TESTNET]: '0x',
  },
  bunnySpecialPrediction: {
    [ChainId.BSC]: '0x342c99e9aC24157657095eC69CB04b73257e7A9C',
    [ChainId.BSC_TESTNET]: '0x',
  },
  bunnySpecialLottery: {
    [ChainId.BSC]: '0x24ED31d31C5868e5a96aA77fdcB890f3511fa0b2',
    [ChainId.BSC_TESTNET]: '0x382cB497110F398F0f152cae82821476AE51c9cF',
  },
  bunnySpecialXmas: {
    [ChainId.BSC]: '0x59EdDF3c21509dA3b0aCCd7c5ccc596d930f4783',
    [ChainId.BSC_TESTNET]: '0x',
  },
  farmAuction: {
    [ChainId.BSC]: '0xb92Ab7c1edcb273AbA24b0656cEb3681654805D2',
    [ChainId.BSC_TESTNET]: '0x3F9602593b4f7C67ab045DB51BbDEa94E40fA9Fe',
  },
  nftMarket: {
    [ChainId.BSC]: '0x17539cCa21C7933Df5c980172d22659B8C345C5A',
    [ChainId.BSC_TESTNET]: '0x7F9F37Ddcaa33893F9bEB3D8748c8D6BfbDE6AB2',
  },
  nftSale: {
    [ChainId.BSC]: '0x29fE7148636b7Ae0b1E53777b28dfbaA9327af8E',
    [ChainId.BSC_TESTNET]: '0xe486De509c5381cbdBF3e71F57D7F1f7570f5c46',
  },
  pancakeSquad: {
    [ChainId.BSC]: '0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
    [ChainId.BSC_TESTNET]: '0xfC0c3F11fDA72Cb9A56F28Ec8D44C0ae4B3ABF86',
  },
  potteryDraw: {
    [ChainId.BSC]: '0x01871991587d5671f3A2d4E2BcDC22F4E026396e',
    [ChainId.BSC_TESTNET]: '0xDB9D365b50E62fce747A90515D2bd1254A16EbB9',
  },
  zap: {
    [ChainId.BSC]: '0xD4c4a7C55c9f7B3c48bafb6E8643Ba79F42418dF',
    [ChainId.BSC_TESTNET]: '0xD85835207054F25620109bdc745EC1D1f84F04e1',
  },
  stableSwapNativeHelper: {
    [ChainId.BSC]: '0x52E5D1e24A4308ef1A221C949cb2F7cbbAFEE090',
    [ChainId.BSC_TESTNET]: '0x6e4B1D7C65E86f1723720a5fE8993f0908108b64',
  },
  iCake: ICAKE,
  bCakeFarmBooster: {
    [ChainId.BSC]: '0xE4FAa3Ef5A9708C894435B0F39c2B440936A3A52',
    [ChainId.BSC_TESTNET]: '0x',
  },
  bCakeFarmBoosterProxyFactory: {
    [ChainId.BSC]: '0x2C36221bF724c60E9FEE3dd44e2da8017a8EF3BA',
    [ChainId.BSC_TESTNET]: '0x',
  },
  bCakeFarmBoosterV3: {
    [ChainId.BSC]: '0x695170faE243147b3bEB4C43AA8DE5DcD9202752',
    [ChainId.BSC_TESTNET]: '0x56666300A1E25624489b661f3C6c456c159a109a',
  },
  nonBscVault: {
    [ChainId.ETHEREUM]: '0x2e71B2688019ebdFDdE5A45e6921aaebb15b25fb',
    [ChainId.GOERLI]: '0xE6c904424417D03451fADd6E3f5b6c26BcC43841',
  },
  crossFarmingSender: {
    [ChainId.ETHEREUM]: '0x8EA90Ef07f37c77137453C7A1B72B7886d51eCFb',
    [ChainId.GOERLI]: '0x327d26dE30f92600620A99043034e0A5FD9402C8',
  },
  crossFarmingReceiver: {
    [ChainId.BSC]: '0x0726a8C8206b9eC0AfB788df5adb36a8AEDB13c2',
    [ChainId.BSC_TESTNET]: '0xBab5d3B6bA24E185f216419f3ba07f03984bF983',
  },
  mmLinkedPool: {
    [ChainId.ETHEREUM]: '0x9Ca2A439810524250E543BA8fB6E88578aF242BC',
    [ChainId.GOERLI]: '0x7bb894Ca487568dD55054193c3238d7B1f46BB92',
    [ChainId.BSC]: '0xfEACb05b373f1A08E68235bA7FC92636b92ced01',
  },
  tradingReward: {
    [ChainId.ETHEREUM]: '0x',
    [ChainId.BSC]: '0xa842a4AD40FEbbd034fbeF25C7a880464a90e695',
    [ChainId.BSC_TESTNET]: '0x',
  },
  nftPositionManager: {
    [ChainId.ETHEREUM]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.GOERLI]: '0x427bF5b37357632377eCbEC9de3626C71A5396c1',
    [ChainId.BSC]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.BSC_TESTNET]: '0x427bF5b37357632377eCbEC9de3626C71A5396c1',
    [ChainId.ZKSYNC_TESTNET]: '0xF84697CfE7c88F846e4ba5dAe14A6A8f67deF5c2',
    [ChainId.ZKSYNC]: '0xa815e2eD7f7d5B0c49fda367F249232a1B9D2883',
    [ChainId.POLYGON_ZKEVM]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.POLYGON_ZKEVM_TESTNET]: '0x1f489dd5B559E976AE74303F939Cfd0aF1b62C2B',
    [ChainId.ARBITRUM_ONE]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.LINEA]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.LINEA_TESTNET]: '0xacFa791C833120c769Fd3066c940B7D30Cd8BC73',
    [ChainId.ARBITRUM_GOERLI]: '0xb10120961f7504766976A89E29802Fa00553da5b',
    [ChainId.OPBNB]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.OPBNB_TESTNET]: '0x9d4277f1D41CCB30C0e91f7d1bBA2A739E19032C',
    [ChainId.BASE]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.BASE_TESTNET]: '0x0F81fD8DaC20A21029B496D8F8E08385201B8ca0',
    [ChainId.SCROLL_SEPOLIA]: '0x0F81fD8DaC20A21029B496D8F8E08385201B8ca0',
  },
  v3PoolDeployer: DEPLOYER_ADDRESSES,
  v3Migrator: {
    [ChainId.ETHEREUM]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
    [ChainId.GOERLI]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.BSC]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
    [ChainId.BSC_TESTNET]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    [ChainId.ZKSYNC_TESTNET]: '0x7627931617A60Fe58EDBf4881ac166E1eDe2379e',
    [ChainId.ZKSYNC]: '0x556A72A7A3bB3bbd293D923e59b6B56898fB405D',
    [ChainId.POLYGON_ZKEVM]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
    [ChainId.POLYGON_ZKEVM_TESTNET]: '0x4A3902773F947ce028969db670E568fFC9524E8C',
    [ChainId.ARBITRUM_ONE]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
    [ChainId.LINEA]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
    [ChainId.LINEA_TESTNET]: '0x3652Fc6EDcbD76161b8554388867d3dAb65eCA93',
    [ChainId.ARBITRUM_GOERLI]: '0xCcf770BdBD8ccC57a7a7ABff53825fD895a06238',
    [ChainId.OPBNB]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
    [ChainId.OPBNB_TESTNET]: '0xA1911b740c07c0d58cAa71b54CD06f7D11218a3B',
    [ChainId.BASE]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
    [ChainId.BASE_TESTNET]: '0x8Ae8592a24CD13b7E09D2763E7d6A39E3c0D6bad',
    [ChainId.SCROLL_SEPOLIA]: '0x8Ae8592a24CD13b7E09D2763E7d6A39E3c0D6bad',
  },
  quoter: V3_QUOTER_ADDRESSES,
  v3Airdrop: {
    [ChainId.ETHEREUM]: '0x',
    [ChainId.BSC]: '0xe934d2C5bE5db0295A4de3177762A9E8c74Ae4f4',
    [ChainId.BSC_TESTNET]: '0x',
  },
  affiliateProgram: {
    [ChainId.ETHEREUM]: '0x',
    [ChainId.BSC]: '0x92C73D90F709DFf7e5E7307e8F2EE20e39396b12',
    [ChainId.BSC_TESTNET]: '0x1B8a475B5E5De05fB3Ac2D9ec3C2809fBF24e51c',
  },
  tradingRewardTopTrades: {
    [ChainId.ETHEREUM]: '0x',
    [ChainId.BSC]: '0x41920b6A17CB73D1B60f4F41D82c35eD0a46fD71',
    [ChainId.BSC_TESTNET]: '0x',
  },
  vCake: {
    [ChainId.ETHEREUM]: '0x',
    [ChainId.BSC]: '0xa3b8321173Cf3DdF37Ce3e7548203Fc25d86402F',
    [ChainId.BSC_TESTNET]: '0x5DD37E97716A8b358BCbc731516F36FFff978454',
  },
  revenueSharingPool: {
    [ChainId.ETHEREUM]: '0x',
    [ChainId.BSC]: '0xCD5d1935e9bfa4905f9f007C97aB1f1763dC1607',
    [ChainId.BSC_TESTNET]: '0xd2d1DD41700d9132d3286e0FcD8D6E1D8E5052F5',
  },
  anniversaryAchievement: {
    [ChainId.BSC]: '0x0a073aa17275ef839ee77BC6c589D9E661270480',
    [ChainId.BSC_TESTNET]: '0x',
  },
  fixedStaking: {
    [ChainId.ETHEREUM]: '0x',
    [ChainId.BSC]: '0xC0E92c9B437734a0c0e0466F76cDf71c5478b0AB',
    [ChainId.BSC_TESTNET]: '0x',
  },
  veCake: {
    [ChainId.BSC]: '0x5692DB8177a81A6c6afc8084C2976C9933EC1bAB',
    [ChainId.BSC_TESTNET]: '0x279957513FC505F8Cb16f4b6783D170C9BEcE322',
  },
  gaugesVoting: GAUGES_ADDRESS,
  gaugesVotingCalc: GAUGES_CALC_ADDRESS,
  revenueSharingVeCake: {
    [ChainId.BSC]: '0x9cac9745731d1Cf2B483f257745A512f0938DD01',
    [ChainId.BSC_TESTNET]: '0x482a401D57C9892D6d6BD6A4A976CfDDeD83BF11',
  },
  revenueSharingCakePool: {
    [ChainId.BSC]: '0xCaF4e48a4Cb930060D0c3409F40Ae7b34d2AbE2D',
    [ChainId.BSC_TESTNET]: '0x58fde4bf684B631363640808F452952D8c14084b',
  },
  revenueSharingPoolGateway: {
    [ChainId.BSC]: '0x011f2a82846a4E9c62C2FC4Fd6fDbad19147D94A',
    [ChainId.BSC_TESTNET]: '0x946273012ED616410F698536F1BF2513417BF8Ec',
  },
} as const satisfies Record<string, Record<number, `0x${string}`>>

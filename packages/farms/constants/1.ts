import { ethereumTokens } from '@pancakeswap/tokens'
import { FeeAmount, Pool } from '@pancakeswap/v3-sdk'
import { getAddress } from 'viem'
import { SerializedFarmConfig } from '..'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'

export const farmsV3 = defineFarmV3Configs([
  {
    pid: 1,
    lpAddress: '0x1ac1A8FEaAEa1900C4166dEeed0C11cC10669D36',
    token0: ethereumTokens.usdc,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 2,
    lpAddress: '0x6CA298D2983aB03Aa1dA7679389D955A4eFEE15C',
    token0: ethereumTokens.weth,
    token1: ethereumTokens.usdt,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 3,
    lpAddress: '0x04c8577958CcC170EB3d2CCa76F9d51bc6E42D8f',
    token0: ethereumTokens.usdc,
    token1: ethereumTokens.usdt,
    feeAmount: FeeAmount.LOWEST,
  },
  {
    pid: 4,
    lpAddress: '0x9b5699D18DFF51fc65fB8ad6F70d93287C36349f',
    token0: ethereumTokens.wbtc,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 5,
    lpAddress: '0x517F451b0A9E1b87Dc0Ae98A05Ee033C3310F046',
    token0: ethereumTokens.cake,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 6,
    lpAddress: '0x11A6713B702817DB0Aa0964D1AfEe4E641319732',
    token0: ethereumTokens.cake,
    token1: ethereumTokens.usdc,
    feeAmount: FeeAmount.MEDIUM,
  },
  // Keep those farms on top
  {
    pid: 40,
    lpAddress: '0x539aa397a61C8933f0E813DF9802A5d4dA653AD4',
    token0: ethereumTokens.pyusd,
    token1: ethereumTokens.usdt,
    feeAmount: FeeAmount.LOWEST,
  },
  {
    pid: 39,
    lpAddress: '0xfF4469F951c05529513F5FEc4464Cb10d2230bE3',
    token0: ethereumTokens.pyusd,
    token1: ethereumTokens.usdc,
    feeAmount: FeeAmount.LOWEST,
  },
  {
    pid: 38,
    lpAddress: '0xEa9b2D7ff9aE446ec067e50DF7C09f1Dd055bB71',
    token0: ethereumTokens.woo,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 12,
    lpAddress: '0x4F64951A6583D56004fF6310834C70d182142A07',
    token0: ethereumTokens.wstETH,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 37,
    lpAddress: '0x3fc47BE8264E473dd2B3e80d144F9EfFfc18F438',
    token0: ethereumTokens.cyber,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 36,
    lpAddress: Pool.getAddress(ethereumTokens.wom, ethereumTokens.usdt, FeeAmount.HIGH),
    token0: ethereumTokens.wom,
    token1: ethereumTokens.usdt,
    feeAmount: FeeAmount.HIGH,
  },
  {
    pid: 35,
    lpAddress: Pool.getAddress(ethereumTokens.wld, ethereumTokens.weth, FeeAmount.HIGH),
    token0: ethereumTokens.wld,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.HIGH,
  },
  {
    pid: 34,
    lpAddress: Pool.getAddress(ethereumTokens.pendle, ethereumTokens.weth, FeeAmount.HIGH),
    token0: ethereumTokens.pendle,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.HIGH,
  },
  {
    pid: 33,
    lpAddress: Pool.getAddress(ethereumTokens.canto, ethereumTokens.weth, FeeAmount.HIGH),
    token0: ethereumTokens.canto,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.HIGH,
  },
  {
    pid: 32,
    lpAddress: Pool.getAddress(ethereumTokens.tusd, ethereumTokens.usdt, FeeAmount.LOWEST),
    token0: ethereumTokens.tusd,
    token1: ethereumTokens.usdt,
    feeAmount: FeeAmount.LOWEST,
  },
  {
    pid: 22,
    lpAddress: Pool.getAddress(ethereumTokens.axl, ethereumTokens.usdc, FeeAmount.MEDIUM),
    token0: ethereumTokens.axl,
    token1: ethereumTokens.usdc,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 19,
    lpAddress: Pool.getAddress(ethereumTokens.rETH, ethereumTokens.weth, FeeAmount.LOW),
    token0: ethereumTokens.rETH,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 31,
    lpAddress: Pool.getAddress(ethereumTokens.wbtc, ethereumTokens.rETH, FeeAmount.MEDIUM),
    token0: ethereumTokens.wbtc,
    token1: ethereumTokens.rETH,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 30,
    lpAddress: Pool.getAddress(ethereumTokens.fuse, ethereumTokens.weth, FeeAmount.MEDIUM),
    token0: ethereumTokens.fuse,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 29,
    lpAddress: '0x392d0F0B7Fe5161Db89f2DB87d33a20682C12A2B',
    token0: ethereumTokens.weth,
    token1: ethereumTokens.ens,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 28,
    lpAddress: '0xC7F25e2FcC474816efFd9be316F2E51cCef90Ceb',
    token0: ethereumTokens.blur,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.HIGH,
  },
  {
    pid: 27,
    lpAddress: Pool.getAddress(ethereumTokens.pepe, ethereumTokens.weth, FeeAmount.HIGH),
    token0: ethereumTokens.pepe,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.HIGH,
  },
  {
    pid: 26,
    lpAddress: Pool.getAddress(ethereumTokens.wbeth, ethereumTokens.weth, FeeAmount.LOW),
    token0: ethereumTokens.wbeth,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 25,
    lpAddress: Pool.getAddress(ethereumTokens.unshETH, ethereumTokens.usdc, FeeAmount.MEDIUM),
    token0: ethereumTokens.unshETH,
    token1: ethereumTokens.usdc,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 24,
    lpAddress: '0x5145755c0535198eec1642DC0cc96225fb28263D',
    token0: ethereumTokens.weth,
    token1: ethereumTokens.wncg,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 23,
    lpAddress: '0x6E229C972d9F69c15Bdc7B07f385D2025225E72b',
    token0: ethereumTokens.mask,
    token1: ethereumTokens.usdc,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 14,
    lpAddress: Pool.getAddress(ethereumTokens.alETH, ethereumTokens.alcx, FeeAmount.MEDIUM),
    token0: ethereumTokens.alETH,
    token1: ethereumTokens.alcx,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 15,
    lpAddress: Pool.getAddress(ethereumTokens.alETH, ethereumTokens.weth, FeeAmount.LOW),
    token0: ethereumTokens.alETH,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 16,
    lpAddress: Pool.getAddress(ethereumTokens.fxs, ethereumTokens.weth, FeeAmount.MEDIUM),
    token0: ethereumTokens.fxs,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 17,
    lpAddress: Pool.getAddress(ethereumTokens.frxETH, ethereumTokens.weth, FeeAmount.LOW),
    token0: ethereumTokens.frxETH,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 18,
    lpAddress: Pool.getAddress(ethereumTokens.weth, ethereumTokens.rpl, FeeAmount.MEDIUM),
    token0: ethereumTokens.weth,
    token1: ethereumTokens.rpl,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 20,
    lpAddress: Pool.getAddress(ethereumTokens.weth, ethereumTokens.ankrETH, FeeAmount.LOW),
    token0: ethereumTokens.weth,
    token1: ethereumTokens.ankrETH,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 21,
    lpAddress: Pool.getAddress(ethereumTokens.cbEth, ethereumTokens.weth, FeeAmount.LOW),
    token0: ethereumTokens.cbEth,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.LOW,
  },
  {
    pid: 7,
    lpAddress: '0xD9e497BD8f491fE163b42A62c296FB54CaEA74B7',
    token0: ethereumTokens.dai,
    token1: ethereumTokens.usdc,
    feeAmount: FeeAmount.LOWEST,
  },
  {
    pid: 8,
    lpAddress: '0x34b8AB3a392d54D839dcDBd5Cd1330aBB24bE167',
    token0: ethereumTokens.ldo,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 9,
    lpAddress: '0x7ca3EdB2c8fb3e657E282e67F4008d658aA161D2',
    token0: ethereumTokens.link,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 10,
    lpAddress: '0x8579630AC9c53CFEb5167f90Af90d2c0d52ED09c',
    token0: ethereumTokens.matic,
    token1: ethereumTokens.weth,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 13,
    lpAddress: '0x7524Fe020EDcD072EE98126b49Fa65Eb85F8C44C',
    token0: ethereumTokens.usdc,
    token1: ethereumTokens.stg,
    feeAmount: FeeAmount.MEDIUM,
  },
  {
    pid: 41,
    lpAddress: '0x1427009d457e06e1266648B8EAa88B7b2117E26c',
    token0: ethereumTokens.rochi,
    token1: ethereumTokens.usdc,
    feeAmount: FeeAmount.HIGH,
  },
])

const farms: SerializedFarmConfig[] = [
  {
    pid: 154,
    vaultPid: 7,
    lpSymbol: 'CAPS-ETH LP',
    lpAddress: '0x829e9CC8D05d0D55B4494Ecb5a43D71546dd4DDb',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.caps,
  },
  {
    pid: 145,
    vaultPid: 6,
    lpSymbol: 'FUSE-ETH LP',
    lpAddress: '0xF9b026786522251c08d8C49e154d036Ef3Ad8Cc7',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.fuse,
  },
  {
    pid: 143,
    vaultPid: 5,
    lpSymbol: 'STG-USDC LP',
    lpAddress: '0x6cCA86CC27EB8c7C2d10B0672FE392CFC88e62ff',
    quoteToken: ethereumTokens.usdc,
    token: ethereumTokens.stg,
  },
  {
    pid: 141,
    vaultPid: 4,
    lpSymbol: 'SDAO-ETH LP',
    lpAddress: '0xDA7cF6a0CD5d5e8D10AB55d8bA58257813a239cA',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.sdao,
  },
  {
    pid: 126,
    vaultPid: 3,
    lpSymbol: 'WBTC-ETH LP',
    lpAddress: '0x4AB6702B3Ed3877e9b1f203f90cbEF13d663B0e8',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.wbtc,
  },
  {
    pid: 125,
    vaultPid: 2,
    lpSymbol: 'ETH-USDT LP',
    lpAddress: '0x17C1Ae82D99379240059940093762c5e4539aba5',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.usdt,
  },
  {
    pid: 124,
    vaultPid: 1,
    lpSymbol: 'ETH-USDC LP',
    lpAddress: '0x2E8135bE71230c6B1B4045696d41C09Db0414226',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.usdc,
  },
].map((p) => ({
  ...p,
  token: p.token.serialize,
  quoteToken: p.quoteToken.serialize,
  lpAddress: getAddress(p.lpAddress),
}))

export default farms

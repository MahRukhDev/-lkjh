import { arbitrumTokens } from '@pancakeswap/tokens'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { Strategy, VaultConfig } from '../../types'
import { MANAGER } from '../managers'

export const vaults: VaultConfig[] = [
  {
    id: 2,
    idByManager: 1,
    name: 'TEAHOUSE',
    address: '0xcd52b6DfD1DD964e2211A1AC11dCE735Bcd2cc8B',
    adapterAddress: '0x971000622B0181b0794e77b4207A607ba5Cf86c1',
    currencyA: arbitrumTokens.usdc,
    currencyB: arbitrumTokens.usdce,
    earningToken: arbitrumTokens.cake,
    feeTier: FeeAmount.LOWEST,
    strategy: Strategy.ALO,
    manager: MANAGER.TEAHOUSE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://teahouse.finance/',
    strategyInfoUrl: 'https://docs.teahouse.finance/teahouse-finance-1/managed-vaults/about-managed-vaults',
    learnMoreAboutUrl: 'https://docs.teahouse.finance/teahouse-finance-1',
  },
  {
    id: 1,
    idByManager: 1,
    name: 'DEFIEDGE',
    address: '0x4fa0c6FC2d0d7b6cDa4215Ff09e8ed444F87dDB3',
    adapterAddress: '0xaCAbb974b3c97f8F521634AcaC6ce1D9A1557BFb',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.arb,
    earningToken: arbitrumTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
]

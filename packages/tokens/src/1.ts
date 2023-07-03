import { ChainId, WETH9, ERC20Token } from '@pancakeswap/sdk'

import { CAKE, USDC, USDT, WBTC_ETH } from './common'

export const ethereumTokens = {
  weth: WETH9[ChainId.ETHEREUM],
  usdt: USDT[ChainId.ETHEREUM],
  usdc: USDC[ChainId.ETHEREUM],
  wbtc: WBTC_ETH,
  sdao: new ERC20Token(
    ChainId.ETHEREUM,
    '0x993864E43Caa7F7F12953AD6fEb1d1Ca635B875F',
    18,
    'SDAO',
    'Singularity Dao',
    'https://www.singularitydao.ai/',
  ),
  stg: new ERC20Token(
    ChainId.ETHEREUM,
    '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6',
    18,
    'STG',
    'StargateToken',
    'https://stargate.finance/',
  ),
  fuse: new ERC20Token(
    ChainId.ETHEREUM,
    '0x970B9bB2C0444F5E81e9d0eFb84C8ccdcdcAf84d',
    18,
    'FUSE',
    'Fuse Token',
    'https://fuse.io/',
  ),
  caps: new ERC20Token(
    ChainId.ETHEREUM,
    '0x03Be5C903c727Ee2C8C4e9bc0AcC860Cca4715e2',
    18,
    'CAPS',
    'Capsule Coin',
    'https://www.ternoa.network/en',
  ),
  cake: CAKE[ChainId.ETHEREUM],
  dai: new ERC20Token(
    ChainId.ETHEREUM,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
  ),
  ldo: new ERC20Token(
    ChainId.ETHEREUM,
    '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32',
    18,
    'LDO',
    'Lido DAO Token',
    'https://lido.fi/',
  ),
  wstETH: new ERC20Token(
    ChainId.ETHEREUM,
    '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
    18,
    'wstETH',
    'Wrapped liquid staked Ether 2.0',
    'https://lido.fi/',
  ),
  link: new ERC20Token(
    ChainId.ETHEREUM,
    '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    18,
    'LINK',
    'ChainLink Token',
    'https://chain.link/',
  ),
  matic: new ERC20Token(
    ChainId.ETHEREUM,
    '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    18,
    'MATIC',
    'Matic Token',
    'https://polygon.technology/',
  ),
  cbEth: new ERC20Token(
    ChainId.ETHEREUM,
    '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
    18,
    'cbETH',
    'Coinbase Wrapped Staked ETH',
    'https://www.coinbase.com/cbeth',
  ),
  ape: new ERC20Token(
    ChainId.ETHEREUM,
    '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
    18,
    'APE',
    'ApeCoin',
    'https://apecoin.com/',
  ),
  alcx: new ERC20Token(
    ChainId.ETHEREUM,
    '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF',
    18,
    'ALCX',
    'Alchemix',
    'https://alchemix.fi/',
  ),
  alETH: new ERC20Token(
    ChainId.ETHEREUM,
    '0x0100546F2cD4C9D97f798fFC9755E47865FF7Ee6',
    18,
    'alETH',
    'Alchemix ETH',
    'https://alchemix.fi/',
  ),
  fxs: new ERC20Token(
    ChainId.ETHEREUM,
    '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
    18,
    'FXS',
    'Frax Share',
    'https://frax.finance/',
  ),
  frxETH: new ERC20Token(
    ChainId.ETHEREUM,
    '0x5E8422345238F34275888049021821E8E08CAa1f',
    18,
    'frxETH',
    'Frax Ether',
    'https://frax.finance/',
  ),
  rpl: new ERC20Token(
    ChainId.ETHEREUM,
    '0xD33526068D116cE69F19A9ee46F0bd304F21A51f',
    18,
    'RPL',
    'Rocket Pool',
    'https://rocketpool.net/',
  ),
  rETH: new ERC20Token(
    ChainId.ETHEREUM,
    '0xae78736Cd615f374D3085123A210448E74Fc6393',
    18,
    'rETH',
    'Rocket Pool ETH',
    'https://rocketpool.net/',
  ),
  ankrETH: new ERC20Token(
    ChainId.ETHEREUM,
    '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    18,
    'ankrETH',
    'Ankr Staked ETH',
    'https://www.ankr.com/',
  ),
  axl: new ERC20Token(
    ChainId.ETHEREUM,
    '0x467719aD09025FcC6cF6F8311755809d45a5E5f3',
    6,
    'AXL',
    'Axelar',
    'https://axelar.network/',
  ),
  mask: new ERC20Token(
    ChainId.ETHEREUM,
    '0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074',
    18,
    'MASK',
    'Mask Network',
    'https://mask.io/',
  ),
  wncg: new ERC20Token(
    ChainId.ETHEREUM,
    '0xf203Ca1769ca8e9e8FE1DA9D147DB68B6c919817',
    18,
    'WNCG',
    'Wrapped NCG',
    'https://nine-chronicles.com/',
  ),
  ush: new ERC20Token(
    ChainId.ETHEREUM,
    '0xE60779CC1b2c1d0580611c526a8DF0E3f870EC48',
    18,
    'USH',
    'unshETHing_Token',
    'https://unsheth.xyz/',
  ),
  unshETH: new ERC20Token(
    ChainId.ETHEREUM,
    '0x0Ae38f7E10A43B5b2fB064B42a2f4514cbA909ef',
    18,
    'unshETH',
    'unshETH Ether',
    'https://unsheth.xyz/',
  ),
  wbeth: new ERC20Token(
    ChainId.ETHEREUM,
    '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
    18,
    'wBETH',
    'Wrapped Binance Beacon ETH',
    'https://ethereum.org/en/roadmap/beacon-chain/',
  ),
  pepe: new ERC20Token(
    ChainId.ETHEREUM,
    '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
    18,
    'PEPE',
    'Pepe',
    'https://www.pepe.vip/',
  ),
  blur: new ERC20Token(
    ChainId.ETHEREUM,
    '0x5283D291DBCF85356A21bA090E6db59121208b44',
    18,
    'BLUR',
    'Blur',
    'https://blur.io/',
  ),
  ens: new ERC20Token(
    ChainId.ETHEREUM,
    '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    18,
    'ENS',
    'Ethereum Name Service',
    'https://ens.domains/',
  ),
  tusd: new ERC20Token(
    ChainId.ETHEREUM,
    '0x0000000000085d4780B73119b644AE5ecd22b376',
    18,
    'TUSD',
    'TrueUSD',
    'https://tusd.io/',
  ),
  canto: new ERC20Token(
    ChainId.ETHEREUM,
    '0x56C03B8C4FA80Ba37F5A7b60CAAAEF749bB5b220',
    18,
    'CANTO',
    'Canto',
    'https://tusd.io/',
  ),
}

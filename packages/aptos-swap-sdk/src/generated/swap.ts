import { Types } from 'aptos'

export const swapInitStorage = (): Types.EntryFunctionPayload => {
  return {
    type_arguments: [],
    arguments: [],
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::swap::init_storage',
  }
}

export type SwapSetAdminArgs = [string]

export const swapSetAdmin = (args: SwapSetAdminArgs): Types.EntryFunctionPayload => {
  return {
    type_arguments: [],
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::swap::setAdmin',
  }
}

export type SwapSetFeeToArgs = [string]

export const swapSetFeeTo = (args: SwapSetFeeToArgs): Types.EntryFunctionPayload => {
  return {
    type_arguments: [],
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::swap::setFeeTo',
  }
}

export const swapWithdrawFee = (typeArgs: [string, string]): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: [],
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::swap::withdrawFee',
  }
}

export type RouterAddLiquidityArgs = [bigint | string, bigint | string, bigint | string, bigint | string]

export const routerAddLiquidity = (
  args: RouterAddLiquidityArgs,
  typeArgs: [string, string]
): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::add_liquidity',
  }
}

export const routerCreatePair = (typeArgs: [string, string]): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: [],
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::create_pair',
  }
}

export const routerRegisterLp = (typeArgs: [string, string]): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: [],
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::register_lp',
  }
}

export const routerRegisterToken = (typeArgs: [string]): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: [],
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::register_token',
  }
}

export type RouterRemoveLiquidityArgs = [bigint | string, bigint | string, bigint | string]

export const routerRemoveLiquidity = (
  args: RouterRemoveLiquidityArgs,
  typeArgs: [string, string]
): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::remove_liquidity',
  }
}

export type RouterSwapExactInputArgs = [bigint | string, bigint | string]

export const routerSwapExactInput = (
  args: RouterSwapExactInputArgs,
  typeArgs: [string, string]
): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::swap_exact_input',
  }
}

export type RouterSwapExactInputDoublehopArgs = [bigint | string, bigint | string]

export const routerSwapExactInputDoublehop = (
  args: RouterSwapExactInputDoublehopArgs,
  typeArgs: [string, string, string]
): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::swap_exact_input_doublehop',
  }
}

export type RouterSwapExactInputTriplehopArgs = [bigint | string, bigint | string]

export const routerSwapExactInputTriplehop = (
  args: RouterSwapExactInputTriplehopArgs,
  typeArgs: [string, string, string, string]
): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::swap_exact_input_triplehop',
  }
}

export type RouterSwapExactOutputArgs = [bigint | string, bigint | string]

export const routerSwapExactOutput = (
  args: RouterSwapExactOutputArgs,
  typeArgs: [string, string]
): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::swap_exact_output',
  }
}

export type RouterSwapExactOutputDoublehopArgs = [bigint | string, bigint | string]

export const routerSwapExactOutputDoublehop = (
  args: RouterSwapExactOutputDoublehopArgs,
  typeArgs: [string, string, string]
): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::swap_exact_output_doublehop',
  }
}

export type RouterSwapExactOutputTriplehopArgs = [bigint | string, bigint | string]

export const routerSwapExactOutputTriplehop = (
  args: RouterSwapExactOutputTriplehopArgs,
  typeArgs: [string, string, string, string]
): Types.EntryFunctionPayload => {
  return {
    type_arguments: typeArgs,
    arguments: args,
    function: '0x1a09f206351e643ed830298f870aa2a46cb566579e86c7be313569dda65557b0::router::swap_exact_output_triplehop',
  }
}

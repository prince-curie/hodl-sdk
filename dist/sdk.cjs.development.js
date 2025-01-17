'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var address = require('@ethersproject/address');
var warning = _interopDefault(require('tiny-warning'));
var _Big = _interopDefault(require('big.js'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var toFormat = _interopDefault(require('toformat'));
var solidity = require('@ethersproject/solidity');
var signingKey = require('@ethersproject/signing-key');
var eip712 = require('eip-712');
var bytes = require('@ethersproject/bytes');
var bignumber = require('@ethersproject/bignumber');
var contracts = require('@ethersproject/contracts');
var abi$1 = require('@ethersproject/abi');
var fetch = _interopDefault(require('isomorphic-unfetch'));

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["ROPSTEN"] = 3] = "ROPSTEN";
  ChainId[ChainId["RINKEBY"] = 4] = "RINKEBY";
  ChainId[ChainId["G\xD6RLI"] = 5] = "G\xD6RLI";
  ChainId[ChainId["KOVAN"] = 42] = "KOVAN";
  ChainId[ChainId["MATIC"] = 137] = "MATIC";
  ChainId[ChainId["MATIC_TESTNET"] = 80001] = "MATIC_TESTNET";
  ChainId[ChainId["FANTOM"] = 250] = "FANTOM";
  ChainId[ChainId["FANTOM_TESTNET"] = 4002] = "FANTOM_TESTNET";
  ChainId[ChainId["XDAI"] = 100] = "XDAI";
  ChainId[ChainId["BSC"] = 56] = "BSC";
  ChainId[ChainId["BSC_TESTNET"] = 97] = "BSC_TESTNET";
  ChainId[ChainId["ARBITRUM"] = 42161] = "ARBITRUM";
  ChainId[ChainId["ARBITRUM_TESTNET"] = 79377087078960] = "ARBITRUM_TESTNET";
  ChainId[ChainId["MOONBEAM_TESTNET"] = 1287] = "MOONBEAM_TESTNET";
  ChainId[ChainId["AVALANCHE"] = 43114] = "AVALANCHE";
  ChainId[ChainId["AVALANCHE_TESTNET"] = 43113] = "AVALANCHE_TESTNET";
  ChainId[ChainId["HECO"] = 128] = "HECO";
  ChainId[ChainId["HECO_TESTNET"] = 256] = "HECO_TESTNET";
  ChainId[ChainId["HARMONY"] = 1666600000] = "HARMONY";
  ChainId[ChainId["HARMONY_TESTNET"] = 1666700000] = "HARMONY_TESTNET";
  ChainId[ChainId["OKEX"] = 66] = "OKEX";
  ChainId[ChainId["OKEX_TESTNET"] = 65] = "OKEX_TESTNET";
  ChainId[ChainId["CELO"] = 42220] = "CELO";
  ChainId[ChainId["PALM"] = 11297108109] = "PALM";
  ChainId[ChainId["PALM_TESTNET"] = 11297108099] = "PALM_TESTNET";
})(exports.ChainId || (exports.ChainId = {})); //  "@hodlvalley/sdk": "git://github.com/hodlvalley/hodl-sdk.git",

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));

(function (KashiAction) {
  KashiAction[KashiAction["ADD_ASSET"] = 1] = "ADD_ASSET";
  KashiAction[KashiAction["REPAY"] = 2] = "REPAY";
  KashiAction[KashiAction["REMOVE_ASSET"] = 3] = "REMOVE_ASSET";
  KashiAction[KashiAction["REMOVE_COLLATERAL"] = 4] = "REMOVE_COLLATERAL";
  KashiAction[KashiAction["BORROW"] = 5] = "BORROW";
  KashiAction[KashiAction["GET_REPAY_SHARE"] = 6] = "GET_REPAY_SHARE";
  KashiAction[KashiAction["GET_REPAY_PART"] = 7] = "GET_REPAY_PART";
  KashiAction[KashiAction["ACCRUE"] = 8] = "ACCRUE"; // Functions that don't need accrue to be called

  KashiAction[KashiAction["ADD_COLLATERAL"] = 10] = "ADD_COLLATERAL";
  KashiAction[KashiAction["UPDATE_EXCHANGE_RATE"] = 11] = "UPDATE_EXCHANGE_RATE"; // Function on BentoBox

  KashiAction[KashiAction["BENTO_DEPOSIT"] = 20] = "BENTO_DEPOSIT";
  KashiAction[KashiAction["BENTO_WITHDRAW"] = 21] = "BENTO_WITHDRAW";
  KashiAction[KashiAction["BENTO_TRANSFER"] = 22] = "BENTO_TRANSFER";
  KashiAction[KashiAction["BENTO_TRANSFER_MULTIPLE"] = 23] = "BENTO_TRANSFER_MULTIPLE";
  KashiAction[KashiAction["BENTO_SETAPPROVAL"] = 24] = "BENTO_SETAPPROVAL"; // Any external call (except to BentoBox)

  KashiAction[KashiAction["CALL"] = 30] = "CALL";
})(exports.KashiAction || (exports.KashiAction = {}));

var _FACTORY_ADDRESS, _ROUTER_ADDRESS, _MONEY_ADDRESS, _FARMING_ADDRESS, _STAKING_ADDRESS, _TIME_ADDRESS, _MIGRATOR_ADDRESS, _WETH_ADDRESS, _BUYBACK_ADDRESS, _RESERVE_ADDRESS, _BENTOBOX_ADDRESS, _KASHI_ADDRESS, _MAKER_ADDRESS, _HODL_SWAPPER_ADDRESS, _HODL_MULTISWAPPER_AD, _HODL_MULTI_EXACT_SWA, _BORING_HELPER_ADDRES, _STOP_LIMIT_ORDER_ADD, _ARCHER_ROUTER_ADDRES, _MINICHEF_ADDRESS, _WETH9_ADDRESS, _WNATIVE_ADDRESS, _MASTERCHEF_V2_ADDRES, _ENS_REGISTRAR_ADDRES, _ZAPPER_ADDRESS, _MERKLE_DISTRIBUTOR_A, _MULTICALL2_ADDRESS;
var FACTORY_ADDRESS = (_FACTORY_ADDRESS = {}, _FACTORY_ADDRESS[exports.ChainId.MAINNET] = '', _FACTORY_ADDRESS[exports.ChainId.ROPSTEN] = '0x96F3aD81A8F1C688465F4818feEc33e483f821AE', _FACTORY_ADDRESS[exports.ChainId.RINKEBY] = '', _FACTORY_ADDRESS[exports.ChainId.GÖRLI] = '', _FACTORY_ADDRESS[exports.ChainId.KOVAN] = '', _FACTORY_ADDRESS[exports.ChainId.FANTOM] = '', _FACTORY_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.MATIC] = '', _FACTORY_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.XDAI] = '', _FACTORY_ADDRESS[exports.ChainId.BSC] = '', _FACTORY_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.ARBITRUM] = '', _FACTORY_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.AVALANCHE] = '', _FACTORY_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.HECO] = '', _FACTORY_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.HARMONY] = '', _FACTORY_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.OKEX] = '', _FACTORY_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _FACTORY_ADDRESS[exports.ChainId.CELO] = '', _FACTORY_ADDRESS[exports.ChainId.PALM] = '', _FACTORY_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _FACTORY_ADDRESS);
var ROUTER_ADDRESS = (_ROUTER_ADDRESS = {}, _ROUTER_ADDRESS[exports.ChainId.MAINNET] = '', _ROUTER_ADDRESS[exports.ChainId.RINKEBY] = '', _ROUTER_ADDRESS[exports.ChainId.ROPSTEN] = '0xA512c52a9A9bA55De28Db0268f13b8147F1281c9', _ROUTER_ADDRESS[exports.ChainId.GÖRLI] = '', _ROUTER_ADDRESS[exports.ChainId.KOVAN] = '', _ROUTER_ADDRESS[exports.ChainId.FANTOM] = '', _ROUTER_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.MATIC] = '', _ROUTER_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.XDAI] = '', _ROUTER_ADDRESS[exports.ChainId.BSC] = '', _ROUTER_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.ARBITRUM] = '', _ROUTER_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.AVALANCHE] = '', _ROUTER_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.HECO] = '', _ROUTER_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.HARMONY] = '', _ROUTER_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.OKEX] = '', _ROUTER_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _ROUTER_ADDRESS[exports.ChainId.CELO] = '', _ROUTER_ADDRESS[exports.ChainId.PALM] = '', _ROUTER_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _ROUTER_ADDRESS);
var MONEY_ADDRESS = (_MONEY_ADDRESS = {}, _MONEY_ADDRESS[exports.ChainId.MAINNET] = '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', _MONEY_ADDRESS[exports.ChainId.ROPSTEN] = '0xD224DC5E2005c315A944a4f9635dbecC4FE2C451', _MONEY_ADDRESS[exports.ChainId.RINKEBY] = '', _MONEY_ADDRESS[exports.ChainId.GÖRLI] = '', _MONEY_ADDRESS[exports.ChainId.KOVAN] = '', _MONEY_ADDRESS[exports.ChainId.FANTOM] = '', _MONEY_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.MATIC] = '', _MONEY_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.XDAI] = '', _MONEY_ADDRESS[exports.ChainId.BSC] = '', _MONEY_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.ARBITRUM] = '', _MONEY_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.AVALANCHE] = '', _MONEY_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.HECO] = '', _MONEY_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.HARMONY] = '', _MONEY_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.OKEX] = '', _MONEY_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _MONEY_ADDRESS[exports.ChainId.CELO] = '', _MONEY_ADDRESS[exports.ChainId.PALM] = '', _MONEY_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _MONEY_ADDRESS);
var FARMING_ADDRESS = (_FARMING_ADDRESS = {}, _FARMING_ADDRESS[exports.ChainId.MAINNET] = '', _FARMING_ADDRESS[exports.ChainId.ROPSTEN] = '0x0cA9dB5467c9a05a74C215b993655aa93F15bA17', _FARMING_ADDRESS[exports.ChainId.RINKEBY] = '', _FARMING_ADDRESS[exports.ChainId.GÖRLI] = '', _FARMING_ADDRESS[exports.ChainId.KOVAN] = '', _FARMING_ADDRESS[exports.ChainId.FANTOM] = '', _FARMING_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.MATIC] = '', _FARMING_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.XDAI] = '', _FARMING_ADDRESS[exports.ChainId.BSC] = '', _FARMING_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.ARBITRUM] = '', _FARMING_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.AVALANCHE] = '', _FARMING_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.HECO] = '', _FARMING_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.HARMONY] = '', _FARMING_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.OKEX] = '', _FARMING_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _FARMING_ADDRESS[exports.ChainId.CELO] = '', _FARMING_ADDRESS[exports.ChainId.PALM] = '', _FARMING_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _FARMING_ADDRESS);
var STAKING_ADDRESS = (_STAKING_ADDRESS = {}, _STAKING_ADDRESS[exports.ChainId.MAINNET] = '', _STAKING_ADDRESS[exports.ChainId.ROPSTEN] = '0xef67239950364b22e6474a5bbe9cc075c4026c82', _STAKING_ADDRESS[exports.ChainId.RINKEBY] = '', _STAKING_ADDRESS[exports.ChainId.GÖRLI] = '', _STAKING_ADDRESS[exports.ChainId.KOVAN] = '', _STAKING_ADDRESS[exports.ChainId.FANTOM] = '', _STAKING_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.MATIC] = '', _STAKING_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.XDAI] = '', _STAKING_ADDRESS[exports.ChainId.BSC] = '', _STAKING_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.ARBITRUM] = '', _STAKING_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.AVALANCHE] = '', _STAKING_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.HECO] = '', _STAKING_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.HARMONY] = '', _STAKING_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.OKEX] = '', _STAKING_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _STAKING_ADDRESS[exports.ChainId.CELO] = '', _STAKING_ADDRESS[exports.ChainId.PALM] = '', _STAKING_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _STAKING_ADDRESS);
var TIME_ADDRESS = (_TIME_ADDRESS = {}, _TIME_ADDRESS[exports.ChainId.MAINNET] = '', _TIME_ADDRESS[exports.ChainId.ROPSTEN] = '0x98C1B5E65226A628589B055cFFD8452e1945C31d', _TIME_ADDRESS[exports.ChainId.RINKEBY] = '', _TIME_ADDRESS[exports.ChainId.GÖRLI] = '', _TIME_ADDRESS[exports.ChainId.KOVAN] = '', _TIME_ADDRESS[exports.ChainId.FANTOM] = '', _TIME_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.MATIC] = '', _TIME_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.XDAI] = '', _TIME_ADDRESS[exports.ChainId.BSC] = '', _TIME_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.ARBITRUM] = '', _TIME_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.AVALANCHE] = '', _TIME_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.HECO] = '', _TIME_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.HARMONY] = '', _TIME_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.OKEX] = '', _TIME_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _TIME_ADDRESS[exports.ChainId.CELO] = '', _TIME_ADDRESS[exports.ChainId.PALM] = '', _TIME_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _TIME_ADDRESS);
var MIGRATOR_ADDRESS = (_MIGRATOR_ADDRESS = {}, _MIGRATOR_ADDRESS[exports.ChainId.MAINNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.ROPSTEN] = '0xA7E18a61b54D6eB00B1e7425BE0137bAe21FFFfF', _MIGRATOR_ADDRESS[exports.ChainId.RINKEBY] = '', _MIGRATOR_ADDRESS[exports.ChainId.GÖRLI] = '', _MIGRATOR_ADDRESS[exports.ChainId.KOVAN] = '', _MIGRATOR_ADDRESS[exports.ChainId.FANTOM] = '', _MIGRATOR_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.MATIC] = '', _MIGRATOR_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.XDAI] = '', _MIGRATOR_ADDRESS[exports.ChainId.BSC] = '', _MIGRATOR_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.ARBITRUM] = '', _MIGRATOR_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.AVALANCHE] = '', _MIGRATOR_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.HECO] = '', _MIGRATOR_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.HARMONY] = '', _MIGRATOR_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.OKEX] = '', _MIGRATOR_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _MIGRATOR_ADDRESS[exports.ChainId.CELO] = '', _MIGRATOR_ADDRESS[exports.ChainId.PALM] = '', _MIGRATOR_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _MIGRATOR_ADDRESS);
var WETH_ADDRESS = (_WETH_ADDRESS = {}, _WETH_ADDRESS[exports.ChainId.MAINNET] = '', _WETH_ADDRESS[exports.ChainId.ROPSTEN] = '0xc778417E063141139Fce010982780140Aa0cD5Ab', _WETH_ADDRESS[exports.ChainId.RINKEBY] = '', _WETH_ADDRESS[exports.ChainId.GÖRLI] = '', _WETH_ADDRESS[exports.ChainId.KOVAN] = '', _WETH_ADDRESS[exports.ChainId.FANTOM] = '', _WETH_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.MATIC] = '', _WETH_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.XDAI] = '', _WETH_ADDRESS[exports.ChainId.BSC] = '', _WETH_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.ARBITRUM] = '', _WETH_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.AVALANCHE] = '', _WETH_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.HECO] = '', _WETH_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.HARMONY] = '', _WETH_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.OKEX] = '', _WETH_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _WETH_ADDRESS[exports.ChainId.CELO] = '', _WETH_ADDRESS[exports.ChainId.PALM] = '', _WETH_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _WETH_ADDRESS);
var BUYBACK_ADDRESS = (_BUYBACK_ADDRESS = {}, _BUYBACK_ADDRESS[exports.ChainId.MAINNET] = '', _BUYBACK_ADDRESS[exports.ChainId.ROPSTEN] = '0x5ff9c2233e48210235d356fc61e48e1fcfcc102f', _BUYBACK_ADDRESS[exports.ChainId.RINKEBY] = '', _BUYBACK_ADDRESS[exports.ChainId.GÖRLI] = '', _BUYBACK_ADDRESS[exports.ChainId.KOVAN] = '', _BUYBACK_ADDRESS[exports.ChainId.FANTOM] = '', _BUYBACK_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.MATIC] = '', _BUYBACK_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.XDAI] = '', _BUYBACK_ADDRESS[exports.ChainId.BSC] = '', _BUYBACK_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.ARBITRUM] = '', _BUYBACK_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.AVALANCHE] = '', _BUYBACK_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.HECO] = '', _BUYBACK_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.HARMONY] = '', _BUYBACK_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.OKEX] = '', _BUYBACK_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _BUYBACK_ADDRESS[exports.ChainId.CELO] = '', _BUYBACK_ADDRESS[exports.ChainId.PALM] = '', _BUYBACK_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _BUYBACK_ADDRESS);
var RESERVE_ADDRESS = (_RESERVE_ADDRESS = {}, _RESERVE_ADDRESS[exports.ChainId.MAINNET] = '', _RESERVE_ADDRESS[exports.ChainId.ROPSTEN] = '0x22661F2f798e2dc8B798fbEEFC0096EC01F65874', _RESERVE_ADDRESS[exports.ChainId.RINKEBY] = '', _RESERVE_ADDRESS[exports.ChainId.GÖRLI] = '', _RESERVE_ADDRESS[exports.ChainId.KOVAN] = '', _RESERVE_ADDRESS[exports.ChainId.FANTOM] = '', _RESERVE_ADDRESS[exports.ChainId.FANTOM_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.MATIC] = '', _RESERVE_ADDRESS[exports.ChainId.MATIC_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.XDAI] = '', _RESERVE_ADDRESS[exports.ChainId.BSC] = '', _RESERVE_ADDRESS[exports.ChainId.BSC_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.ARBITRUM] = '', _RESERVE_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.AVALANCHE] = '', _RESERVE_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.HECO] = '', _RESERVE_ADDRESS[exports.ChainId.HECO_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.HARMONY] = '', _RESERVE_ADDRESS[exports.ChainId.HARMONY_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.OKEX] = '', _RESERVE_ADDRESS[exports.ChainId.OKEX_TESTNET] = '', _RESERVE_ADDRESS[exports.ChainId.CELO] = '', _RESERVE_ADDRESS[exports.ChainId.PALM] = '', _RESERVE_ADDRESS[exports.ChainId.PALM_TESTNET] = '', _RESERVE_ADDRESS);
var BENTOBOX_ADDRESS = (_BENTOBOX_ADDRESS = {}, _BENTOBOX_ADDRESS[exports.ChainId.MAINNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.ROPSTEN] = "", _BENTOBOX_ADDRESS[exports.ChainId.RINKEBY] = "", _BENTOBOX_ADDRESS[exports.ChainId.GÖRLI] = "", _BENTOBOX_ADDRESS[exports.ChainId.KOVAN] = "", _BENTOBOX_ADDRESS[exports.ChainId.FANTOM] = "", _BENTOBOX_ADDRESS[exports.ChainId.FANTOM_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.MATIC] = "", _BENTOBOX_ADDRESS[exports.ChainId.MATIC_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.XDAI] = "", _BENTOBOX_ADDRESS[exports.ChainId.BSC] = "", _BENTOBOX_ADDRESS[exports.ChainId.BSC_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.ARBITRUM] = "", _BENTOBOX_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.AVALANCHE] = "", _BENTOBOX_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.HECO] = "", _BENTOBOX_ADDRESS[exports.ChainId.HECO_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.HARMONY] = "", _BENTOBOX_ADDRESS[exports.ChainId.HARMONY_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.OKEX] = "", _BENTOBOX_ADDRESS[exports.ChainId.OKEX_TESTNET] = "", _BENTOBOX_ADDRESS[exports.ChainId.CELO] = "", _BENTOBOX_ADDRESS[exports.ChainId.PALM] = "", _BENTOBOX_ADDRESS[exports.ChainId.PALM_TESTNET] = "", _BENTOBOX_ADDRESS);
var KASHI_ADDRESS = (_KASHI_ADDRESS = {}, _KASHI_ADDRESS[exports.ChainId.MAINNET] = "", _KASHI_ADDRESS[exports.ChainId.ROPSTEN] = "", _KASHI_ADDRESS[exports.ChainId.RINKEBY] = "", _KASHI_ADDRESS[exports.ChainId.GÖRLI] = "", _KASHI_ADDRESS[exports.ChainId.KOVAN] = "", _KASHI_ADDRESS[exports.ChainId.FANTOM] = "", _KASHI_ADDRESS[exports.ChainId.FANTOM_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.MATIC] = "", _KASHI_ADDRESS[exports.ChainId.MATIC_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.XDAI] = "", _KASHI_ADDRESS[exports.ChainId.BSC] = "", _KASHI_ADDRESS[exports.ChainId.BSC_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.ARBITRUM] = "", _KASHI_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.AVALANCHE] = "", _KASHI_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.HECO] = "", _KASHI_ADDRESS[exports.ChainId.HECO_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.HARMONY] = "", _KASHI_ADDRESS[exports.ChainId.HARMONY_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.OKEX] = "", _KASHI_ADDRESS[exports.ChainId.OKEX_TESTNET] = "", _KASHI_ADDRESS[exports.ChainId.CELO] = "", _KASHI_ADDRESS[exports.ChainId.PALM] = "", _KASHI_ADDRESS[exports.ChainId.PALM_TESTNET] = "", _KASHI_ADDRESS);
var MAKER_ADDRESS = (_MAKER_ADDRESS = {}, _MAKER_ADDRESS[exports.ChainId.MAINNET] = "", _MAKER_ADDRESS[exports.ChainId.ROPSTEN] = "", _MAKER_ADDRESS[exports.ChainId.RINKEBY] = "", _MAKER_ADDRESS[exports.ChainId.GÖRLI] = "", _MAKER_ADDRESS[exports.ChainId.KOVAN] = "", _MAKER_ADDRESS[exports.ChainId.FANTOM] = "", _MAKER_ADDRESS[exports.ChainId.FANTOM_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.MATIC] = "", _MAKER_ADDRESS[exports.ChainId.MATIC_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.XDAI] = "", _MAKER_ADDRESS[exports.ChainId.BSC] = "", _MAKER_ADDRESS[exports.ChainId.BSC_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.ARBITRUM] = "", _MAKER_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.AVALANCHE] = "", _MAKER_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.HECO] = "", _MAKER_ADDRESS[exports.ChainId.HECO_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.HARMONY] = "", _MAKER_ADDRESS[exports.ChainId.HARMONY_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.OKEX] = "", _MAKER_ADDRESS[exports.ChainId.OKEX_TESTNET] = "", _MAKER_ADDRESS[exports.ChainId.CELO] = "", _MAKER_ADDRESS[exports.ChainId.PALM] = "", _MAKER_ADDRESS[exports.ChainId.PALM_TESTNET] = "", _MAKER_ADDRESS);
var HODL_SWAPPER_ADDRESS = (_HODL_SWAPPER_ADDRESS = {}, _HODL_SWAPPER_ADDRESS[exports.ChainId.MAINNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.ROPSTEN] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.RINKEBY] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.GÖRLI] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.KOVAN] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.FANTOM] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.FANTOM_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.MATIC] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.MATIC_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.XDAI] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.BSC] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.BSC_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.ARBITRUM] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.AVALANCHE] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.HECO] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.HECO_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.HARMONY] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.HARMONY_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.OKEX] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.OKEX_TESTNET] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.CELO] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.PALM] = "", _HODL_SWAPPER_ADDRESS[exports.ChainId.PALM_TESTNET] = "", _HODL_SWAPPER_ADDRESS);
var HODL_MULTISWAPPER_ADDRESS = (_HODL_MULTISWAPPER_AD = {}, _HODL_MULTISWAPPER_AD[exports.ChainId.MAINNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.ROPSTEN] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.RINKEBY] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.GÖRLI] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.KOVAN] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.FANTOM] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.FANTOM_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.MATIC] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.MATIC_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.XDAI] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.BSC] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.BSC_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.ARBITRUM] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.ARBITRUM_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.MOONBEAM_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.AVALANCHE] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.AVALANCHE_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.HECO] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.HECO_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.HARMONY] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.HARMONY_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.OKEX] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.OKEX_TESTNET] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.CELO] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.PALM] = "", _HODL_MULTISWAPPER_AD[exports.ChainId.PALM_TESTNET] = "", _HODL_MULTISWAPPER_AD);
var HODL_MULTI_EXACT_SWAPPER_ADDRESS = (_HODL_MULTI_EXACT_SWA = {}, _HODL_MULTI_EXACT_SWA[exports.ChainId.MAINNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.ROPSTEN] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.RINKEBY] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.GÖRLI] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.KOVAN] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.FANTOM] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.FANTOM_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.MATIC] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.MATIC_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.XDAI] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.BSC] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.BSC_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.ARBITRUM] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.ARBITRUM_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.MOONBEAM_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.AVALANCHE] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.AVALANCHE_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.HECO] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.HECO_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.HARMONY] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.HARMONY_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.OKEX] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.OKEX_TESTNET] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.CELO] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.PALM] = "", _HODL_MULTI_EXACT_SWA[exports.ChainId.PALM_TESTNET] = "", _HODL_MULTI_EXACT_SWA);
var PEGGED_ORACLE_ADDRESS = "";
var HODL_TWAP_0_ORACLE_ADDRESS = "";
var HODL_TWAP_1_ORACLE_ADDRESS = "";
var CHAINLINK_ORACLE_ADDRESS = "";
var BORING_HELPER_ADDRESS = (_BORING_HELPER_ADDRES = {}, _BORING_HELPER_ADDRES[exports.ChainId.MAINNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.ROPSTEN] = "", _BORING_HELPER_ADDRES[exports.ChainId.RINKEBY] = "", _BORING_HELPER_ADDRES[exports.ChainId.GÖRLI] = "", _BORING_HELPER_ADDRES[exports.ChainId.KOVAN] = "", _BORING_HELPER_ADDRES[exports.ChainId.FANTOM] = "", _BORING_HELPER_ADDRES[exports.ChainId.FANTOM_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.MATIC] = "", _BORING_HELPER_ADDRES[exports.ChainId.MATIC_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.XDAI] = "", _BORING_HELPER_ADDRES[exports.ChainId.BSC] = "", _BORING_HELPER_ADDRES[exports.ChainId.BSC_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.ARBITRUM] = "", _BORING_HELPER_ADDRES[exports.ChainId.ARBITRUM_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.MOONBEAM_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.AVALANCHE] = "", _BORING_HELPER_ADDRES[exports.ChainId.AVALANCHE_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.HECO] = "", _BORING_HELPER_ADDRES[exports.ChainId.HECO_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.HARMONY] = "", _BORING_HELPER_ADDRES[exports.ChainId.HARMONY_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.OKEX] = "", _BORING_HELPER_ADDRES[exports.ChainId.OKEX_TESTNET] = "", _BORING_HELPER_ADDRES[exports.ChainId.CELO] = "", _BORING_HELPER_ADDRES[exports.ChainId.PALM] = "", _BORING_HELPER_ADDRES[exports.ChainId.PALM_TESTNET] = "", _BORING_HELPER_ADDRES);
var STOP_LIMIT_ORDER_ADDRESS = (_STOP_LIMIT_ORDER_ADD = {}, _STOP_LIMIT_ORDER_ADD[exports.ChainId.MAINNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.ROPSTEN] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.RINKEBY] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.GÖRLI] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.KOVAN] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.FANTOM] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.FANTOM_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.MATIC] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.MATIC_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.XDAI] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.BSC] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.BSC_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.ARBITRUM] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.ARBITRUM_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.MOONBEAM_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.AVALANCHE] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.AVALANCHE_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.HECO] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.HECO_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.HARMONY] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.HARMONY_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.OKEX] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.OKEX_TESTNET] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.CELO] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.PALM] = "", _STOP_LIMIT_ORDER_ADD[exports.ChainId.PALM_TESTNET] = "", _STOP_LIMIT_ORDER_ADD);
var ARCHER_ROUTER_ADDRESS = (_ARCHER_ROUTER_ADDRES = {}, _ARCHER_ROUTER_ADDRES[exports.ChainId.MAINNET] = "", _ARCHER_ROUTER_ADDRES);
var MINICHEF_ADDRESS = (_MINICHEF_ADDRESS = {}, _MINICHEF_ADDRESS[exports.ChainId.MATIC] = "", _MINICHEF_ADDRESS[exports.ChainId.XDAI] = "", _MINICHEF_ADDRESS[exports.ChainId.HARMONY] = "", _MINICHEF_ADDRESS);
var WETH9_ADDRESS = (_WETH9_ADDRESS = {}, _WETH9_ADDRESS[exports.ChainId.MAINNET] = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", _WETH9_ADDRESS[exports.ChainId.ROPSTEN] = "0xc778417E063141139Fce010982780140Aa0cD5Ab", _WETH9_ADDRESS[exports.ChainId.RINKEBY] = "0xc778417E063141139Fce010982780140Aa0cD5Ab", _WETH9_ADDRESS[exports.ChainId.GÖRLI] = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", _WETH9_ADDRESS[exports.ChainId.KOVAN] = "0xd0A1E359811322d97991E03f863a0C30C2cF029C", _WETH9_ADDRESS[exports.ChainId.ARBITRUM] = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", _WETH9_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = "0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b", _WETH9_ADDRESS[exports.ChainId.BSC] = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", _WETH9_ADDRESS[exports.ChainId.FANTOM] = "0x74b23882a30290451A17c44f4F05243b6b58C76d", _WETH9_ADDRESS[exports.ChainId.MATIC] = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", _WETH9_ADDRESS[exports.ChainId.OKEX] = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", _WETH9_ADDRESS[exports.ChainId.HECO] = "0x64FF637fB478863B7468bc97D30a5bF3A428a1fD", _WETH9_ADDRESS[exports.ChainId.HARMONY] = "0x6983D1E6DEf3690C4d616b13597A09e6193EA013", _WETH9_ADDRESS[exports.ChainId.XDAI] = "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1", _WETH9_ADDRESS[exports.ChainId.AVALANCHE] = "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15", _WETH9_ADDRESS);
var WNATIVE_ADDRESS = (_WNATIVE_ADDRESS = {}, _WNATIVE_ADDRESS[exports.ChainId.MAINNET] = WETH9_ADDRESS[exports.ChainId.MAINNET], _WNATIVE_ADDRESS[exports.ChainId.ROPSTEN] = WETH9_ADDRESS[exports.ChainId.ROPSTEN], _WNATIVE_ADDRESS[exports.ChainId.RINKEBY] = WETH9_ADDRESS[exports.ChainId.RINKEBY], _WNATIVE_ADDRESS[exports.ChainId.GÖRLI] = WETH9_ADDRESS[exports.ChainId.GÖRLI], _WNATIVE_ADDRESS[exports.ChainId.KOVAN] = WETH9_ADDRESS[exports.ChainId.KOVAN], _WNATIVE_ADDRESS[exports.ChainId.ARBITRUM] = WETH9_ADDRESS[exports.ChainId.ARBITRUM], _WNATIVE_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = WETH9_ADDRESS[exports.ChainId.ARBITRUM_TESTNET], _WNATIVE_ADDRESS[exports.ChainId.FANTOM] = "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", _WNATIVE_ADDRESS[exports.ChainId.FANTOM_TESTNET] = "0xf1277d1Ed8AD466beddF92ef448A132661956621", _WNATIVE_ADDRESS[exports.ChainId.MATIC] = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", _WNATIVE_ADDRESS[exports.ChainId.MATIC_TESTNET] = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", _WNATIVE_ADDRESS[exports.ChainId.XDAI] = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d", _WNATIVE_ADDRESS[exports.ChainId.BSC] = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", _WNATIVE_ADDRESS[exports.ChainId.BSC_TESTNET] = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", _WNATIVE_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = "0xe73763DB808ecCDC0E36bC8E32510ED126910394", _WNATIVE_ADDRESS[exports.ChainId.AVALANCHE] = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", _WNATIVE_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = "0xd00ae08403B9bbb9124bB305C09058E32C39A48c", _WNATIVE_ADDRESS[exports.ChainId.HECO] = "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F", _WNATIVE_ADDRESS[exports.ChainId.HECO_TESTNET] = "0x5B2DA6F42CA09C77D577a12BeaD0446148830687", _WNATIVE_ADDRESS[exports.ChainId.HARMONY] = "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a", _WNATIVE_ADDRESS[exports.ChainId.HARMONY_TESTNET] = "0x7a2afac38517d512E55C0bCe3b6805c10a04D60F", _WNATIVE_ADDRESS[exports.ChainId.OKEX] = "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15", _WNATIVE_ADDRESS[exports.ChainId.OKEX_TESTNET] = "0x2219845942d28716c0F7C605765fABDcA1a7d9E0", _WNATIVE_ADDRESS[exports.ChainId.CELO] = "0x471EcE3750Da237f93B8E339c536989b8978a438", _WNATIVE_ADDRESS[exports.ChainId.PALM] = "0xF98cABF0a963452C5536330408B2590567611a71", _WNATIVE_ADDRESS);
var MASTERCHEF_V2_ADDRESS = (_MASTERCHEF_V2_ADDRES = {}, _MASTERCHEF_V2_ADDRES[exports.ChainId.MAINNET] = "", _MASTERCHEF_V2_ADDRES);
var ENS_REGISTRAR_ADDRESS = (_ENS_REGISTRAR_ADDRES = {}, _ENS_REGISTRAR_ADDRES[exports.ChainId.MAINNET] = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", _ENS_REGISTRAR_ADDRES[exports.ChainId.GÖRLI] = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", _ENS_REGISTRAR_ADDRES[exports.ChainId.ROPSTEN] = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", _ENS_REGISTRAR_ADDRES[exports.ChainId.RINKEBY] = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", _ENS_REGISTRAR_ADDRES);
var ZAPPER_ADDRESS = (_ZAPPER_ADDRESS = {}, _ZAPPER_ADDRESS[exports.ChainId.MAINNET] = "", _ZAPPER_ADDRESS[exports.ChainId.ROPSTEN] = "", _ZAPPER_ADDRESS);
var MERKLE_DISTRIBUTOR_ADDRESS = (_MERKLE_DISTRIBUTOR_A = {}, _MERKLE_DISTRIBUTOR_A[exports.ChainId.MAINNET] = "0xcBE6B83e77cdc011Cc18F6f0Df8444E5783ed982", _MERKLE_DISTRIBUTOR_A[exports.ChainId.ROPSTEN] = "0x84d1f7202e0e7dac211617017ca72a2cb5e2b955", _MERKLE_DISTRIBUTOR_A);
var MULTICALL2_ADDRESS = (_MULTICALL2_ADDRESS = {}, _MULTICALL2_ADDRESS[exports.ChainId.MAINNET] = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696", _MULTICALL2_ADDRESS[exports.ChainId.ROPSTEN] = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696", _MULTICALL2_ADDRESS[exports.ChainId.RINKEBY] = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696", _MULTICALL2_ADDRESS[exports.ChainId.GÖRLI] = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696", _MULTICALL2_ADDRESS[exports.ChainId.KOVAN] = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696", _MULTICALL2_ADDRESS[exports.ChainId.ARBITRUM] = "0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB", _MULTICALL2_ADDRESS[exports.ChainId.ARBITRUM_TESTNET] = "0xa501c031958F579dB7676fF1CE78AD305794d579", _MULTICALL2_ADDRESS[exports.ChainId.CELO] = "0x9aac9048fC8139667D6a2597B902865bfdc225d3", _MULTICALL2_ADDRESS[exports.ChainId.FANTOM] = "0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5", _MULTICALL2_ADDRESS[exports.ChainId.FANTOM_TESTNET] = "", _MULTICALL2_ADDRESS[exports.ChainId.MATIC] = "0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD", _MULTICALL2_ADDRESS[exports.ChainId.MATIC_TESTNET] = "", _MULTICALL2_ADDRESS[exports.ChainId.XDAI] = "0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287", _MULTICALL2_ADDRESS[exports.ChainId.BSC] = "0xa9193376D09C7f31283C54e56D013fCF370Cd9D9", _MULTICALL2_ADDRESS[exports.ChainId.BSC_TESTNET] = "", _MULTICALL2_ADDRESS[exports.ChainId.MOONBEAM_TESTNET] = "", _MULTICALL2_ADDRESS[exports.ChainId.AVALANCHE] = "0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3", _MULTICALL2_ADDRESS[exports.ChainId.AVALANCHE_TESTNET] = "", _MULTICALL2_ADDRESS[exports.ChainId.HECO] = "0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3", _MULTICALL2_ADDRESS[exports.ChainId.HECO_TESTNET] = "", _MULTICALL2_ADDRESS[exports.ChainId.HARMONY] = "0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3", _MULTICALL2_ADDRESS[exports.ChainId.HARMONY_TESTNET] = "", _MULTICALL2_ADDRESS[exports.ChainId.OKEX] = "0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3", _MULTICALL2_ADDRESS[exports.ChainId.OKEX_TESTNET] = "", _MULTICALL2_ADDRESS[exports.ChainId.PALM] = "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F", _MULTICALL2_ADDRESS);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */

var AbstractCurrency =
/**
 * Constructs an instance of the base class `BaseCurrency`.
 * @param chainId the chain ID on which this currency resides
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function AbstractCurrency(chainId, decimals, symbol, name) {
  !Number.isSafeInteger(chainId) ?  invariant(false, "CHAIN_ID")  : void 0;
  !(decimals >= 0 && decimals < 255 && Number.isInteger(decimals)) ?  invariant(false, "DECIMALS")  : void 0;
  this.chainId = chainId;
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};

/**
 * Represents the native currency of the chain on which it resides, e.g.
 */

var NativeCurrency = /*#__PURE__*/function (_AbstractCurrency) {
  _inheritsLoose(NativeCurrency, _AbstractCurrency);

  function NativeCurrency() {
    var _this;

    _this = _AbstractCurrency.apply(this, arguments) || this;
    _this.isNative = true;
    _this.isToken = false;
    return _this;
  }

  return NativeCurrency;
}(AbstractCurrency);

function validateAndParseAddress(address$1) {
  try {
    var checksummedAddress = address.getAddress(address$1);
    "development" !== "production" ? warning(address$1 === checksummedAddress, address$1 + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
      invariant(false, address$1 + " is not a valid address.")  ;
  }
}

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_AbstractCurrency) {
  _inheritsLoose(Token, _AbstractCurrency);

  function Token(chainId, address, decimals, symbol, name) {
    var _this;

    _this = _AbstractCurrency.call(this, chainId, decimals, symbol, name) || this;
    _this.isNative = false;
    _this.isToken = true;
    _this.chainId = chainId;
    _this.address = validateAndParseAddress(address);
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    return other.isToken && this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, "CHAIN_IDS")  : void 0;
    !(this.address !== other.address) ?  invariant(false, "ADDRESSES")  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  }
  /**
   * Return this token, which does not need to be wrapped
   */
  ;

  _createClass(Token, [{
    key: "wrapped",
    get: function get() {
      return this;
    }
  }]);

  return Token;
}(AbstractCurrency);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}

var _WETH, _WNATIVE;
var WETH9 = (_WETH = {}, _WETH[exports.ChainId.MAINNET] = /*#__PURE__*/new Token(exports.ChainId.MAINNET, WETH9_ADDRESS[exports.ChainId.MAINNET], 18, "WETH9", "Wrapped Ether"), _WETH[exports.ChainId.ROPSTEN] = /*#__PURE__*/new Token(exports.ChainId.ROPSTEN, WETH9_ADDRESS[exports.ChainId.ROPSTEN], 18, "WETH9", "Wrapped Ether"), _WETH[exports.ChainId.RINKEBY] = /*#__PURE__*/new Token(exports.ChainId.RINKEBY, WETH9_ADDRESS[exports.ChainId.RINKEBY], 18, "WETH9", "Wrapped Ether"), _WETH[exports.ChainId.GÖRLI] = /*#__PURE__*/new Token(exports.ChainId.GÖRLI, WETH9_ADDRESS[exports.ChainId.GÖRLI], 18, "WETH9", "Wrapped Ether"), _WETH[exports.ChainId.KOVAN] = /*#__PURE__*/new Token(exports.ChainId.KOVAN, WETH9_ADDRESS[exports.ChainId.KOVAN], 18, "WETH9", "Wrapped Ether"), _WETH[exports.ChainId.ARBITRUM] = /*#__PURE__*/new Token(exports.ChainId.ARBITRUM, WETH9_ADDRESS[exports.ChainId.ARBITRUM], 18, "WETH9", "Wrapped Ether"), _WETH[exports.ChainId.ARBITRUM_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.ARBITRUM_TESTNET, WETH9_ADDRESS[exports.ChainId.ARBITRUM_TESTNET], 18, "WETH", "Wrapped Ether"), _WETH[exports.ChainId.BSC] = /*#__PURE__*/new Token(exports.ChainId.BSC, WETH9_ADDRESS[exports.ChainId.BSC], 18, "WETH", "Wrapped Ether"), _WETH[exports.ChainId.FANTOM] = /*#__PURE__*/new Token(exports.ChainId.FANTOM, WETH9_ADDRESS[exports.ChainId.FANTOM], 18, "WETH", "Wrapped Ether"), _WETH[exports.ChainId.MATIC] = /*#__PURE__*/new Token(exports.ChainId.MATIC, WETH9_ADDRESS[exports.ChainId.MATIC], 18, "WETH", "Wrapped Ether"), _WETH[exports.ChainId.OKEX] = /*#__PURE__*/new Token(exports.ChainId.OKEX, WETH9_ADDRESS[exports.ChainId.OKEX], 18, "WETH", "Wrapped Ether"), _WETH[exports.ChainId.HECO] = /*#__PURE__*/new Token(exports.ChainId.HECO, WETH9_ADDRESS[exports.ChainId.HECO], 18, "WETH", "Wrapped Ether"), _WETH[exports.ChainId.HARMONY] = /*#__PURE__*/new Token(exports.ChainId.HARMONY, WETH9_ADDRESS[exports.ChainId.HARMONY], 18, "WETH", "Wrapped Ether"), _WETH[exports.ChainId.XDAI] = /*#__PURE__*/new Token(exports.ChainId.XDAI, WETH9_ADDRESS[exports.ChainId.XDAI], 18, "WETH", "Wrapped Ether"), _WETH[exports.ChainId.AVALANCHE] = /*#__PURE__*/new Token(exports.ChainId.AVALANCHE, WETH9_ADDRESS[exports.ChainId.AVALANCHE], 18, "WETH", "Wrapped Ether"), _WETH);
var WNATIVE = (_WNATIVE = {}, _WNATIVE[exports.ChainId.MAINNET] = WETH9[exports.ChainId.MAINNET], _WNATIVE[exports.ChainId.ROPSTEN] = WETH9[exports.ChainId.ROPSTEN], _WNATIVE[exports.ChainId.RINKEBY] = WETH9[exports.ChainId.RINKEBY], _WNATIVE[exports.ChainId.GÖRLI] = WETH9[exports.ChainId.GÖRLI], _WNATIVE[exports.ChainId.KOVAN] = WETH9[exports.ChainId.KOVAN], _WNATIVE[exports.ChainId.FANTOM] = /*#__PURE__*/new Token(exports.ChainId.FANTOM, WNATIVE_ADDRESS[exports.ChainId.FANTOM], 18, "WFTM", "Wrapped FTM"), _WNATIVE[exports.ChainId.FANTOM_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.FANTOM_TESTNET, WNATIVE_ADDRESS[exports.ChainId.FANTOM_TESTNET], 18, "FTM", "Wrapped FTM"), _WNATIVE[exports.ChainId.MATIC] = /*#__PURE__*/new Token(exports.ChainId.MATIC, WNATIVE_ADDRESS[exports.ChainId.MATIC], 18, "WMATIC", "Wrapped Matic"), _WNATIVE[exports.ChainId.MATIC_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MATIC_TESTNET, WNATIVE_ADDRESS[exports.ChainId.MATIC_TESTNET], 18, "WMATIC", "Wrapped Matic"), _WNATIVE[exports.ChainId.XDAI] = /*#__PURE__*/new Token(exports.ChainId.XDAI, WNATIVE_ADDRESS[exports.ChainId.XDAI], 18, "WXDAI", "Wrapped xDai"), _WNATIVE[exports.ChainId.BSC] = /*#__PURE__*/new Token(exports.ChainId.BSC, WNATIVE_ADDRESS[exports.ChainId.BSC], 18, "WBNB", "Wrapped BNB"), _WNATIVE[exports.ChainId.BSC_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.BSC_TESTNET, WNATIVE_ADDRESS[exports.ChainId.BSC_TESTNET], 18, "WBNB", "Wrapped BNB"), _WNATIVE[exports.ChainId.ARBITRUM] = WETH9[exports.ChainId.ARBITRUM], _WNATIVE[exports.ChainId.ARBITRUM_TESTNET] = WETH9[exports.ChainId.ARBITRUM_TESTNET], _WNATIVE[exports.ChainId.MOONBEAM_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MOONBEAM_TESTNET, WNATIVE_ADDRESS[exports.ChainId.MOONBEAM_TESTNET], 18, "WETH", "Wrapped Ether"), _WNATIVE[exports.ChainId.AVALANCHE] = /*#__PURE__*/new Token(exports.ChainId.AVALANCHE, WNATIVE_ADDRESS[exports.ChainId.AVALANCHE], 18, "WAVAX", "Wrapped AVAX"), _WNATIVE[exports.ChainId.AVALANCHE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.AVALANCHE_TESTNET, WNATIVE_ADDRESS[exports.ChainId.AVALANCHE_TESTNET], 18, "WAVAX", "Wrapped AVAX"), _WNATIVE[exports.ChainId.HECO] = /*#__PURE__*/new Token(exports.ChainId.HECO, WNATIVE_ADDRESS[exports.ChainId.HECO], 18, "WHT", "Wrapped HT"), _WNATIVE[exports.ChainId.HECO_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.HECO_TESTNET, WNATIVE_ADDRESS[exports.ChainId.HECO_TESTNET], 18, "WHT", "Wrapped HT"), _WNATIVE[exports.ChainId.HARMONY] = /*#__PURE__*/new Token(exports.ChainId.HARMONY, WNATIVE_ADDRESS[exports.ChainId.HARMONY], 18, "WONE", "Wrapped ONE"), _WNATIVE[exports.ChainId.HARMONY_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.HARMONY_TESTNET, WNATIVE_ADDRESS[exports.ChainId.HARMONY_TESTNET], 18, "WONE", "Wrapped ONE"), _WNATIVE[exports.ChainId.OKEX] = /*#__PURE__*/new Token(exports.ChainId.OKEX, WNATIVE_ADDRESS[exports.ChainId.OKEX], 18, "WOKT", "Wrapped OKExChain"), _WNATIVE[exports.ChainId.OKEX_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.OKEX_TESTNET, WNATIVE_ADDRESS[exports.ChainId.OKEX_TESTNET], 18, "WOKT", "Wrapped OKExChain"), _WNATIVE[exports.ChainId.CELO] = /*#__PURE__*/new Token(exports.ChainId.CELO, WNATIVE_ADDRESS[exports.ChainId.CELO], 18, "CELO", "Celo"), _WNATIVE[exports.ChainId.PALM] = /*#__PURE__*/new Token(exports.ChainId.PALM, WNATIVE_ADDRESS[exports.ChainId.PALM], 18, "WPALM", "Wrapped Palm"), _WNATIVE);

var Avalanche = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Avalanche, _NativeCurrency);

  function Avalanche(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "AVAX", "Avalanche") || this;
  }

  Avalanche.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Avalanche(chainId);
  };

  var _proto = Avalanche.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Avalanche, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return Avalanche;
}(NativeCurrency);
Avalanche._cache = {};

var Binance = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Binance, _NativeCurrency);

  function Binance(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "BNB", "Binance Coin") || this;
  }

  Binance.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Binance(chainId);
  };

  var _proto = Binance.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Binance, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return Binance;
}(NativeCurrency);
Binance._cache = {};

var Celo = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Celo, _NativeCurrency);

  function Celo(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "CELO", "Celo") || this;
  }

  Celo.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Celo(chainId);
  };

  var _proto = Celo.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Celo, [{
    key: "wrapped",
    get: function get() {
      var wcelo = WNATIVE[this.chainId];
      !!!wcelo ?  invariant(false, "WRAPPED")  : void 0;
      return wcelo;
    }
  }]);

  return Celo;
}(NativeCurrency);
Celo._cache = {};

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */

var Ether = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Ether, _NativeCurrency);

  function Ether(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "ETH", "Ether") || this;
  }

  Ether.onChain = function onChain(chainId) {
    var _this$_etherCache$cha;

    return (_this$_etherCache$cha = this._etherCache[chainId]) != null ? _this$_etherCache$cha : this._etherCache[chainId] = new Ether(chainId);
  };

  var _proto = Ether.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Ether, [{
    key: "wrapped",
    get: function get() {
      var weth9 = WETH9[this.chainId];
      !!!weth9 ?  invariant(false, "WRAPPED")  : void 0;
      return weth9;
    }
  }]);

  return Ether;
}(NativeCurrency);
Ether._etherCache = {};

var Fantom = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Fantom, _NativeCurrency);

  function Fantom(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "FTM", "Fantom") || this;
  }

  Fantom.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Fantom(chainId);
  };

  var _proto = Fantom.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Fantom, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return Fantom;
}(NativeCurrency);
Fantom._cache = {};

var Harmony = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Harmony, _NativeCurrency);

  function Harmony(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "ONE", "Harmony") || this;
  }

  Harmony.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Harmony(chainId);
  };

  var _proto = Harmony.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Harmony, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return Harmony;
}(NativeCurrency);
Harmony._cache = {};

var Heco = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Heco, _NativeCurrency);

  function Heco(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "HT", "Huobi Token") || this;
  }

  Heco.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Heco(chainId);
  };

  var _proto = Heco.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Heco, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return Heco;
}(NativeCurrency);
Heco._cache = {};

var Matic = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Matic, _NativeCurrency);

  function Matic(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "MATIC", "Matic") || this;
  }

  Matic.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Matic(chainId);
  };

  var _proto = Matic.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Matic, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return Matic;
}(NativeCurrency);
Matic._cache = {};

var Okex = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Okex, _NativeCurrency);

  function Okex(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "OKT", "OKExChain") || this;
  }

  Okex.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Okex(chainId);
  };

  var _proto = Okex.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Okex, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return Okex;
}(NativeCurrency);
Okex._cache = {};

var xDai = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(xDai, _NativeCurrency);

  function xDai(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "XDAI", "xDai") || this;
  }

  xDai.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new xDai(chainId);
  };

  var _proto = xDai.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(xDai, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return xDai;
}(NativeCurrency);
xDai._cache = {};

var Palm = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Palm, _NativeCurrency);

  function Palm(chainId) {
    return _NativeCurrency.call(this, chainId, 18, "PALM", "Palm") || this;
  }

  Palm.onChain = function onChain(chainId) {
    var _this$_cache$chainId;

    return (_this$_cache$chainId = this._cache[chainId]) != null ? _this$_cache$chainId : this._cache[chainId] = new Palm(chainId);
  };

  var _proto = Palm.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Palm, [{
    key: "wrapped",
    get: function get() {
      var wnative = WNATIVE[this.chainId];
      !!!wnative ?  invariant(false, "WRAPPED")  : void 0;
      return wnative;
    }
  }]);

  return Palm;
}(NativeCurrency);
Palm._cache = {};

var _NATIVE;
var NATIVE = (_NATIVE = {}, _NATIVE[exports.ChainId.MAINNET] = /*#__PURE__*/Ether.onChain(exports.ChainId.MAINNET), _NATIVE[exports.ChainId.ROPSTEN] = /*#__PURE__*/Ether.onChain(exports.ChainId.ROPSTEN), _NATIVE[exports.ChainId.RINKEBY] = /*#__PURE__*/Ether.onChain(exports.ChainId.RINKEBY), _NATIVE[exports.ChainId.GÖRLI] = /*#__PURE__*/Ether.onChain(exports.ChainId.GÖRLI), _NATIVE[exports.ChainId.KOVAN] = /*#__PURE__*/Ether.onChain(exports.ChainId.KOVAN), _NATIVE[exports.ChainId.FANTOM] = /*#__PURE__*/Fantom.onChain(exports.ChainId.FANTOM), _NATIVE[exports.ChainId.FANTOM_TESTNET] = /*#__PURE__*/Fantom.onChain(exports.ChainId.FANTOM_TESTNET), _NATIVE[exports.ChainId.MATIC] = /*#__PURE__*/Matic.onChain(exports.ChainId.MATIC), _NATIVE[exports.ChainId.MATIC_TESTNET] = /*#__PURE__*/Matic.onChain(exports.ChainId.MATIC_TESTNET), _NATIVE[exports.ChainId.XDAI] = /*#__PURE__*/xDai.onChain(exports.ChainId.XDAI), _NATIVE[exports.ChainId.BSC] = /*#__PURE__*/Binance.onChain(exports.ChainId.BSC), _NATIVE[exports.ChainId.BSC_TESTNET] = /*#__PURE__*/Binance.onChain(exports.ChainId.BSC_TESTNET), _NATIVE[exports.ChainId.AVALANCHE] = /*#__PURE__*/Avalanche.onChain(exports.ChainId.AVALANCHE), _NATIVE[exports.ChainId.AVALANCHE_TESTNET] = /*#__PURE__*/Avalanche.onChain(exports.ChainId.AVALANCHE_TESTNET), _NATIVE[exports.ChainId.HECO] = /*#__PURE__*/Heco.onChain(exports.ChainId.HECO), _NATIVE[exports.ChainId.HECO_TESTNET] = /*#__PURE__*/Heco.onChain(exports.ChainId.HECO_TESTNET), _NATIVE[exports.ChainId.HARMONY] = /*#__PURE__*/Harmony.onChain(exports.ChainId.HARMONY), _NATIVE[exports.ChainId.HARMONY_TESTNET] = /*#__PURE__*/Harmony.onChain(exports.ChainId.HARMONY_TESTNET), _NATIVE[exports.ChainId.OKEX] = /*#__PURE__*/Okex.onChain(exports.ChainId.OKEX), _NATIVE[exports.ChainId.OKEX_TESTNET] = /*#__PURE__*/Okex.onChain(exports.ChainId.OKEX_TESTNET), _NATIVE[exports.ChainId.CELO] = /*#__PURE__*/Celo.onChain(exports.ChainId.CELO), _NATIVE[exports.ChainId.PALM] = /*#__PURE__*/Palm.onChain(exports.ChainId.PALM), _NATIVE);

var MaxUint256 = /*#__PURE__*/JSBI.BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"); // exports for internal consumption

var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var _997 = /*#__PURE__*/JSBI.BigInt(997);
var _1000 = /*#__PURE__*/JSBI.BigInt(1000);
var _960 = /*#__PURE__*/JSBI.BigInt(960);
var _980 = /*#__PURE__*/JSBI.BigInt(980);

var _SOLIDITY_TYPE_MAXIMA;
var INIT_CODE_HASH = "0x20542064e2c50e24ae49dfaf22d3d9486045828660e9e24ff8f6cfefea38d7b9";
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000);

(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(exports.SolidityType || (exports.SolidityType = {}));

var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[exports.SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt("0xff"), _SOLIDITY_TYPE_MAXIMA[exports.SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), _SOLIDITY_TYPE_MAXIMA);
var LAMBDA_URL = "https://9epjsvomc4.execute-api.us-east-1.amazonaws.com/dev";
var SOCKET_URL = "wss://hfimt374ge.execute-api.us-east-1.amazonaws.com/dev";

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ("setPrototypeOf" in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);

  function InsufficientReservesError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the input amount is too small to produce any amount of output. I.e. the amount of input sent is less
 * than the price of a single unit of output after fees.
 */

var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);

  function InsufficientInputAmountError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }

  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
Big.strict = true;
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = JSBI.BigInt(1);
    }

    this.numerator = JSBI.BigInt(numerator);
    this.denominator = JSBI.BigInt(denominator);
  }

  Fraction.tryParseFraction = function tryParseFraction(fractionish) {
    if (fractionish instanceof JSBI || typeof fractionish === "number" || typeof fractionish === "string") return new Fraction(fractionish);
    if ("numerator" in fractionish && "denominator" in fractionish) return fractionish;
    throw new Error("Could not parse fraction");
  } // performs floor division
  ;

  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = Fraction.tryParseFraction(other);

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = Fraction.tryParseFraction(other);

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ""
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ""
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  }
  /**
   * Helper method for converting any super class back to a fraction
   */
  ;

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }, {
    key: "asFraction",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
Big$1.strict = true;
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  function CurrencyAmount(currency, numerator, denominator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    !JSBI.lessThanOrEqual(_this.quotient, MaxUint256) ?  invariant(false, "AMOUNT")  : void 0;
    _this.currency = currency;
    _this.decimalScale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(currency.decimals));
    return _this;
  }
  /**
   * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */


  CurrencyAmount.fromRawAmount = function fromRawAmount(currency, rawAmount) {
    return new CurrencyAmount(currency, rawAmount);
  }
  /**
   * Construct a currency amount with a denominator that is not equal to 1
   * @param currency the currency
   * @param numerator the numerator of the fractional token amount
   * @param denominator the denominator of the fractional token amount
   */
  ;

  CurrencyAmount.fromFractionalAmount = function fromFractionalAmount(currency, numerator, denominator) {
    return new CurrencyAmount(currency, numerator, denominator);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !this.currency.equals(other.currency) ?  invariant(false, "CURRENCY")  : void 0;

    var added = _Fraction.prototype.add.call(this, other);

    return CurrencyAmount.fromFractionalAmount(this.currency, added.numerator, added.denominator);
  };

  _proto.subtract = function subtract(other) {
    !this.currency.equals(other.currency) ?  invariant(false, "CURRENCY")  : void 0;

    var subtracted = _Fraction.prototype.subtract.call(this, other);

    return CurrencyAmount.fromFractionalAmount(this.currency, subtracted.numerator, subtracted.denominator);
  };

  _proto.multiply = function multiply(other) {
    var multiplied = _Fraction.prototype.multiply.call(this, other);

    return CurrencyAmount.fromFractionalAmount(this.currency, multiplied.numerator, multiplied.denominator);
  };

  _proto.divide = function divide(other) {
    var divided = _Fraction.prototype.divide.call(this, other);

    return CurrencyAmount.fromFractionalAmount(this.currency, divided.numerator, divided.denominator);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.divide.call(this, this.decimalScale).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, "DECIMALS")  : void 0;
    return _Fraction.prototype.divide.call(this, this.decimalScale).toFixed(decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ""
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.quotient.toString()).div(this.decimalScale.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "wrapped",
    get: function get() {
      if (this.currency.isToken) return this;
      return CurrencyAmount.fromFractionalAmount(this.currency.wrapped, this.numerator, this.denominator);
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  /**
   * Construct a price, either with the base and quote currency amount, or the
   * @param args
   */
  function Price() {
    var _this;

    var baseCurrency, quoteCurrency, denominator, numerator;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 4) {
      baseCurrency = args[0];
      quoteCurrency = args[1];
      denominator = args[2];
      numerator = args[3];
    } else {
      var result = args[0].quoteAmount.divide(args[0].baseAmount);
      var _ref = [args[0].baseAmount.currency, args[0].quoteAmount.currency, result.denominator, result.numerator];
      baseCurrency = _ref[0];
      quoteCurrency = _ref[1];
      denominator = _ref[2];
      numerator = _ref[3];
    }

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }
  /**
   * Flip the price, switching the base and quote currency
   */


  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  }
  /**
   * Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency
   * @param other the other price
   */
  ;

  _proto.multiply = function multiply(other) {
    !this.quoteCurrency.equals(other.baseCurrency) ?  invariant(false, "TOKEN")  : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  }
  /**
   * Return the amount of quote currency corresponding to a given amount of the base currency
   * @param currencyAmount the amount of base currency to quote against the price
   */
  ;

  _proto.quote = function quote(currencyAmount) {
    !currencyAmount.currency.equals(this.baseCurrency) ?  invariant(false, "TOKEN")  : void 0;

    var result = _Fraction.prototype.multiply.call(this, currencyAmount);

    return CurrencyAmount.fromFractionalAmount(this.quoteCurrency, result.numerator, result.denominator);
  }
  /**
   * Get the value scaled by decimals for formatting
   * @private
   */
  ;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjustedForDecimals.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjustedForDecimals.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "adjustedForDecimals",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

var computePairAddress = function computePairAddress(_ref) {
  var factoryAddress = _ref.factoryAddress,
      tokenA = _ref.tokenA,
      tokenB = _ref.tokenB;

  var _ref2 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
      token0 = _ref2[0],
      token1 = _ref2[1]; // does safety checks


  return address.getCreate2Address(factoryAddress, solidity.keccak256(["bytes"], [solidity.pack(["address", "address"], [token0.address, token1.address])]), INIT_CODE_HASH);
};
var FeeAmount;

(function (FeeAmount) {
  FeeAmount[FeeAmount["LOW"] = 500] = "LOW";
  FeeAmount[FeeAmount["MEDIUM"] = 3000] = "MEDIUM";
  FeeAmount[FeeAmount["HIGH"] = 10000] = "HIGH";
})(FeeAmount || (FeeAmount = {}));
// export const computeConcentratedLiquidityPoolAddress = ({
//   factoryAddress,
//   tokenA,
//   tokenB,
//   fee,
// }: {
//   factoryAddress: string
//   tokenA: Token
//   tokenB: Token
//   fee: FeeAmount
// }): string => {
//   const [token0, token1] = tokenA.sortsBefore(tokenB)
//     ? [tokenA, tokenB]
//     : [tokenB, tokenA] // does safety checks
//   return getCreate2Address(
//     factoryAddress,
//     keccak256(
//       ['bytes'],
//       [
//         pack(
//           ['address', 'address', 'uint24'],
//           [token0.address, token1.address, fee]
//         ),
//       ]
//     ),
//     CONSTANT_PRODUCT_POOL_CREATION_CODE
//   )
// }

var MAX_SAFE_INTEGER = /*#__PURE__*/JSBI.BigInt(Number.MAX_SAFE_INTEGER);
var ZERO$1 = /*#__PURE__*/JSBI.BigInt(0);
var ONE$1 = /*#__PURE__*/JSBI.BigInt(1);
var TWO$1 = /*#__PURE__*/JSBI.BigInt(2);
/**
 * Computes floor(sqrt(value))
 * @param value the value for which to compute the square root, rounded down
 */

function sqrt(value) {
  !JSBI.greaterThanOrEqual(value, ZERO$1) ?  invariant(false, "NEGATIVE")  : void 0; // rely on built in sqrt if possible

  if (JSBI.lessThan(value, MAX_SAFE_INTEGER)) {
    return JSBI.BigInt(Math.floor(Math.sqrt(JSBI.toNumber(value))));
  }

  var z;
  var x;
  z = value;
  x = JSBI.add(JSBI.divide(value, TWO$1), ONE$1);

  while (JSBI.lessThan(x, z)) {
    z = x;
    x = JSBI.divide(JSBI.add(JSBI.divide(value, x), x), TWO$1);
  }

  return z;
}

var Pair = /*#__PURE__*/function () {
  function Pair(currencyAmountA, tokenAmountB) {
    var tokenAmounts = currencyAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
    ? [currencyAmountA, tokenAmountB] : [tokenAmountB, currencyAmountA];
    this.liquidityToken = new Token(tokenAmounts[0].currency.chainId, Pair.getAddress(tokenAmounts[0].currency, tokenAmounts[1].currency), 18, "UNI-V2", "Uniswap V2");
    this.tokenAmounts = tokenAmounts;
  }

  Pair.getAddress = function getAddress(tokenA, tokenB) {
    return computePairAddress({
      factoryAddress: FACTORY_ADDRESS[tokenA.chainId],
      tokenA: tokenA,
      tokenB: tokenB
    });
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  ;

  var _proto = Pair.prototype;

  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  ;

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ?  invariant(false, "TOKEN")  : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pair.
   */
  ;

  _proto.reserveOf = function reserveOf(token) {
    !this.involvesToken(token) ?  invariant(false, "TOKEN")  : void 0;
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  };

  _proto.getOutputAmount = function getOutputAmount(inputAmount) {
    !this.involvesToken(inputAmount.currency) ?  invariant(false, "TOKEN")  : void 0;

    if (JSBI.equal(this.reserve0.quotient, ZERO) || JSBI.equal(this.reserve1.quotient, ZERO)) {
      throw new InsufficientReservesError();
    }

    var inputReserve = this.reserveOf(inputAmount.currency);
    var outputReserve = this.reserveOf(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.quotient, _997);
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.quotient);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.quotient, _1000), inputAmountWithFee);
    var outputAmount = CurrencyAmount.fromRawAmount(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));

    if (JSBI.equal(outputAmount.quotient, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getInputAmount = function getInputAmount(outputAmount) {
    !this.involvesToken(outputAmount.currency) ?  invariant(false, "TOKEN")  : void 0;

    if (JSBI.equal(this.reserve0.quotient, ZERO) || JSBI.equal(this.reserve1.quotient, ZERO) || JSBI.greaterThanOrEqual(outputAmount.quotient, this.reserveOf(outputAmount.currency).quotient)) {
      throw new InsufficientReservesError();
    }

    var outputReserve = this.reserveOf(outputAmount.currency);
    var inputReserve = this.reserveOf(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.quotient, outputAmount.quotient), _1000);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.quotient, outputAmount.quotient), _997);
    var inputAmount = CurrencyAmount.fromRawAmount(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    !totalSupply.currency.equals(this.liquidityToken) ?  invariant(false, "LIQUIDITY")  : void 0;
    var tokenAmounts = tokenAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    !(tokenAmounts[0].currency.equals(this.token0) && tokenAmounts[1].currency.equals(this.token1)) ?  invariant(false, "TOKEN")  : void 0;
    var liquidity;

    if (JSBI.equal(totalSupply.quotient, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].quotient, tokenAmounts[1].quotient)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].quotient, totalSupply.quotient), this.reserve0.quotient);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].quotient, totalSupply.quotient), this.reserve1.quotient);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }

    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return CurrencyAmount.fromRawAmount(this.liquidityToken, liquidity);
  };

  _proto.getLiquidityValue = function getLiquidityValue(token, totalSupply, liquidity, feeOn, kLast) {
    if (feeOn === void 0) {
      feeOn = false;
    }

    !this.involvesToken(token) ?  invariant(false, "TOKEN")  : void 0;
    !totalSupply.currency.equals(this.liquidityToken) ?  invariant(false, "TOTAL_SUPPLY")  : void 0;
    !liquidity.currency.equals(this.liquidityToken) ?  invariant(false, "LIQUIDITY")  : void 0;
    !JSBI.lessThanOrEqual(liquidity.quotient, totalSupply.quotient) ?  invariant(false, "LIQUIDITY")  : void 0;
    var totalSupplyAdjusted;

    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!kLast ?  invariant(false, "K_LAST")  : void 0;
      var kLastParsed = JSBI.BigInt(kLast);

      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.quotient, this.reserve1.quotient));
        var rootKLast = sqrt(kLastParsed);

        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.quotient, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(CurrencyAmount.fromRawAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }

    return CurrencyAmount.fromRawAmount(token, JSBI.divide(JSBI.multiply(liquidity.quotient, this.reserveOf(token).quotient), totalSupplyAdjusted.quotient));
  };

  _createClass(Pair, [{
    key: "token0Price",
    get: function get() {
      var result = this.tokenAmounts[1].divide(this.tokenAmounts[0]);
      return new Price(this.token0, this.token1, result.denominator, result.numerator);
    }
    /**
     * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
     */

  }, {
    key: "token1Price",
    get: function get() {
      var result = this.tokenAmounts[0].divide(this.tokenAmounts[1]);
      return new Price(this.token1, this.token0, result.denominator, result.numerator);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].currency;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].currency;
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }]);

  return Pair;
}();

var ONE_HUNDRED = /*#__PURE__*/new Fraction( /*#__PURE__*/JSBI.BigInt(100));
/**
 * Converts a fraction to a percent
 * @param fraction the fraction to convert
 */

function toPercent(fraction) {
  return new Percent(fraction.numerator, fraction.denominator);
}

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    var _this;

    _this = _Fraction.apply(this, arguments) || this;
    /**
     * This boolean prevents a fraction from being interpreted as a Percent
     */

    _this.isPercent = true;
    return _this;
  }

  var _proto = Percent.prototype;

  _proto.add = function add(other) {
    return toPercent(_Fraction.prototype.add.call(this, other));
  };

  _proto.subtract = function subtract(other) {
    return toPercent(_Fraction.prototype.subtract.call(this, other));
  };

  _proto.multiply = function multiply(other) {
    return toPercent(_Fraction.prototype.multiply.call(this, other));
  };

  _proto.divide = function divide(other) {
    return toPercent(_Fraction.prototype.divide.call(this, other));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return _Fraction.prototype.multiply.call(this, ONE_HUNDRED).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return _Fraction.prototype.multiply.call(this, ONE_HUNDRED).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

var Route = /*#__PURE__*/function () {
  function Route(pairs, input, output) {
    this._midPrice = null;
    !(pairs.length > 0) ?  invariant(false, "PAIRS")  : void 0;
    var chainId = pairs[0].chainId;
    !pairs.every(function (pair) {
      return pair.chainId === chainId;
    }) ?  invariant(false, "CHAIN_IDS")  : void 0;
    var wrappedInput = input.wrapped;
    !pairs[0].involvesToken(wrappedInput) ?  invariant(false, "INPUT")  : void 0;
    !(typeof output === "undefined" || pairs[pairs.length - 1].involvesToken(output.wrapped)) ?  invariant(false, "OUTPUT")  : void 0;
    var path = [wrappedInput];

    for (var _iterator = _createForOfIteratorHelperLoose(pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      var currentInput = path[i];
      !(currentInput.equals(pair.token0) || currentInput.equals(pair.token1)) ?  invariant(false, "PATH")  : void 0;

      var _output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;

      path.push(_output);
    }

    this.pairs = pairs;
    this.path = path;
    this.input = input;
    this.output = output;
  }

  _createClass(Route, [{
    key: "midPrice",
    get: function get() {
      if (this._midPrice !== null) return this._midPrice;
      var prices = [];

      for (var _iterator2 = _createForOfIteratorHelperLoose(this.pairs.entries()), _step2; !(_step2 = _iterator2()).done;) {
        var _step2$value = _step2.value,
            i = _step2$value[0],
            pair = _step2$value[1];
        prices.push(this.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.quotient, pair.reserve1.quotient) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.quotient, pair.reserve0.quotient));
      }

      var reduced = prices.slice(1).reduce(function (accumulator, currentValue) {
        return accumulator.multiply(currentValue);
      }, prices[0]);
      return this._midPrice = new Price(this.input, this.output, reduced.denominator, reduced.numerator);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.pairs[0].chainId;
    }
  }]);

  return Route;
}();

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var quotedOutputAmount = midPrice.quote(inputAmount); // calculate price impact := (exactQuote - outputAmount) / exactQuote

  var priceImpact = quotedOutputAmount.subtract(outputAmount).divide(quotedOutputAmount);
  return new Percent(priceImpact.numerator, priceImpact.denominator);
}

// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, "MAX_SIZE_ZERO")  : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ?  invariant(false, "ITEMS_SIZE")  : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first

function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !a.inputAmount.currency.equals(b.inputAmount.currency) ?  invariant(false, "INPUT_CURRENCY")  : void 0;
  !a.outputAmount.currency.equals(b.outputAmount.currency) ?  invariant(false, "OUTPUT_CURRENCY")  : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
} // extension of the input output comparator that also considers other dimensions of the trade in ranking them

function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);

  if (ioComp !== 0) {
    return ioComp;
  } // consider lowest slippage next, since these are less likely to fail


  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  } // finally consider the number of hops since each hop costs gas


  return a.route.path.length - b.route.path.length;
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */

var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType) {
    this.route = route;
    this.tradeType = tradeType;
    var tokenAmounts = new Array(route.path.length);

    if (tradeType === exports.TradeType.EXACT_INPUT) {
      !amount.currency.equals(route.input) ?  invariant(false, "INPUT")  : void 0;
      tokenAmounts[0] = amount.wrapped;

      for (var i = 0; i < route.path.length - 1; i++) {
        var pair = route.pairs[i];

        var _pair$getOutputAmount = pair.getOutputAmount(tokenAmounts[i]),
            outputAmount = _pair$getOutputAmount[0];

        tokenAmounts[i + 1] = outputAmount;
      }

      this.inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
      this.outputAmount = CurrencyAmount.fromFractionalAmount(route.output, tokenAmounts[tokenAmounts.length - 1].numerator, tokenAmounts[tokenAmounts.length - 1].denominator);
    } else {
      !amount.currency.equals(route.output) ?  invariant(false, "OUTPUT")  : void 0;
      tokenAmounts[tokenAmounts.length - 1] = amount.wrapped;

      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pair = route.pairs[_i - 1];

        var _pair$getInputAmount = _pair.getInputAmount(tokenAmounts[_i]),
            inputAmount = _pair$getInputAmount[0];

        tokenAmounts[_i - 1] = inputAmount;
      }

      this.inputAmount = CurrencyAmount.fromFractionalAmount(route.input, tokenAmounts[0].numerator, tokenAmounts[0].denominator);
      this.outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
    }

    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Trade.exactIn = function exactIn(route, amountIn) {
    return new Trade(route, amountIn, exports.TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */
  ;

  Trade.exactOut = function exactOut(route, amountOut) {
    return new Trade(route, amountOut, exports.TradeType.EXACT_OUTPUT);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, "SLIPPAGE_TOLERANCE")  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.quotient).quotient;
      return CurrencyAmount.fromRawAmount(this.outputAmount.currency, slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, "SLIPPAGE_TOLERANCE")  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.quotient).quotient;
      return CurrencyAmount.fromRawAmount(this.inputAmount.currency, slippageAdjustedAmountIn);
    }
  }
  /**
   * Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactIn = function bestTradeExactIn(pairs, currencyAmountIn, currencyOut, _temp, // used in recursion.
  currentPairs, nextAmountIn, bestTrades) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$maxNumResults = _ref.maxNumResults,
        maxNumResults = _ref$maxNumResults === void 0 ? 3 : _ref$maxNumResults,
        _ref$maxHops = _ref.maxHops,
        maxHops = _ref$maxHops === void 0 ? 3 : _ref$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (nextAmountIn === void 0) {
      nextAmountIn = currencyAmountIn;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, "PAIRS")  : void 0;
    !(maxHops > 0) ?  invariant(false, "MAX_HOPS")  : void 0;
    !(currencyAmountIn === nextAmountIn || currentPairs.length > 0) ?  invariant(false, "INVALID_RECURSION")  : void 0;
    var amountIn = nextAmountIn.wrapped;
    var tokenOut = currencyOut.wrapped;

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountIn.currency) && !pair.token1.equals(amountIn.currency)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountOut = void 0;

      try {
        var _pair$getOutputAmount2 = pair.getOutputAmount(amountIn);

        amountOut = _pair$getOutputAmount2[0];
      } catch (error) {
        // input too low
        if (error.isInsufficientInputAmountError) {
          continue;
        }

        throw error;
      } // we have arrived at the output token, so this is the final trade of one of the paths


      if (amountOut.currency.equals(tokenOut)) {
        sortedInsert(bestTrades, new Trade(new Route([].concat(currentPairs, [pair]), currencyAmountIn.currency, currencyOut), currencyAmountIn, exports.TradeType.EXACT_INPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

        Trade.bestTradeExactIn(pairsExcludingThisPair, currencyAmountIn, currencyOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [].concat(currentPairs, [pair]), amountOut, bestTrades);
      }
    }

    return bestTrades;
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   */
  ;

  _proto.worstExecutionPrice = function worstExecutionPrice(slippageTolerance) {
    return new Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param currencyAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactOut = function bestTradeExactOut(pairs, currencyIn, currencyAmountOut, _temp2, // used in recursion.
  currentPairs, nextAmountOut, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$maxNumResults = _ref2.maxNumResults,
        maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
        _ref2$maxHops = _ref2.maxHops,
        maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (nextAmountOut === void 0) {
      nextAmountOut = currencyAmountOut;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, "PAIRS")  : void 0;
    !(maxHops > 0) ?  invariant(false, "MAX_HOPS")  : void 0;
    !(currencyAmountOut === nextAmountOut || currentPairs.length > 0) ?  invariant(false, "INVALID_RECURSION")  : void 0;
    var amountOut = nextAmountOut.wrapped;
    var tokenIn = currencyIn.wrapped;

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountOut.currency) && !pair.token1.equals(amountOut.currency)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountIn = void 0;

      try {
        var _pair$getInputAmount2 = pair.getInputAmount(amountOut);

        amountIn = _pair$getInputAmount2[0];
      } catch (error) {
        // not enough liquidity in this pair
        if (error.isInsufficientReservesError) {
          continue;
        }

        throw error;
      } // we have arrived at the input token, so this is the first trade of one of the paths


      if (amountIn.currency.equals(tokenIn)) {
        sortedInsert(bestTrades, new Trade(new Route([pair].concat(currentPairs), currencyIn, currencyAmountOut.currency), currencyAmountOut, exports.TradeType.EXACT_OUTPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

        Trade.bestTradeExactOut(pairsExcludingThisPair, currencyIn, currencyAmountOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [pair].concat(currentPairs), amountIn, bestTrades);
      }
    }

    return bestTrades;
  };

  return Trade;
}();

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

(function (PoolType) {
  PoolType["ConstantProduct"] = "ConstantProduct";
  PoolType["Weighted"] = "Weighted";
  PoolType["Hybrid"] = "Hybrid";
  PoolType["ConcentratedLiquidity"] = "ConcentratedLiquidity";
})(exports.PoolType || (exports.PoolType = {}));

var Pool = function Pool(_info) {
  var info = _extends({
    minLiquidity: 1000,
    swapGasCost: 40000
  }, _info);

  this.address = info.address;
  this.token0 = info.token0;
  this.token1 = info.token1;
  this.type = info.type;
  this.reserve0 = info.reserve0;
  this.reserve1 = info.reserve1;
  this.fee = info.fee;
  this.minLiquidity = info.minLiquidity;
  this.swapGasCost = info.swapGasCost;
};
var ConstantProductPool = /*#__PURE__*/function (_Pool) {
  _inheritsLoose(ConstantProductPool, _Pool);

  function ConstantProductPool(info) {
    return _Pool.call(this, _extends({
      type: exports.PoolType.ConstantProduct
    }, info)) || this;
  }

  return ConstantProductPool;
}(Pool);
var HybridPool = /*#__PURE__*/function (_Pool2) {
  _inheritsLoose(HybridPool, _Pool2);

  function HybridPool(info) {
    var _this;

    _this = _Pool2.call(this, _extends({
      type: exports.PoolType.Hybrid
    }, info)) || this;
    _this.A = info.A;
    return _this;
  }

  return HybridPool;
}(Pool);
var WeightedPool = /*#__PURE__*/function (_Pool3) {
  _inheritsLoose(WeightedPool, _Pool3);

  function WeightedPool(info) {
    var _this2;

    _this2 = _Pool3.call(this, _extends({
      type: exports.PoolType.Weighted
    }, info)) || this;
    _this2.weight0 = info.weight0;
    _this2.weight1 = info.weight1;
    return _this2;
  }

  return WeightedPool;
}(Pool);

var types = {
  EIP712Domain: [{
    name: "name",
    type: "string"
  }, {
    name: "chainId",
    type: "uint256"
  }, {
    name: "verifyingContract",
    type: "address"
  }],
  LimitOrder: [{
    name: "maker",
    type: "address"
  }, {
    name: "tokenIn",
    type: "address"
  }, {
    name: "tokenOut",
    type: "address"
  }, {
    name: "amountIn",
    type: "uint256"
  }, {
    name: "amountOut",
    type: "uint256"
  }, {
    name: "recipient",
    type: "address"
  }, {
    name: "startTime",
    type: "uint256"
  }, {
    name: "endTime",
    type: "uint256"
  }, {
    name: "stopPrice",
    type: "uint256"
  }, {
    name: "oracleAddress",
    type: "address"
  }, {
    name: "oracleData",
    type: "bytes32"
  }]
};
var bentoTypes = {
  EIP712Domain: [{
    name: "name",
    type: "string"
  }, {
    name: "chainId",
    type: "uint256"
  }, {
    name: "verifyingContract",
    type: "address"
  }],
  SetMasterContractApproval: [{
    name: "warning",
    type: "string"
  }, {
    name: "user",
    type: "address"
  }, {
    name: "masterContract",
    type: "address"
  }, {
    name: "approved",
    type: "bool"
  }, {
    name: "nonce",
    type: "uint256"
  }]
};
var name = "LimitOrder";

var getSignature = function getSignature(message, chainId, privateKey) {
  var domain = {
    name: name,
    chainId: chainId,
    verifyingContract: STOP_LIMIT_ORDER_ADDRESS[chainId]
  };
  return sign({
    types: types,
    primaryType: "LimitOrder",
    domain: domain,
    message: message
  }, privateKey);
};
var getTypedData = function getTypedData(message, chainId) {
  var domain = {
    name: name,
    chainId: chainId,
    verifyingContract: STOP_LIMIT_ORDER_ADDRESS[chainId]
  };
  return {
    types: types,
    primaryType: "LimitOrder",
    domain: domain,
    message: message
  };
};
var getTypedDataBento = function getTypedDataBento(message, chainId) {
  var domain = {
    name: "BentoBox V1",
    chainId: chainId,
    verifyingContract: BENTOBOX_ADDRESS[chainId]
  };
  return {
    types: bentoTypes,
    primaryType: "SetMasterContractApproval",
    domain: domain,
    message: message
  };
};
var getTypeHash = function getTypeHash(typedData) {
  var message = eip712.getMessage(typedData, true).toString("hex");
  return "0x" + message;
};

var sign = function sign(typedData, privateKey) {
  var message = eip712.getMessage(typedData, true);
  var signingKey$1 = new signingKey.SigningKey(privateKey);

  var _signingKey$signDiges = signingKey$1.signDigest(message),
      v = _signingKey$signDiges.v,
      r = _signingKey$signDiges.r,
      s = _signingKey$signDiges.s;

  return {
    v: v,
    r: r,
    s: s
  };
};

var getSignatureWithProvider = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(message, chainId, provider) {
    var typedData, signature, _splitSignature, v, r, s;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            typedData = getTypedData(message, chainId);
            _context.next = 3;
            return provider.send("eth_signTypedData_v4", [message.maker, JSON.stringify(typedData)]);

          case 3:
            signature = _context.sent;
            _splitSignature = bytes.splitSignature(signature), v = _splitSignature.v, r = _splitSignature.r, s = _splitSignature.s;
            return _context.abrupt("return", {
              v: v,
              r: r,
              s: s
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSignatureWithProvider(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getSignatureWithProviderBentobox = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(message, chainId, provider) {
    var typedData, signature, _splitSignature2, v, r, s;

    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            typedData = getTypedDataBento(message, chainId);
            _context2.next = 3;
            return provider.send("eth_signTypedData_v4", [message.user, JSON.stringify(typedData)]);

          case 3:
            signature = _context2.sent;
            _splitSignature2 = bytes.splitSignature(signature), v = _splitSignature2.v, r = _splitSignature2.r, s = _splitSignature2.s;
            return _context2.abrupt("return", {
              v: v,
              r: r,
              s: s
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getSignatureWithProviderBentobox(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getSignatureBento = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(bentoApproval, chainId, privateKey) {
    var domain;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            domain = {
              name: "BentoBox V1",
              chainId: chainId,
              verifyingContract: BENTOBOX_ADDRESS[chainId]
            };
            return _context3.abrupt("return", sign({
              types: bentoTypes,
              primaryType: "SetMasterContractApproval",
              domain: domain,
              message: bentoApproval
            }, privateKey));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getSignatureBento(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
}

function toHex(currencyAmount) {
  return "0x" + currencyAmount.quotient.toString(16);
}
var ZERO_HEX = "0x0";
/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */

var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */


  Router.swapCallParameters = function swapCallParameters(trade, options) {
    var etherIn = trade.inputAmount.currency.isNative;
    var etherOut = trade.outputAmount.currency.isNative; // the router does not support both ether in and out

    !!(etherIn && etherOut) ?  invariant(false, "ETHER_IN_OUT")  : void 0;
    !(!("ttl" in options) || options.ttl > 0) ?  invariant(false, "TTL")  : void 0;
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = "ttl" in options ? "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16) : "0x" + options.deadline.toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;

    switch (trade.tradeType) {
      case exports.TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? "swapExactETHForTokensSupportingFeeOnTransferTokens" : "swapExactETHForTokens"; // (uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? "swapExactTokensForETHSupportingFeeOnTransferTokens" : "swapExactTokensForETH"; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? "swapExactTokensForTokensSupportingFeeOnTransferTokens" : "swapExactTokensForTokens"; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }

        break;

      case exports.TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ?  invariant(false, "EXACT_OUT_FOT")  : void 0;

        if (etherIn) {
          methodName = "swapETHForExactTokens"; // (uint amountOut, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = "swapTokensForExactETH"; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = "swapTokensForExactTokens"; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }

        break;
    }

    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };

  return Router;
}();

var A_PRECISION = 100;
var DCacheBN = /*#__PURE__*/new Map();
function HybridComputeLiquidity(pool) {
  var res = DCacheBN.get(pool);
  if (res != undefined) return res;
  var r0 = pool.reserve0;
  var r1 = pool.reserve1;

  if (r0.isZero() && r1.isZero()) {
    DCacheBN.set(pool, bignumber.BigNumber.from(0));
    return bignumber.BigNumber.from(0);
  }

  var s = r0.add(r1);
  var nA = bignumber.BigNumber.from(pool.A * 2);
  var prevD;
  var D = s;

  for (var i = 0; i < 256; i++) {
    var dP = D.mul(D).div(r0).mul(D).div(r1).div(4);
    prevD = D;
    D = nA.mul(s).div(A_PRECISION).add(dP.mul(2)).mul(D).div(nA.div(A_PRECISION).sub(1).mul(D).add(dP.mul(3)));

    if (D.sub(prevD).abs().lte(1)) {
      break;
    }
  }

  DCacheBN.set(pool, D);
  return D;
}
function HybridgetY(pool, x) {
  var D = HybridComputeLiquidity(pool);
  var nA = pool.A * 2;
  var c = D.mul(D).div(x.mul(2)).mul(D).div(nA * 2 / A_PRECISION);
  var b = D.mul(A_PRECISION).div(nA).add(x);
  var yPrev;
  var y = D;

  for (var i = 0; i < 256; i++) {
    yPrev = y;
    y = y.mul(y).add(c).div(y.mul(2).add(b).sub(D));

    if (y.sub(yPrev).abs().lte(1)) {
      break;
    }
  }

  return y;
}
function calcOutByIn(pool, amountIn, direction) {
  if (direction === void 0) {
    direction = true;
  }

  var xBN = direction ? pool.reserve0 : pool.reserve1;
  var yBN = direction ? pool.reserve1 : pool.reserve0;

  switch (pool.type) {
    case exports.PoolType.ConstantProduct:
      {
        var x = parseInt(xBN.toString());
        var y = parseInt(yBN.toString());
        return y * amountIn / (x / (1 - pool.fee) + amountIn);
      }

    case exports.PoolType.Weighted:
      {
        var _x = parseInt(xBN.toString());

        var _y = parseInt(yBN.toString());

        var wPool = pool;
        var weightRatio = direction ? wPool.weight0 / wPool.weight1 : wPool.weight1 / wPool.weight0;
        var actualIn = amountIn * (1 - pool.fee);
        return _y * (1 - Math.pow(_x / (_x + actualIn), weightRatio));
      }

    case exports.PoolType.Hybrid:
      {
        // const xNew = x + amountIn*(1-pool.fee);
        // const yNew = HybridgetY(pool, xNew);
        // const dy = y - yNew;
        var xNewBN = xBN.add(getBigNumber(undefined, amountIn * (1 - pool.fee)));
        var yNewBN = HybridgetY(pool, xNewBN);
        var dy = parseInt(yBN.sub(yNewBN).toString());
        return dy;
      }
  }

  console.error("Unknown pool type");
  return 0;
}
function calcInByOut(pool, amountOut, direction) {
  var input = 0;
  var xBN = direction ? pool.reserve0 : pool.reserve1;
  var yBN = direction ? pool.reserve1 : pool.reserve0;

  switch (pool.type) {
    case exports.PoolType.ConstantProduct:
      {
        var x = parseInt(xBN.toString());
        var y = parseInt(yBN.toString());
        input = x * amountOut / (1 - pool.fee) / (y - amountOut);
        break;
      }

    case exports.PoolType.Weighted:
      {
        var _x2 = parseInt(xBN.toString());

        var _y2 = parseInt(yBN.toString());

        var wPool = pool;
        var weightRatio = direction ? wPool.weight0 / wPool.weight1 : wPool.weight1 / wPool.weight0;
        input = _x2 * (1 - pool.fee) * (Math.pow(1 - amountOut / _y2, -weightRatio) - 1);
        break;
      }

    case exports.PoolType.Hybrid:
      {
        var yNewBN = yBN.sub(getBigNumber(undefined, amountOut));
        var xNewBN = HybridgetY(pool, yNewBN);
        input = Math.round(parseInt(xNewBN.sub(xBN).toString()) / (1 - pool.fee)); // const yNew = y - amountOut;
        // const xNew = HybridgetY(pool, yNew);
        // input = (xNew - x)/(1-pool.fee);

        break;
      }

    default:
      console.error("Unknown pool type");
  }

  ASSERT(function () {
    var amount2 = calcOutByIn(pool, input, direction);
    var res = closeValues(amountOut, amount2, 1e-6);
    if (!res) console.log("Error 138:", amountOut, amount2);
    return res;
  });
  return input;
}
function calcPrice(pool, amountIn) {
  var r0 = parseInt(pool.reserve0.toString());
  var r1 = parseInt(pool.reserve1.toString());

  switch (pool.type) {
    case exports.PoolType.ConstantProduct:
      {
        var x = r0 / (1 - pool.fee);
        return r1 * x / (x + amountIn) / (x + amountIn);
      }

    case exports.PoolType.Weighted:
      {
        var wPool = pool;
        var weightRatio = wPool.weight0 / wPool.weight1;

        var _x3 = r0 + amountIn * (1 - pool.fee);

        return r1 * weightRatio * (1 - pool.fee) * Math.pow(r0 / _x3, weightRatio) / _x3;
      }

    case exports.PoolType.Hybrid:
      {
        var hPool = pool;
        var D = parseInt(HybridComputeLiquidity(hPool).toString());
        var A = hPool.A / A_PRECISION;

        var _x4 = r0 + amountIn;

        var b = 4 * A * _x4 + D - 4 * A * D;
        var ac4 = D * D * D / _x4;
        var Ds = Math.sqrt(b * b + 4 * A * ac4);
        var res = (0.5 - (2 * b - ac4 / _x4) / Ds / 4) * (1 - pool.fee);
        return res;
      }
  }

  return 0;
}

function calcInputByPriceConstantMean(pool, price) {
  var r0 = parseInt(pool.reserve0.toString());
  var r1 = parseInt(pool.reserve1.toString());
  var weightRatio = pool.weight0 / pool.weight1;
  var t = r1 * price * weightRatio * (1 - pool.fee) * Math.pow(r0, weightRatio);
  return (Math.pow(t, 1 / (weightRatio + 1)) - r0) / (1 - pool.fee);
}

function calcInputByPrice(pool, priceEffective, hint) {
  if (hint === void 0) {
    hint = 1;
  }

  switch (pool.type) {
    case exports.PoolType.ConstantProduct:
      {
        var r0 = parseInt(pool.reserve0.toString());
        var r1 = parseInt(pool.reserve1.toString());
        var x = r0 / (1 - pool.fee);
        var res = Math.sqrt(r1 * x * priceEffective) - x;
        return res;
      }

    case exports.PoolType.Weighted:
      {
        var _res = calcInputByPriceConstantMean(pool, priceEffective);

        return _res;
      }

    case exports.PoolType.Hybrid:
      {
        return revertPositive(function (x) {
          return 1 / calcPrice(pool, x);
        }, priceEffective, hint);
      }
  }

  return 0;
} //====================== Utils ========================

function ASSERT(f, t) {
  if (!f() && t) console.error(t);
}
function closeValues(a, b, accuracy) {
  if (accuracy == 0) return a == b;
  if (a < 1 / accuracy) return Math.abs(a - b) <= 10;
  return Math.abs(a / b - 1) < accuracy;
}
function calcSquareEquation(a, b, c) {
  var D = b * b - 4 * a * c;
  console.assert(D >= 0, "Discriminant is negative! " + a + " " + b + " " + c);
  var sqrtD = Math.sqrt(D);
  return [(-b - sqrtD) / 2 / a, (-b + sqrtD) / 2 / a];
} // returns such x > 0 that f(x) = out or 0 if there is no such x or f defined not everywhere
// hint - approximation of x to spead up the algorithm
// f assumed to be continues monotone growth function defined everywhere

function revertPositive(f, out, hint) {
  if (hint === void 0) {
    hint = 1;
  }

  try {
    if (out <= f(0)) return 0;
    var min, max;

    if (f(hint) > out) {
      min = hint / 2;

      while (f(min) > out) {
        min /= 2;
      }

      max = min * 2;
    } else {
      max = hint * 2;

      while (f(max) < out) {
        max *= 2;
      }

      min = max / 2;
    }

    while (max / min - 1 > 1e-4) {
      var x0 = (min + max) / 2;
      var y0 = f(x0);
      if (out == y0) return x0;
      if (out < y0) max = x0;else min = x0;
    }

    return (min + max) / 2;
  } catch (e) {
    return 0;
  }
}
function getBigNumber(valueBN, value) {
  if (valueBN !== undefined) return valueBN;
  if (value < Number.MAX_SAFE_INTEGER) return bignumber.BigNumber.from(Math.round(value));
  var exp = Math.floor(Math.log(value) / Math.LN2);
  console.assert(exp >= 51, "Internal Error 314");
  var shift = exp - 51;
  var mant = Math.round(value / Math.pow(2, shift));
  var res = bignumber.BigNumber.from(mant).mul(bignumber.BigNumber.from(2).pow(shift));
  return res;
}

var abi = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_externalOrderFee",
				type: "uint256"
			},
			{
				internalType: "contract IBentoBoxV1",
				name: "_bentoBox",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract IERC20",
				name: "token",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "feeTo",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "LogFeesCollected",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "maker",
				type: "address"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "digest",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "contract ILimitOrderReceiver",
				name: "receiver",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "fillAmount",
				type: "uint256"
			}
		],
		name: "LogFillOrder",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "digest",
				type: "bytes32"
			}
		],
		name: "LogOrderCancelled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "feeTo",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "externalOrderFee",
				type: "uint256"
			}
		],
		name: "LogSetFees",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "contract ILimitOrderReceiver",
				name: "receiver",
				type: "address"
			}
		],
		name: "LogWhiteListReceiver",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		inputs: [
		],
		name: "FEE_DIVISOR",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "calls",
				type: "bytes[]"
			},
			{
				internalType: "bool",
				name: "revertOnFail",
				type: "bool"
			}
		],
		name: "batch",
		outputs: [
			{
				internalType: "bool[]",
				name: "successes",
				type: "bool[]"
			},
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "maker",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOut",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "startTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "endTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "stopPrice",
						type: "uint256"
					},
					{
						internalType: "contract IOracle",
						name: "oracleAddress",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "oracleData",
						type: "bytes"
					},
					{
						internalType: "uint256",
						name: "amountToFill",
						type: "uint256"
					},
					{
						internalType: "uint8",
						name: "v",
						type: "uint8"
					},
					{
						internalType: "bytes32",
						name: "r",
						type: "bytes32"
					},
					{
						internalType: "bytes32",
						name: "s",
						type: "bytes32"
					}
				],
				internalType: "struct StopLimitOrder.OrderArgs[]",
				name: "order",
				type: "tuple[]"
			},
			{
				internalType: "contract IERC20",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "contract IERC20",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "contract ILimitOrderReceiver",
				name: "receiver",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "batchFillOrder",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "maker",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOut",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "startTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "endTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "stopPrice",
						type: "uint256"
					},
					{
						internalType: "contract IOracle",
						name: "oracleAddress",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "oracleData",
						type: "bytes"
					},
					{
						internalType: "uint256",
						name: "amountToFill",
						type: "uint256"
					},
					{
						internalType: "uint8",
						name: "v",
						type: "uint8"
					},
					{
						internalType: "bytes32",
						name: "r",
						type: "bytes32"
					},
					{
						internalType: "bytes32",
						name: "s",
						type: "bytes32"
					}
				],
				internalType: "struct StopLimitOrder.OrderArgs[]",
				name: "order",
				type: "tuple[]"
			},
			{
				internalType: "contract IERC20",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "contract IERC20",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "contract ILimitOrderReceiver",
				name: "receiver",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "batchFillOrderOpen",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "hash",
				type: "bytes32"
			}
		],
		name: "cancelOrder",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		name: "cancelledOrder",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "claimOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "deploymentChainId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "externalOrderFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "feeTo",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address"
			}
		],
		name: "feesCollected",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "maker",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOut",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "startTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "endTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "stopPrice",
						type: "uint256"
					},
					{
						internalType: "contract IOracle",
						name: "oracleAddress",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "oracleData",
						type: "bytes"
					},
					{
						internalType: "uint256",
						name: "amountToFill",
						type: "uint256"
					},
					{
						internalType: "uint8",
						name: "v",
						type: "uint8"
					},
					{
						internalType: "bytes32",
						name: "r",
						type: "bytes32"
					},
					{
						internalType: "bytes32",
						name: "s",
						type: "bytes32"
					}
				],
				internalType: "struct StopLimitOrder.OrderArgs",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "contract IERC20",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "contract IERC20",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "contract ILimitOrderReceiver",
				name: "receiver",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "fillOrder",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "maker",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOut",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "startTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "endTime",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "stopPrice",
						type: "uint256"
					},
					{
						internalType: "contract IOracle",
						name: "oracleAddress",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "oracleData",
						type: "bytes"
					},
					{
						internalType: "uint256",
						name: "amountToFill",
						type: "uint256"
					},
					{
						internalType: "uint8",
						name: "v",
						type: "uint8"
					},
					{
						internalType: "bytes32",
						name: "r",
						type: "bytes32"
					},
					{
						internalType: "bytes32",
						name: "s",
						type: "bytes32"
					}
				],
				internalType: "struct StopLimitOrder.OrderArgs",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "contract IERC20",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "contract IERC20",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "contract ILimitOrderReceiver",
				name: "receiver",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "fillOrderOpen",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		name: "orderStatus",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "pendingOwner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "token",
				type: "address"
			},
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permitToken",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_feeTo",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_externalOrderFee",
				type: "uint256"
			}
		],
		name: "setFees",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "token",
				type: "address"
			}
		],
		name: "swipe",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "token",
				type: "address"
			}
		],
		name: "swipeFees",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			},
			{
				internalType: "bool",
				name: "direct",
				type: "bool"
			},
			{
				internalType: "bool",
				name: "renounce",
				type: "bool"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "contract ILimitOrderReceiver",
				name: "receiver",
				type: "address"
			}
		],
		name: "whiteListReceiver",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var LimitOrder = /*#__PURE__*/function () {
  function LimitOrder(maker, amountIn, amountOut, recipient, startTime, endTime, stopPrice, oracleAddress, oracleData, v, r, s) {
    if (stopPrice === void 0) {
      stopPrice = "0";
    }

    if (oracleAddress === void 0) {
      oracleAddress = "0x0000000000000000000000000000000000000000";
    }

    if (oracleData === void 0) {
      oracleData = "0x00000000000000000000000000000000000000000000000000000000000000";
    }

    if (v === void 0) {
      v = 0;
    }

    if (r === void 0) {
      r = "";
    }

    if (s === void 0) {
      s = "";
    }

    this.maker = validateAndParseAddress(maker);
    this.amountIn = amountIn;
    this.amountOut = amountOut;
    this.recipient = validateAndParseAddress(recipient);
    this.startTime = startTime.toString();
    this.endTime = endTime.toString();
    this.stopPrice = stopPrice;
    this.oracleAddress = validateAndParseAddress(oracleAddress);
    this.oracleData = oracleData;
    this.v = v;
    this.r = r;
    this.s = s;
  }

  LimitOrder.getLimitOrder = function getLimitOrder(data) {
    return new LimitOrder(data.maker, CurrencyAmount.fromRawAmount(new Token(data.chainId, data.tokenIn, data.tokenInDecimals, data.tokenInSymbol), data.amountIn), CurrencyAmount.fromRawAmount(new Token(data.chainId, data.tokenOut, data.tokenOutDecimals, data.tokenOutSymbol), data.amountOut), data.recipient, data.startTime, data.endTime, data.stopPrice, data.oracleAddress, data.oracleData, data.v, data.r, data.s);
  };

  var _proto = LimitOrder.prototype;

  _proto.usePrice = function usePrice(price) {
    return new LimitOrder(this.maker, this.amountIn, CurrencyAmount.fromRawAmount(this.amountOut.currency, price.quote(this.amountIn).quotient.toString()), this.recipient, this.startTime, this.endTime, this.stopPrice, this.oracleAddress, this.oracleData);
  };

  _proto.signdOrderWithPrivatekey = function signdOrderWithPrivatekey(chainId, privateKey) {
    var order = {
      maker: this.maker,
      tokenIn: this.tokenInAddress,
      tokenOut: this.tokenOutAddress,
      amountIn: this.amountInRaw,
      amountOut: this.amountOutRaw,
      recipient: this.recipient,
      startTime: this.startTime,
      endTime: this.endTime,
      stopPrice: this.stopPrice,
      oracleAddress: this.oracleAddress,
      oracleData: solidity.keccak256(["bytes"], [this.oracleData])
    };

    var _getSignature = getSignature(order, chainId, privateKey),
        v = _getSignature.v,
        r = _getSignature.r,
        s = _getSignature.s;

    this.v = v;
    this.r = r;
    this.s = s;
    return {
      v: v,
      r: r,
      s: s
    };
  };

  _proto.signOrderWithProvider = /*#__PURE__*/function () {
    var _signOrderWithProvider = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(chainId, provider) {
      var order, _yield$getSignatureWi, v, r, s;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              order = {
                maker: this.maker,
                tokenIn: this.tokenInAddress,
                tokenOut: this.tokenOutAddress,
                amountIn: this.amountInRaw,
                amountOut: this.amountOutRaw,
                recipient: this.recipient,
                startTime: this.startTime,
                endTime: this.endTime,
                stopPrice: this.stopPrice,
                oracleAddress: this.oracleAddress,
                oracleData: solidity.keccak256(["bytes"], [this.oracleData])
              };
              _context.next = 3;
              return getSignatureWithProvider(order, chainId, provider);

            case 3:
              _yield$getSignatureWi = _context.sent;
              v = _yield$getSignatureWi.v;
              r = _yield$getSignatureWi.r;
              s = _yield$getSignatureWi.s;
              this.v = v;
              this.r = r;
              this.s = s;
              return _context.abrupt("return", {
                v: v,
                r: r,
                s: s
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function signOrderWithProvider(_x, _x2) {
      return _signOrderWithProvider.apply(this, arguments);
    }

    return signOrderWithProvider;
  }();

  _proto.getTypedData = function getTypedData$1() {
    var order = {
      maker: this.maker,
      tokenIn: this.tokenInAddress,
      tokenOut: this.tokenOutAddress,
      amountIn: this.amountInRaw,
      amountOut: this.amountOutRaw,
      recipient: this.recipient,
      startTime: this.startTime,
      endTime: this.endTime,
      stopPrice: this.stopPrice,
      oracleAddress: this.oracleAddress,
      oracleData: solidity.keccak256(["bytes"], [this.oracleData])
    };
    return getTypedData(order, this.chainId);
  };

  _proto.getTypeHash = function getTypeHash$1() {
    var typedData = this.getTypedData();

    var digest = getTypeHash(typedData);

    return digest;
  };

  _proto.send = /*#__PURE__*/function () {
    var _send = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var resp;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetch(LAMBDA_URL + "/orders/create", {
                method: "POST",
                body: JSON.stringify({
                  maker: this.maker,
                  tokenIn: this.tokenInAddress,
                  tokenOut: this.tokenOutAddress,
                  tokenInDecimals: this.tokenInDecimals,
                  tokenOutDecimals: this.tokenOutDecimals,
                  tokenInSymbol: this.tokenInSymbol,
                  tokenOutSymbol: this.tokenOutSymbol,
                  amountIn: this.amountInRaw,
                  amountOut: this.amountOutRaw,
                  recipient: this.recipient,
                  startTime: this.startTime,
                  endTime: this.endTime,
                  stopPrice: this.stopPrice,
                  oracleAddress: this.oracleAddress,
                  oracleData: this.oracleData,
                  v: this.v,
                  r: this.r,
                  s: this.s,
                  chainId: this.amountIn.currency.chainId
                })
              });

            case 2:
              resp = _context2.sent;
              return _context2.abrupt("return", resp.json());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function send() {
      return _send.apply(this, arguments);
    }

    return send;
  }();

  _createClass(LimitOrder, [{
    key: "amountInRaw",
    get: function get() {
      return this.amountIn.quotient.toString();
    }
  }, {
    key: "amountOutRaw",
    get: function get() {
      return this.amountOut.quotient.toString();
    }
  }, {
    key: "tokenInAddress",
    get: function get() {
      return this.amountIn.currency.address;
    }
  }, {
    key: "tokenOutAddress",
    get: function get() {
      return this.amountOut.currency.address;
    }
  }, {
    key: "tokenInDecimals",
    get: function get() {
      return this.amountIn.currency.decimals;
    }
  }, {
    key: "tokenOutDecimals",
    get: function get() {
      return this.amountOut.currency.decimals;
    }
  }, {
    key: "tokenInSymbol",
    get: function get() {
      return this.amountIn.currency.symbol || "";
    }
  }, {
    key: "tokenOutSymbol",
    get: function get() {
      return this.amountOut.currency.symbol || "";
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.amountIn.currency.chainId;
    }
  }]);

  return LimitOrder;
}();
var FillLimitOrder = /*#__PURE__*/function () {
  function FillLimitOrder(order, path, amountExternal, amountToFill, limitOrderReceiver, to, keepTokenIn) {
    if (keepTokenIn === void 0) {
      keepTokenIn = false;
    }

    this.order = order;
    this.path = path.map(validateAndParseAddress);
    this.amountExternal = amountExternal;
    this.amountToFill = amountToFill;
    this.limitOrderReceiver = validateAndParseAddress(limitOrderReceiver);
    this.to = validateAndParseAddress(to);
    this.tokenIn = order.amountIn.currency.address;
    this.tokenOut = order.amountOut.currency.address;
    this.limitOrderReceiverData = abi$1.defaultAbiCoder.encode(["address[]", "uint256", "address", "bool"], [this.path, this.amountExternal.toString(), this.to, keepTokenIn]);
  }

  var _proto2 = FillLimitOrder.prototype;

  _proto2.fillOrderOpen = function fillOrderOpen(signer, extra) {
    extra.open = true;
    return this.fillOrder(signer, extra);
  };

  _proto2.fillOrder = /*#__PURE__*/function () {
    var _fillOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(signer, extra) {
      var gasPrice, nonce, _extra$forceExecution, forceExecution, _extra$open, open, func, orderArg, limitOrderContract, gasLimit, executed, transaction;

      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              gasPrice = extra.gasPrice, nonce = extra.nonce, _extra$forceExecution = extra.forceExecution, forceExecution = _extra$forceExecution === void 0 ? false : _extra$forceExecution, _extra$open = extra.open, open = _extra$open === void 0 ? false : _extra$open;
              func = open ? "fillOrderOpen" : "fillOrder";
              orderArg = [this.order.maker, this.order.amountInRaw, this.order.amountOutRaw, this.order.recipient, this.order.startTime, this.order.endTime, this.order.stopPrice, this.order.oracleAddress, this.order.oracleData, this.amountToFill.toString(), this.order.v, this.order.r, this.order.s];
              limitOrderContract = new contracts.Contract(STOP_LIMIT_ORDER_ADDRESS[this.order.chainId], abi, signer);
              executed = true;
              if (extra.debug) console.log(orderArg, this.path, this.limitOrderReceiver, this.limitOrderReceiverData);
              _context3.prev = 6;
              _context3.next = 9;
              return limitOrderContract.estimateGas[func](orderArg, this.path[0], this.path[this.path.length - 1], this.limitOrderReceiver, this.limitOrderReceiverData);

            case 9:
              gasLimit = _context3.sent;
              gasLimit = gasLimit.mul(11).div(10);
              _context3.next = 22;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](6);

              if (!forceExecution) {
                _context3.next = 21;
                break;
              }

              console.log("Failed to estimate gas, forcing execution");
              gasLimit = bignumber.BigNumber.from("400000"); // 400k

              executed = true;
              _context3.next = 22;
              break;

            case 21:
              return _context3.abrupt("return", {
                executed: false
              });

            case 22:
              _context3.next = 24;
              return limitOrderContract.fillOrder(orderArg, this.path[0], this.path[this.path.length - 1], this.limitOrderReceiver, this.limitOrderReceiverData, {
                gasLimit: gasLimit,
                gasPrice: gasPrice,
                nonce: nonce
              });

            case 24:
              transaction = _context3.sent;
              return _context3.abrupt("return", {
                executed: executed,
                transaction: transaction
              });

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[6, 13]]);
    }));

    function fillOrder(_x3, _x4) {
      return _fillOrder.apply(this, arguments);
    }

    return fillOrder;
  }();

  return FillLimitOrder;
}();

exports.JSBI = JSBI;
exports.ARCHER_ROUTER_ADDRESS = ARCHER_ROUTER_ADDRESS;
exports.ASSERT = ASSERT;
exports.AbstractCurrency = AbstractCurrency;
exports.Avalanche = Avalanche;
exports.BENTOBOX_ADDRESS = BENTOBOX_ADDRESS;
exports.BORING_HELPER_ADDRESS = BORING_HELPER_ADDRESS;
exports.BUYBACK_ADDRESS = BUYBACK_ADDRESS;
exports.Binance = Binance;
exports.CHAINLINK_ORACLE_ADDRESS = CHAINLINK_ORACLE_ADDRESS;
exports.Celo = Celo;
exports.ConstantProductPool = ConstantProductPool;
exports.CurrencyAmount = CurrencyAmount;
exports.ENS_REGISTRAR_ADDRESS = ENS_REGISTRAR_ADDRESS;
exports.Ether = Ether;
exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.FARMING_ADDRESS = FARMING_ADDRESS;
exports.FIVE = FIVE;
exports.Fantom = Fantom;
exports.FillLimitOrder = FillLimitOrder;
exports.Fraction = Fraction;
exports.HODL_MULTISWAPPER_ADDRESS = HODL_MULTISWAPPER_ADDRESS;
exports.HODL_MULTI_EXACT_SWAPPER_ADDRESS = HODL_MULTI_EXACT_SWAPPER_ADDRESS;
exports.HODL_SWAPPER_ADDRESS = HODL_SWAPPER_ADDRESS;
exports.HODL_TWAP_0_ORACLE_ADDRESS = HODL_TWAP_0_ORACLE_ADDRESS;
exports.HODL_TWAP_1_ORACLE_ADDRESS = HODL_TWAP_1_ORACLE_ADDRESS;
exports.Harmony = Harmony;
exports.Heco = Heco;
exports.HybridComputeLiquidity = HybridComputeLiquidity;
exports.HybridPool = HybridPool;
exports.HybridgetY = HybridgetY;
exports.INIT_CODE_HASH = INIT_CODE_HASH;
exports.InsufficientInputAmountError = InsufficientInputAmountError;
exports.InsufficientReservesError = InsufficientReservesError;
exports.KASHI_ADDRESS = KASHI_ADDRESS;
exports.LAMBDA_URL = LAMBDA_URL;
exports.LimitOrder = LimitOrder;
exports.MAKER_ADDRESS = MAKER_ADDRESS;
exports.MASTERCHEF_V2_ADDRESS = MASTERCHEF_V2_ADDRESS;
exports.MERKLE_DISTRIBUTOR_ADDRESS = MERKLE_DISTRIBUTOR_ADDRESS;
exports.MIGRATOR_ADDRESS = MIGRATOR_ADDRESS;
exports.MINICHEF_ADDRESS = MINICHEF_ADDRESS;
exports.MINIMUM_LIQUIDITY = MINIMUM_LIQUIDITY;
exports.MONEY_ADDRESS = MONEY_ADDRESS;
exports.MULTICALL2_ADDRESS = MULTICALL2_ADDRESS;
exports.Matic = Matic;
exports.MaxUint256 = MaxUint256;
exports.NATIVE = NATIVE;
exports.NativeCurrency = NativeCurrency;
exports.ONE = ONE;
exports.Okex = Okex;
exports.PEGGED_ORACLE_ADDRESS = PEGGED_ORACLE_ADDRESS;
exports.Pair = Pair;
exports.Palm = Palm;
exports.Percent = Percent;
exports.Pool = Pool;
exports.Price = Price;
exports.RESERVE_ADDRESS = RESERVE_ADDRESS;
exports.ROUTER_ADDRESS = ROUTER_ADDRESS;
exports.Route = Route;
exports.Router = Router;
exports.SOCKET_URL = SOCKET_URL;
exports.SOLIDITY_TYPE_MAXIMA = SOLIDITY_TYPE_MAXIMA;
exports.STAKING_ADDRESS = STAKING_ADDRESS;
exports.STOP_LIMIT_ORDER_ADDRESS = STOP_LIMIT_ORDER_ADDRESS;
exports.TEN = TEN;
exports.THREE = THREE;
exports.TIME_ADDRESS = TIME_ADDRESS;
exports.TWO = TWO;
exports.Token = Token;
exports.Trade = Trade;
exports.WETH9 = WETH9;
exports.WETH9_ADDRESS = WETH9_ADDRESS;
exports.WETH_ADDRESS = WETH_ADDRESS;
exports.WNATIVE = WNATIVE;
exports.WNATIVE_ADDRESS = WNATIVE_ADDRESS;
exports.WeightedPool = WeightedPool;
exports.ZAPPER_ADDRESS = ZAPPER_ADDRESS;
exports.ZERO = ZERO;
exports._100 = _100;
exports._1000 = _1000;
exports._960 = _960;
exports._980 = _980;
exports._997 = _997;
exports.bentoTypes = bentoTypes;
exports.calcInByOut = calcInByOut;
exports.calcInputByPrice = calcInputByPrice;
exports.calcOutByIn = calcOutByIn;
exports.calcPrice = calcPrice;
exports.calcSquareEquation = calcSquareEquation;
exports.closeValues = closeValues;
exports.computePairAddress = computePairAddress;
exports.computePriceImpact = computePriceImpact;
exports.currencyEquals = currencyEquals;
exports.getBigNumber = getBigNumber;
exports.getSignature = getSignature;
exports.getSignatureBento = getSignatureBento;
exports.getSignatureWithProvider = getSignatureWithProvider;
exports.getSignatureWithProviderBentobox = getSignatureWithProviderBentobox;
exports.getTypeHash = getTypeHash;
exports.getTypedData = getTypedData;
exports.getTypedDataBento = getTypedDataBento;
exports.inputOutputComparator = inputOutputComparator;
exports.name = name;
exports.revertPositive = revertPositive;
exports.sortedInsert = sortedInsert;
exports.sqrt = sqrt;
exports.toHex = toHex;
exports.tradeComparator = tradeComparator;
exports.types = types;
exports.validateAndParseAddress = validateAndParseAddress;
exports.validateSolidityTypeInstance = validateSolidityTypeInstance;
exports.xDai = xDai;
//# sourceMappingURL=sdk.cjs.development.js.map

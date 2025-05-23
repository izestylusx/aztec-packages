import { setup as e2eSetup } from '../fixtures/utils.js';
import { type UniswapSetupContext, uniswapL1L2TestSuite } from '../shared/uniswap_l1_l2.js';

// This tests works on forked mainnet. There is a dump of the data in `dumpedState` such that we
// don't need to burn through RPC requests.
const dumpedState = 'src/fixtures/dumps/uniswap_state';
// When taking a dump use the block number of the fork to improve speed.
const EXPECTED_FORKED_BLOCK = 0; //17514288;

let teardown: () => Promise<void>;

// docs:start:uniswap_setup
const testSetup = async (): Promise<UniswapSetupContext> => {
  const {
    aztecNode,
    teardown: teardown_,
    pxe,
    deployL1ContractsValues,
    wallets,
    logger,
    cheatCodes,
  } = await e2eSetup(2, { stateLoad: dumpedState });

  const l1Client = deployL1ContractsValues.l1Client;

  const ownerWallet = wallets[0];
  const sponsorWallet = wallets[1];

  teardown = teardown_;

  return {
    aztecNode,
    pxe,
    logger,
    l1Client,
    ownerWallet,
    sponsorWallet,
    deployL1ContractsValues,
    cheatCodes,
  };
};
// docs:end:uniswap_setup

const testCleanup = async () => {
  await teardown();
};

uniswapL1L2TestSuite(testSetup, testCleanup, EXPECTED_FORKED_BLOCK);

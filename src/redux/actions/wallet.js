const Types = {
  UNLOCK_WALLET: "WALLET.UNLOCK"
};

// actions
const unlockWallet = (address, balance) => ({
  type: Types.UNLOCK_WALLET,
  payload: { address, balance }
});

export default {
  unlockWallet,
  Types
};
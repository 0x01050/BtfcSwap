const Types = {
  UNLOCK_WALLET: "WALLET.UNLOCK",
  LOCK_WALLET: "WALLET.LOCK",
};

// actions
const unlockWallet = (address, balance) => ({
  type: Types.UNLOCK_WALLET,
  payload: { address, balance }
});
const lockWallet = () => ({
  type: Types.LOCK_WALLET
});

export default {
  unlockWallet,
  lockWallet,
  Types
};
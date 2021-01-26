const Types = {
  UNLOCK_WALLET: "WALLET.UNLOCK",
  LOCK_WALLET: "WALLET.LOCK",
}

// actions
const unlockWallet = (address, btfc_balance, waves_balance) => ({
  type: Types.UNLOCK_WALLET,
  payload: { address, btfc_balance, waves_balance }
})
const lockWallet = () => ({
  type: Types.LOCK_WALLET
})

export default {
  unlockWallet,
  lockWallet,
  Types
}
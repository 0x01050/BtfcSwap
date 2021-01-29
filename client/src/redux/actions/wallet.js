const Types = {
  UNLOCK_WALLET: "WALLET.UNLOCK",
  LOCK_WALLET: "WALLET.LOCK",
  SET_BALANCE: "WALLET.SET.BALANCE",
}

// actions
const unlockWallet = (address) => ({
  type: Types.UNLOCK_WALLET,
  payload: { address }
})
const lockWallet = () => ({
  type: Types.LOCK_WALLET
})
const setBalance = (btfc_balance, waves_balance, balances) => ({
  type: Types.SET_BALANCE,
  payload: { btfc_balance, waves_balance, balances }
})

export default {
  unlockWallet,
  lockWallet,
  setBalance,
  Types
}
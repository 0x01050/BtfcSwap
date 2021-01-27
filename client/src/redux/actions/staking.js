const Types = {
  SET_BALANCE: "STAKING.SET.BALANCE",
}

// actions
const setBalance = (staked, earned) => ({
  type: Types.SET_BALANCE,
  payload: {staked, earned}
})

export default {
  setBalance,
  Types
}
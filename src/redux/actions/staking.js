const Types = {
  APPROVE: "STAKING.APPROVE",
  DEPOSIT: "STAKING.DEPOSIT",
  WITHDRAW: "STAKING.WITHDRAW",
  EARN: "STAKING.EARN",
  SETTLE: "STAKING.SETTLE",
}

// actions
const approve = () => ({
  type: Types.APPROVE
})
const deposit = (amount) => ({
  type: Types.DEPOSIT,
  payload: {amount}
})
const withdraw = (amount) => ({
  type: Types.WITHDRAW,
  payload: {amount}
})
const earn = (amount) => ({
  type: Types.EARN,
  payload: {amount}
})
const settle = (amount) => ({
  type: Types.SETTLE,
  payload: {amount}
})

export default {
  approve,
  deposit,
  withdraw,
  earn,
  settle,
  Types
}
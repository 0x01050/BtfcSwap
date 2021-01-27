import ACTIONS from "../actions/staking"
import _ from "lodash"

const defaultState = {
  earned: 0,
  staked: 0,
}

const stakingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.DEPOSIT: {
      let { amount } = action.payload
      let newState = _.cloneDeep(state)
      if(parseFloat(amount) > 0) {
        newState.staked += parseFloat(amount)
      }
      return newState
    }
    case ACTIONS.Types.WITHDRAW: {
      let { amount } = action.payload
      let newState = _.cloneDeep(state)
      if(parseFloat(amount) > 0 && newState.staked >= parseFloat(amount)) {
        newState.staked -= parseFloat(amount)
      }
      return newState
    }
    case ACTIONS.Types.EARN: {
      let { amount } = action.payload
      let newState = _.cloneDeep(state)
      if(parseFloat(amount) > 0) {
        newState.earned += parseFloat(parseFloat(amount))
      }
      return newState
    }
    case ACTIONS.Types.SETTLE: {
      let { amount } = action.payload
      let newState = _.cloneDeep(state)
      if(parseFloat(amount) > 0 && newState.earned >= parseFloat(amount)) {
        newState.earned -= parseFloat(amount)
      }
      return newState
    }
    default:
      return state
  }
}

export default stakingReducer
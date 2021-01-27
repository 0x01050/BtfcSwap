import ACTIONS from "../actions/staking"
import _ from "lodash"

const defaultState = {
  staked: 0,
  earned: 0,
}

const stakingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_BALANCE: {
      let { staked, earned } = action.payload
      let newState = _.cloneDeep(state)
      newState.staked = staked
      newState.earned = earned
      return newState
    }
    default:
      return state
  }
}

export default stakingReducer
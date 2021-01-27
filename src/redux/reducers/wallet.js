import ACTIONS from "../actions/wallet"
import _ from "lodash"

const defaultState = {
  locked: true,
  address: '',
  btfc_balance: 0,
  waves_balance: 0,
}

const walletReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.UNLOCK_WALLET: {
      let { address } = action.payload
      let newState = _.cloneDeep(state)
      newState.locked = false
      newState.address = address
      return newState
    }
    case ACTIONS.Types.LOCK_WALLET: {
      let newState = _.cloneDeep(state)
      newState.locked = true
      window.waves = null
      return newState
    }
    case ACTIONS.Types.SET_BALANCE: {
      let { btfc_balance, waves_balance } = action.payload
      let newState = _.cloneDeep(state)
      newState.btfc_balance = btfc_balance
      newState.waves_balance = waves_balance
      return newState
    }
    default:
      return state
  }
}

export default walletReducer
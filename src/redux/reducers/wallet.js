import ACTIONS from "../actions/wallet";
import _ from "lodash";

const defaultState = {
  locked: true,
  address: '',
  balance: 0
};

const walletReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.UNLOCK_WALLET: {
      let { address, balance } = action.payload;
      let newState = _.cloneDeep(state);
      newState.locked = false;
      newState.address = address;
      newState.balance = balance;
      return newState;
    }
    case ACTIONS.Types.LOCK_WALLET: {
      let newState = _.cloneDeep(state);
      newState.locked = true;
      return newState;
    }
    default:
      return state;
  }
};

export default walletReducer;
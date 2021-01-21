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
      console.log(action);
      let { address, balance } = action.payload;
      let newState = _.cloneDeep(state);
      newState.locked = false;
      newState.address = address;
      newState.balance = balance;
      return newState;
    }

    default:
      return state;
  }
};

export default walletReducer;
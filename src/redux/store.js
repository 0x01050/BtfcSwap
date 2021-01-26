import { createStore, combineReducers } from "redux"

import walletReducer from "./reducers/wallet"
import stakingReducer from "./reducers/staking"

export default function configureStore(initialState) {
  const reducer = combineReducers({
    walletReducer,
    stakingReducer
  })
  const store = createStore(reducer, initialState)
  return store
}
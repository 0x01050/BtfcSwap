import { createStore, combineReducers } from "redux";

import walletReducer from "./reducers/wallet";

export default function configureStore(initialState) {
  const reducer = combineReducers({
    walletReducer
  });
  const store = createStore(reducer, initialState);
  return store;
}
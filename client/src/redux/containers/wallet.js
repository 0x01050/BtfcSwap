
import { connect } from "react-redux"
import ACTIONS from "../actions/wallet"

const mapStateToProps = state => ({
  walletState: {
    locked: state.walletReducer.locked,
    address: state.walletReducer.address,
    btfc_balance: state.walletReducer.btfc_balance,
    waves_balance: state.walletReducer.waves_balance,
    balances: state.walletReducer.balances,
  }
})

const mapDispatchToProps = dispatch => ({
  walletActions: {
    unlockWallet: (address) => dispatch(ACTIONS.unlockWallet(address)),
    lockWallet: () => dispatch(ACTIONS.lockWallet()),
    setBalance: (btfc_balance, waves_balance, balances) => dispatch(ACTIONS.setBalance(btfc_balance, waves_balance, balances)),
  }
})

function walletContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
export default walletContainer
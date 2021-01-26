
import { connect } from "react-redux"
import ACTIONS from "../actions/wallet"

const mapStateToProps = state => ({
  walletState: {
    locked: state.walletReducer.locked,
    address: state.walletReducer.address,
    btfc_balance: state.walletReducer.btfc_balance,
    waves_balance: state.walletReducer.waves_balance,
  }
})

const mapDispatchToProps = dispatch => ({
  walletActions: {
    unlockWallet: (address, btfc_balance, waves_balance) => dispatch(ACTIONS.unlockWallet(address, btfc_balance, waves_balance)),
    lockWallet: () => dispatch(ACTIONS.lockWallet()),
  }
})

function walletContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
export default walletContainer
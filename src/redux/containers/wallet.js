
import { connect } from "react-redux";
import ACTIONS from "../actions/wallet";

const mapStateToProps = state => ({
  walletState: {
    locked: state.walletReducer.locked,
    address: state.walletReducer.address,
    balance: state.walletReducer.balance
  }
});

const mapDispatchToProps = dispatch => ({
  walletActions: {
    unlockWallet: (address, balance) => dispatch(ACTIONS.unlockWallet(address, balance))
  }
});

function walletContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
}
export default walletContainer;

import { connect } from "react-redux"
import ACTIONS from "../actions/staking"

const mapStateToProps = state => ({
  stakingState: {
    earned: state.stakingReducer.earned,
    staked: state.stakingReducer.staked,
  }
})

const mapDispatchToProps = dispatch => ({
  stakingActions: {
    deposit: (amount) => dispatch(ACTIONS.deposit(amount)),
    withdraw: (amount) => dispatch(ACTIONS.withdraw(amount)),
    earn: (amount) => dispatch(ACTIONS.earn(amount)),
    settle: (amount) => dispatch(ACTIONS.settle(amount)),
  }
})

function stakingContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
export default stakingContainer
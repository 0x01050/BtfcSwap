
import { connect } from "react-redux"
import ACTIONS from "../actions/staking"

const mapStateToProps = state => ({
  stakingState: {
    staked: state.stakingReducer.staked,
    earned: state.stakingReducer.earned,
  }
})

const mapDispatchToProps = dispatch => ({
  stakingActions: {
    setBalance: (staked, earned) => dispatch(ACTIONS.setBalance(staked, earned)),
  }
})

function stakingContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
export default stakingContainer
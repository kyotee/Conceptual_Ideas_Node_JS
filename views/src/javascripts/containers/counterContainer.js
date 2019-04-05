import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../ui/counter.js';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    counterNum: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default CounterContainer;

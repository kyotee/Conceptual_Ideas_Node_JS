import C from '../../actions/counterTypes.js';

const initalState = {
  counterNum: 0
};

export default function counter(state = initalState.counterNum, action) {
  switch (action.type) {
  case C.INCREMENT_COUNTER:
    return state + 1;
  case C.DECREMENT_COUNTER:
    return state - 1;
  case C.SET_COUNTER:
    return action.counterNum;
  default:
    return state;
  }
}

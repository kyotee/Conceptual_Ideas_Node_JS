import C from './counterTypes.js';

export function setCounter(counterNum) {
  return {
    type: C.SET_COUNTER,
    counterNum: counterNum
  };
}

export function increment() {
  return {
    type: C.INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: C.DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counterNum } = getState();

    if (counterNum % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

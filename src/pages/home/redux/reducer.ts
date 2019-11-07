import { ADD_COUNT, SUB_COUNT } from './actionTypes';

const counterReducer = (state = 100, action) => {
  switch(action.type) {
    case ADD_COUNT:
      return state + 1;
    case SUB_COUNT:
      return state - 1;
    default:
      return state;
  }
}

export default counterReducer;

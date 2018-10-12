import {listType} from './constant';
const initialState = {
  userList: [],
  isLoading: true
};
 const listReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case listType.GET_DATA:
      return Object.assign({}, state, {
        userList: payload,
        isLoading: false
      });
    case listType.CHANGE_LOADING_STATUS:
      return Object.assign({}, state, {
        isLoading: payload,
      });
    default:
      return state;
  }
};
export default listReducer

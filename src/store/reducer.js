import actionTypes from './actionTypes';
const initialState = {
  userData: {name:'kangaroo'},
  navData: {
    topNav:[],
    sideNav:[]
  }
};
 const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case actionTypes.GET_USER_DATA:
      return Object.assign({}, state, {
        userData: payload,
      });
      case actionTypes.GET_NAV_DATA:
      return Object.assign({}, state, {
        navData: payload,
      });
    default:
      return state;
  }
};
export default globalReducer;

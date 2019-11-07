import {globalType} from './constant';

const initialState = {
  userData: {},
  navData: {
    topNav:[],
    sideNav:[]
  },
  timeFilter: '0',
};
 const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case globalType.GET_USER_DATA:
      return Object.assign({}, state, {
        userData: payload,
      });
    case globalType.GET_NAV_DATA:
      return Object.assign({}, state, {
        navData: payload,
      });
    case globalType.UPDATE_TIMEFILTER:
      return Object.assign({}, state, {
        timeFilter: payload,
      });
    default:
      return state;
  }
};
export default globalReducer;

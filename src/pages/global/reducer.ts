import { globalType } from './constant';
import * as moment from "moment";
const defaultDate = type => {
  switch (type) {
    case "0":
      return moment().subtract(1, "days").format("YYYY-MM-DD");
    case "1":
      return moment().format("YYYY-MM");
    case "2":
      return [moment().subtract(1, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")].join("->");
  }
};

const initialState = {
  userData: {},
  navData: [],
  timeFilter: {
    type: "0",
    name: defaultDate("0")
  },
  permissionCode: [],
  openKeys: ['/parking'],
};
const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case globalType.GET_USER_DATA:
      return Object.assign({}, state, {
        userData: payload,
      });
    case globalType.GET_NAV_DATA:
      console.log(payload)
      return Object.assign({}, state, {
        navData: payload,
      });
    case globalType.UPDATE_TIMEFILTER_NAME: 
      return Object.assign({}, state, {
        timeFilter: {
          type: state.timeFilter.type,
          name: payload
        }
      });
    case globalType.UPDATE_TIMEFILTER_TYPE:
      return Object.assign({}, state, {
        timeFilter: {
          type: payload,
          name: defaultDate(payload)
        }
      });
    case globalType.GET_PERMISSION_CODE:
      return Object.assign({}, state, {
        permissionCode: payload,
      })
    case globalType.UPDATE_OPEN_KEYS:
      return Object.assign({}, state, { openKeys: payload });  
    default:
      return state;
  }
};

export default globalReducer;

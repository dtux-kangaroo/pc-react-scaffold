import { globalType } from "./constant";
import moment from "moment";

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

const initState = {
  navData: [],
  authCode: [],
  submenu: [],
  timeFilter: {
    type: "0",
    name: defaultDate("0")
  },
  openKeys: ["/analyse"]
};
const globalReducers = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case globalType.UPDATE_MENU:
      return Object.assign({}, state, {
        navs: payload.navs,
        submenu: payload.submenu
      });
    case globalType.GET_AUTH_CODE:
      return Object.assign({}, state, {
        authCode: payload,
      })
    case globalType.GET_NAV_DATA:
      return Object.assign({}, state, {
        navData: payload,
      })
    case globalType.OPEN_KEYS:
      return Object.assign({}, state, {
        openKeys: payload,
      })
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
    case globalType.RESET_TIMEFILTER:
      return Object.assign({}, state, {
        timeFilter: {
          type: "0",
          name: defaultDate("0")
        }
      });
    default:
      return state;
  }
};

export default globalReducers;
